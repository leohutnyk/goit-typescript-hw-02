import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";
function Loader() {
  return (
    <div className={css.loader}>
      <ClipLoader color="#00bfff" size={50} />
    </div>
  );
}

export default Loader;
