import Reat, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // pop-up notification when we add something on the cart or remove it


const Context = createContext();

export const StateContext = ({ children }) => {
  const [ showCart, setShowCart ] = useState(false); 
  const [cartItems, setCartItems] = useState([]); 

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct; // for finding the products in the cart in order to update the quantities, pricies
  let index;

  const addOnCart = (product, quantity) => {

    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
        else {
          return cartProduct;
        }
      })
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity : quantity }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  }
  
  // Increase - Decrease Quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  }
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty <= 0)
      return 1;
      return prevQty-1;
    });
  }

  
  //For increase-decrease quantities and total prices on cart (cart is total diffeerent component we can't just increase and decrease quantity like that because we dont know on which item we will change the quantity!!)
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)          // we're trying to find the item we want to update
    let newCartItems = cartItems.filter((item) => item._id !== id);  //filter function isn't mutative 
    
    if (value === 'inc') {
      // newCartItems = [{ ...foundProduct, quantity: foundProduct.quantity + 1}, ...newCartItems] // update the existing item
      // setCartItems(newCartItems)
      foundProduct.quantity += 1;
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTtoalQuantities => prevTtoalQuantities + 1)
    }
    else if ( value === 'dec') {
      if (foundProduct.quantity > 1) {
        // newCartItems = [{ ...foundProduct, quantity: foundProduct.quantity - 1}, ...newCartItems]
        // setCartItems(newCartItems)
        foundProduct.quantity -= 1;
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTtoalQuantities => prevTtoalQuantities - 1)
      }
    }
  }

  const removeItem = ( id ) => {
    foundProduct = cartItems.find((cartItem) => cartItem._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(newCartItems);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTtoalQuantities => prevTtoalQuantities - foundProduct.quantity);
  }
  
  
  return (
    <Context.Provider 
      value={{
        showCart, 
        cartItems, 
        totalPrice, 
        totalQuantities, 
        qty,
        setShowCart,
        increaseQty,
        decreaseQty,
        addOnCart,
        toggleCartItemQuantity,
        removeItem,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
      >
        {children}
    </Context.Provider>
  );
}


export const useStateContext = () =>  useContext(Context);