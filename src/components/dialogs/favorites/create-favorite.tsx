import BaseModalComponent, { AbstractModalComponentProps } from "../base-modal-component";
import CreateFavoriteCoinForm from "../../form/forms/create-favorite-coin-form";

export interface CreateFavoriteModalComponentProps extends AbstractModalComponentProps {
    price: number;
    name: string;
    symbol: string;
}

const CreateFavoriteModalComponent = ({
    isOpen,
    closeModal,
    price,
    name,
    symbol,
}: CreateFavoriteModalComponentProps) => {
    "use client";

    return (
        <BaseModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Create Favorite"
            description={`Create ${name} Price Alerts`}
        >
            <CreateFavoriteCoinForm price={price} name={name} symbol={symbol} />
        </BaseModalComponent>
    );
};

export default CreateFavoriteModalComponent;
