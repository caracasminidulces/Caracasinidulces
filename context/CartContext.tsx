"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  nombre: string;
  descripcion: string;
  imagen: string;
  cantidad: number;
  categoria?: string;
  textura?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "cantidad">, cantidad?: number) => void;
  removeFromCart: (nombre: string) => void;
  updateQuantity: (nombre: string, cantidad: number) => void;
  clearCart: () => void;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar el carrito desde localStorage al montar en el cliente (evita errores de hidratación SSR)
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("caracas_mini_dulces_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error al cargar el carrito de localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Sincronizar el carrito con localStorage cuando cambie (solo si ya se cargó inicialmente)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("caracas_mini_dulces_cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error al guardar el carrito en localStorage:", error);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (item: Omit<CartItem, "cantidad">, cantidadToAdd = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.nombre === item.nombre);
      if (existingItem) {
        return prevCart.map((i) =>
          i.nombre === item.nombre
            ? { ...i, cantidad: i.cantidad + cantidadToAdd }
            : i
        );
      }
      return [...prevCart, { ...item, cantidad: cantidadToAdd }];
    });
    // Abrir el drawer automáticamente al añadir
    setIsCartOpen(true);
  };

  const removeFromCart = (nombre: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.nombre !== nombre));
  };

  const updateQuantity = (nombre: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(nombre);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.nombre === nombre ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
