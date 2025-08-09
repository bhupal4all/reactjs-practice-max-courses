import { currencyFormatter } from "../util/formatting";

export default function CartItem({item, onDecrement, onIncrement}) {
  return (
    <li className="cart-item">
      <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
      <p className="cart-item-actions">
        <button onClick={onDecrement}>-</button>
        {item.quantity}
        <button onClick={onIncrement}>+</button>
      </p>
    </li>
  );
}