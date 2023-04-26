import { createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductContext = createContext({});

export function ProductContextProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });
  // const [selectedProducts, setSelectedProducts] = useState([]);
  return (
    <ProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
