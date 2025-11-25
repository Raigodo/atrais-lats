import BaseModalComponent, { AbstractModalComponentProps } from "../base-modal-component";

export interface EditFavoriteModalComponentProps extends AbstractModalComponentProps {}

const EditFavoriteModalComponent = ({ isOpen, closeModal }: EditFavoriteModalComponentProps) => {
    return (
        <BaseModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Sometitle"
            description="Some description"
        >
            Hello
        </BaseModalComponent>
    );
};

export default EditFavoriteModalComponent;
