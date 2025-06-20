import { FormEvent, FC } from "react";
type LoadMoreBtnProps = {
  handleLoadMore: (event: FormEvent) => void;
  isActive: boolean;
};
const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ handleLoadMore, isActive }) => {
  return (
    <button onClick={handleLoadMore} type="button" disabled={isActive}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
