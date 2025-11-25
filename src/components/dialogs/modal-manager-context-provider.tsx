"use client";

import React, { createContext, useContext, useState } from "react";
import { ModalKeys } from "./modal-keys";
import CreateFavoriteModalComponent from "./favorites/create-favorite";
import EditFavoriteModalComponent from "./favorites/edit-favorite";
import ModalWrapper from "./modal-wrapper";

const modalComponents = {
    [ModalKeys.CREATE_FAVORITE]: CreateFavoriteModalComponent,
    [ModalKeys.EDIT_FAVORITE]: EditFavoriteModalComponent,
};

type KeyToModalComponentPropsMap = {
    [K in keyof typeof modalComponents]: Parameters<(typeof modalComponents)[K]>[0];
};

type ModalComponentProps<T> = T extends unknown
    ? Omit<T, "closeModal" | "isOpen" | "modalKey">
    : never;

export type ModalPropsMap = {
    [K in keyof KeyToModalComponentPropsMap]: ModalComponentProps<KeyToModalComponentPropsMap[K]>;
};

//types to ensure that required props are passed
type KeysWithProps = {
    [K in keyof ModalPropsMap]: keyof ModalPropsMap[K] extends never ? never : K;
}[keyof ModalPropsMap];

type KeysWithoutProps = {
    [K in keyof ModalPropsMap]: keyof ModalPropsMap[K] extends never ? K : never;
}[keyof ModalPropsMap];

//modal key and requred props for specific modal component
export type CurrentModalData = {
    [K in keyof ModalPropsMap]: {
        modalKey: K;
        props: ModalPropsMap[K];
    };
}[keyof ModalPropsMap];

interface ModalManagerContextProviderProps {
    children: React.ReactNode;
}

//to ensure that if no parameter needed then allow no props passed
export type OpenModalFunction = <K extends KeysWithProps, T extends KeysWithoutProps>(
    props: { key: K; bag: ModalPropsMap[K] } | { key: T; bag?: unknown }
) => void;

export type OpenModalFunctionProps = Parameters<OpenModalFunction>[0];

export type CloseModalFunction = () => void;

interface ModalManagerContextType {
    currentModal: CurrentModalData | null;
    openModal: OpenModalFunction;
    closeModal: CloseModalFunction;
}

const ModalManagerContext = createContext<ModalManagerContextType | null>(null);

const ModalManagerContextProvider = ({ children }: ModalManagerContextProviderProps) => {
    const [currentModal, setCurrentModal] = useState<CurrentModalData | null>(null);

    const openModal: OpenModalFunction = (modal) => {
        setCurrentModal({ modalKey: modal.key, props: modal.bag } as CurrentModalData);
    };

    const closeModal: CloseModalFunction = () => {
        setCurrentModal(null);
    };

    return (
        <ModalManagerContext.Provider value={{ currentModal, closeModal, openModal }}>
            {children}
            {Object.entries(modalComponents).map(([modalKey, ModalComponent]) => (
                <ModalWrapper
                    key={modalKey}
                    modalKey={modalKey as ModalKeys}
                    modalComponent={ModalComponent as any}
                />
            ))}
        </ModalManagerContext.Provider>
    );
};

export default ModalManagerContextProvider;

export function useModalManager() {
    const context = useContext(ModalManagerContext);
    if (!context) throw Error("no modal manager context");
    return context;
}
