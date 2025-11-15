"use client";

import React, { createContext, useContext, useState } from "react";
import CreateFavoriteModal, {
    CreateFavoriteModalComponentProps,
} from "./favorites/create-favorite";
import EditFavoriteModal, { EditFavoriteModalComponentProps } from "./favorites/edit-favorite";
import { ModalKeys } from "./modal-keys";

type KeyToModalComponentPropsMap = {
    [ModalKeys.CREATE_FAVOTITE]: {} & CreateFavoriteModalComponentProps;
    [ModalKeys.EDIT_FAVORITE]: {} & EditFavoriteModalComponentProps;
};

type ModalComponentProps<T> = T extends unknown ? Omit<T, "closeModal" | "isOpen"> : never;

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
export type CurrentModalSummary = {
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
    currentModal: CurrentModalSummary | null;
    openModal: OpenModalFunction;
    closeModal: CloseModalFunction;
}

const ModalManagerContext = createContext<ModalManagerContextType | null>(null);

const ModalManagerContextProvider = ({ children }: ModalManagerContextProviderProps) => {
    // const router = useRouter();
    // const searchParams = useSearchParams();

    const [currentModal, setCurrentModal] = useState<CurrentModalSummary | null>(() => {
        // const modalKey = searchParams.get("modal") as keyof ModalPropsMap;
        // return modalKey && ({ modalKey } as CurrentModalSummary);
        return null;
    });

    // useEffect(() => {
    //     const newParams = new URLSearchParams(searchParams);
    //     if (currentModal) newParams.set("modal", currentModal.modalKey);
    //     else newParams.delete("modal");
    //     router.push(`?${newParams.toString()}`, { scroll: false });
    // }, [currentModal]);

    const openModal: OpenModalFunction = (modal) => {
        setCurrentModal({ modalKey: modal.key, props: modal.bag } as CurrentModalSummary);
    };

    const closeModal: CloseModalFunction = () => {
        setCurrentModal(null);
    };

    return (
        <ModalManagerContext.Provider value={{ currentModal, closeModal, openModal }}>
            {children}
            <CreateFavoriteModal />
            <EditFavoriteModal />
        </ModalManagerContext.Provider>
    );
};

export default ModalManagerContextProvider;

export function useModalManager() {
    const context = useContext(ModalManagerContext);
    if (!context) throw Error("no modal manager context");
    return context;
}
