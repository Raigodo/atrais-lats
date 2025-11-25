"use client";

import BaseModalComponent, { AbstractModalComponentProps } from "../base-modal-component";
import { toggleBookmark } from "./favorite-actions";
import { useTransition } from "react";
import { Spinner } from "../../ui/spinner";
import { Button } from "../../ui/button";

export interface CreateFavoriteModalComponentProps extends AbstractModalComponentProps {
    symbol: string;
}

const CreateFavoriteModalComponent = ({
    isOpen,
    closeModal,
    symbol,
}: CreateFavoriteModalComponentProps) => {
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

export default CreateFavoriteModalComponent;
