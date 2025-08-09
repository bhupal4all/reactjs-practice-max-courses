import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import { currencyFormatter } from "../util/formatting";
import useUserProgressContext from "../store/UserProgressContext";
import Button from "./ui/Button";
import useCartContext from "../store/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useCartContext();
  const {mode, hideCart, showCheckout} = useUserProgressContext();

  const cartTotal = cartCtx.items.reduce((totalPrice, item)=>{
    return totalPrice + (item.quantity * item.price);    
  }, 0);

  return (<Modal className="cart" open={mode === 'cart'} onClose={mode === 'cart' ? hideCart: null}>
    <h2>Your Cart</h2>
    <ul>
      {cartCtx.items.map(item=>(
        <CartItem key={item.id} item={item}
          onIncrement={()=>cartCtx.addItem(item)} onDecrement={()=>cartCtx.removeItem(item.id)} />
      ))}
    </ul>
    <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
    <p className="modal-actions">
      <Button textOnly onClick={hideCart}>Close</Button>
      <Button onClick={showCheckout}>Go to Checkout</Button>
    </p>
  </Modal>);
}