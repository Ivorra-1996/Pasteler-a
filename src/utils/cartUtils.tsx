// utils/cartUtils.ts
import type { CartItem } from '@/types/cart';

// Función para establecer la data del carrito
export const setCartData = (data: CartItem[]) => {
    if (typeof window !== "undefined") {
        // Guardamos la data del carrito en localStorage
        localStorage.setItem('cartData', JSON.stringify(data));
    }
};

// Función para obtener la data del carrito
export const getCartData = (): CartItem[] => {
    if (typeof window !== "undefined") {
        // Obtenemos la data del carrito desde localStorage
        const data = localStorage.getItem('cartData');
        // Si hay datos, los parseamos y los retornamos, si no, retornamos un array vacío
        return data ? JSON.parse(data) : [];
    }
    return []; // Si está en el servidor, retornamos un array vacío
};
