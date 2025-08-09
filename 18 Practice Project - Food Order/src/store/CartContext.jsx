import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {}
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const idx = state.items.findIndex((item) => item.id === action.item.id);
    const updatedItems = [...state.items];
    if (idx < 0) {
      updatedItems.push({...action.item, quantity: 1});
    } else {
      const existingItem = updatedItems[idx];
      updatedItems[idx] = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      }
    }
    return {
      ...state,
      items: updatedItems
    }
  }

  if (action.type === 'DELETE_ITEM') {
    const idx = state.items.findIndex((item) => item.id === action.id);
    const updatedItems = [...state.items]
    const existingItem = updatedItems[idx];

    if (existingItem.quantity - 1 <= 0) {
      updatedItems.splice(idx, 1);
    } else {
      updatedItems[idx] = {
        ...existingItem,
        quantity: existingItem.quantity -1
      }
    }
    return {
      ...state,
      items: updatedItems
    }
  }

  return {...state};
}

export function CartContextProvider({children}) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });
  
  const addItem = (item) => {
    dispatch({type: 'ADD_ITEM', item});
  }

  const removeItem = (id) => {
    dispatch({type: 'DELETE_ITEM', id});
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default function useCartContext() {
  return useContext(CartContext);
}