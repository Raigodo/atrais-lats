import BaseModalComponent from "../base-modal-component";
import ModalWrapper, { BaseModalComponentProps } from "../dialog-wrapper";
import { ModalKeys } from "../modal-keys";

export interface EditFavoriteModalComponentProps extends BaseModalComponentProps {}

const ModalComponent = ({ isOpen, closeModal }: EditFavoriteModalComponentProps) => {
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

const EditFavoriteModal = () => {
    return <ModalWrapper modalKey={ModalKeys.EDIT_FAVORITE} modalComponent={ModalComponent} />;
};

export default EditFavoriteModal;
