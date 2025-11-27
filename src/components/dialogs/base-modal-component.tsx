"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { ModalKeys } from "./modal-keys";

export interface AbstractModalComponentProps {
    isOpen: boolean;
    closeModal: () => void;
    modalKey: ModalKeys;
}

interface BaseModalComponentProps extends Omit<AbstractModalComponentProps, "modalKey"> {
    children: ReactNode;
    title: string;
    description?: string;
}

function BaseModalComponent({
    isOpen,
    closeModal,
    children,
    title,
    description,
}: BaseModalComponentProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(value) => value !== isOpen && !value && closeModal()}>
            <DialogContent className="grid max-h-[500px] grid-rows-[auto_minmax(0,1fr)] px-4">
                <DialogHeader className="px-2">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <ScrollArea
                    className="mt-2 px-2"
                    viewportClassName="w-[calc(100%+32px)] -mx-4 px-4"
                >
                    {children}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default BaseModalComponent;
