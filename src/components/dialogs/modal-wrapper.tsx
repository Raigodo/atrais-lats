"use client";

import React, { ComponentType, useEffect, useRef, useState } from "react";
import { CurrentModalData, useModalManager } from "./modal-manager-context-provider";
import { AbstractModalComponentProps } from "./base-modal-component";
import { ModalKeys } from "./modal-keys";

export default function ModalWrapper<K extends ModalKeys>({
    modalKey,
    modalComponent,
}: {
    modalKey: K;
    modalComponent: ComponentType<AbstractModalComponentProps>;
}) {
    const { currentModal, closeModal } = useModalManager();
    const [isOpen, setIsOpen] = useState(false);

    //handle smooth close
    const [isFading, setIsFading] = useState(false);
    const timerId = useRef<NodeJS.Timeout>(undefined);

    useEffect(() => {
        if (currentModal?.modalKey === modalKey && !isOpen) {
            setIsOpen(true);
            setIsFading(false);
            if (timerId.current) clearTimeout(timerId.current);
            timerId.current = undefined;
        }
        //start fading
        if (currentModal?.modalKey !== modalKey && isOpen) {
            setIsOpen(false);
            setIsFading(true);
            timerId.current = setTimeout(() => {
                setIsFading(false);
                timerId.current = undefined;
            }, 1000);
        }
    }, [currentModal?.modalKey, modalKey, isOpen]);

    //to prevent undefined errors durning closing
    const [cachedModalProps, setCachedModalProps] = useState<CurrentModalData["props"] | undefined>(
        undefined
    );

    useEffect(() => {
        if (isOpen && !cachedModalProps) setCachedModalProps(currentModal?.props);
        if (!(isOpen || isFading) && cachedModalProps) setCachedModalProps(undefined);
    }, [isOpen, isFading, currentModal, cachedModalProps]);

    function handleCloseModal() {
        closeModal();
    }

    const modalProps = {
        ...(currentModal?.props ?? cachedModalProps),
        isOpen,
        closeModal: handleCloseModal,
    } as AbstractModalComponentProps;

    return (
        <div className="hidden">
            {(isOpen || isFading) && React.createElement(modalComponent, modalProps)}
        </div>
    );
}
