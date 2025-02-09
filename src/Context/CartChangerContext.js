import { createContext, useState } from "react";

export const Cart = createContext("");

export default function CartChangercontext({ children }) {
  const [isChange, setIsChange] = useState(true);
  return (
    <Cart.Provider value={{ isChange, setIsChange }}>{children}</Cart.Provider>
  );
}
