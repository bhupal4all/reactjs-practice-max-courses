import logoImg from '../assets/logo.jpg'
import useCartContext from '../store/CartContext';
import useUserProgressContext from '../store/UserProgressContext';
import Button from './ui/Button';

export default function Header() {
  const {items} = useCartContext();
  const {showCart} = useUserProgressContext();
  
  const totalItems = items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0)

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A Logo" />
        <h1>React Food Order Application</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCart}>Cart ({totalItems})</Button>
      </nav>
    </header>
  );
}