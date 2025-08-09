import { createContext, useContext, useState } from "react";

const UserProgressContext = createContext({
  mode: '',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {}
});

export function UserProgressContextProvider({children}) {
  const [mode, setMode] = useState('');

  const showCart = () => setMode('cart');
  const hideCart = () => setMode('');
  const showCheckout = () => setMode('checkout');
  const hideCheckout = () => setMode('');

  return (
    <UserProgressContext.Provider value={{
      mode,
      showCart,
      hideCart,
      showCheckout,
      hideCheckout
    }}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default function useUserProgressContext() {
  return useContext(UserProgressContext);
}