"use client";

import BaseModalComponent from "../base-modal-component";
import ModalWrapper, { BaseModalComponentProps } from "../modal-wrapper";
import { ModalKeys } from "../modal-keys";
import { toggleBookmark } from "./favorite-actions";
import { useTransition } from "react";
import { Spinner } from "../../ui/spinner";
import { Button } from "../../ui/button";

export interface CreateFavoriteModalComponentProps extends BaseModalComponentProps {}

const ModalComponent = ({ isOpen, closeModal }: CreateFavoriteModalComponentProps) => {
    const [isPending, startTransition] = useTransition();

    const handleBookmark = () => {
        startTransition(async () => {
            await toggleBookmark(new FormData());
            closeModal();
        });
    };

    return (
        <BaseModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Sometitle"
            description="Some description"
        >
            <form action={handleBookmark}>
                <Button type="submit" disabled={isPending}>
                    {isPending ? <Spinner /> : "submit"}
                </Button>
            </form>
        </BaseModalComponent>
    );
};

const CreateFavoriteModal = () => {
    return <ModalWrapper modalKey={ModalKeys.CREATE_FAVOTITE} modalComponent={ModalComponent} />;
};

export default CreateFavoriteModal;
