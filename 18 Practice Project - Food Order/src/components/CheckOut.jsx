import useCartContext from "../store/CartContext";
import useUserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import useHttp from "../hooks/useHttp";
import Error from "./ui/Error";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function CheckOut() {
  const cartCtx = useCartContext();
  const {mode, hideCheckout} = useUserProgressContext();
  const {data, isLoading:isSending, error, sendRequest} = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce((totalPrice, item)=>{
    return totalPrice + (item.quantity * item.price);    
  }, 0);

  function onFormSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);

    sendRequest(JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: data
      }
    }));
  }

  if (data && !error) {
    return (
      <Modal className="checkout" open={mode==='checkout'} onClose={mode==='checkout' ? hideCheckout: null}>
        <h2>Success</h2>
        <p>Your Order has been places successfully.</p>
        <p className="modal-actions">
          <Button textOnly onClick={hideCheckout}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (<Modal className="checkout" open={mode==='checkout'} onClose={mode==='checkout' ? hideCheckout: null}>
    <form onSubmit={onFormSubmit}>
      <h2>Checkout</h2>
      <p>Total Amount : ${currencyFormatter.format(cartTotal)}</p>

      <Input id="name" label="Full Name" type="text" />
      <Input id="email" label="Email Address" type="email" />
      <Input id="street" label="Street" type="text" />
      <div className="control-row">
        <Input id="city" label="City" type="text" />
        <Input id="postal-code" label="Postal Code" type="text" />
      </div>

      {!isSending &&
      <p className="modal-actions">
        <Button textOnly onClick={hideCheckout}>Close</Button>
        <Button>Submit</Button>
      </p>}
      {isSending && <p>Sending Data...</p>}
      {error && <Error title="Error While Sending" message={error} />}
    </form>
  </Modal>);
}