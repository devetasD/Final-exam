import style from './Card.module.css';

export function Card({ className, children }) {
  return (
    <div className={`${style.card} ${className ? className : ''}`}>
      {children}
    </div>
  );
}
