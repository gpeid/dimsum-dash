import button from "./Button.module.css";

export default function Button(props) {
  const { text, int, type, clickHandler } = props;
  return (
    <button
      onClick={clickHandler}
      className={`${button.btn} ${button["btn-blue"]} ${type}`}
    >
      {text} {int}
    </button>
  );
}
