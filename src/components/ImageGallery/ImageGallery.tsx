import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

type Urls = {
  regular: string;
  small: string;
};
type ImageData = {
  id: number;
  alt_description: string;
  urls: Urls;
};
interface PropsImageGallery {
  gallery: ImageData[];
  openModal: () => void;
  updateModalStateData: (url: string, alt: string) => void;
}

const ImageGallery: FC<PropsImageGallery> = ({
  gallery,
  openModal,
  updateModalStateData,
}) => {
  return (
    <ul className={css.gallery}>
      {gallery.map(({ id, alt_description, urls }) => (
        <li className={css.gallerycard} key={id} onClick={openModal}>
          <ImageCard
            urls={urls}
            alt_description={alt_description}
            updateModalStateData={updateModalStateData}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
