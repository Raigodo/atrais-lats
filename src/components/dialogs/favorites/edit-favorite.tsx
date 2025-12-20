import EditFavoriteCoinForm from "../../forms/forms/edit-favorite-coin-form";
import BaseModalComponent, { AbstractModalComponentProps } from "../base-modal-component";

export interface EditFavoriteModalComponentProps extends AbstractModalComponentProps {
    price: number;
    name: string;
    min: number;
    max: number;
    symbol: string;
}

const EditFavoriteModalComponent = ({
    isOpen,
    closeModal,
    price,
    name,
    min,
    max,
    symbol,
}: EditFavoriteModalComponentProps) => {
    return (
        <BaseModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Edit Favorite"
            description={`Edit ${name} Price Alerts`}
        >
            <EditFavoriteCoinForm
                price={price}
                name={name}
                symbol={symbol}
                min={min}
                max={max}
                onSubmitted={closeModal}
            />
        </BaseModalComponent>
    );
};

export default EditFavoriteModalComponent;
