import css from "./ErrorMessage.module.css";
import { FC } from "react";
interface PropsMessage {
  message: string;
}
const ErrorMessage: React.FC<PropsMessage> = ({ message }) => {
  return (
    <div className={css.errorMessage}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
