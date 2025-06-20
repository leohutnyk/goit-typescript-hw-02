import css from "./ImageCard.module.css";

type PropsImageCard = {
  alt_description: string;
  urls: { regular: string; small: string };
  updateModalStateData: (url: string, alt: string) => void;
};
const ImageCard = ({
  alt_description,
  urls,
  updateModalStateData,
}: PropsImageCard) => {
  return (
    <div
      className={css.card}
      onClick={() => updateModalStateData(urls.regular, alt_description)}
    >
      <img className={css.cardImage} src={urls.small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;
