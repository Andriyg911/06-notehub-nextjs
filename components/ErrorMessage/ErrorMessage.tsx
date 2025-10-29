import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return <div className={css.error}>Щось пішло не так. Спробуйте пізніше.</div>;
}