import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { FC } from "react";
interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  src: string;
  alt: string;
}
const ImageModal: FC<ImageModalProps> = ({
  modalIsOpen,
  closeModal,
  src,
  alt,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div>
        <img className={css.modalImg} src={src} alt={alt} />
        <p className={css.gallerytitle}>{alt}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
