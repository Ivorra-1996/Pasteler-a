'use server';
import { Cart } from '@/components/Cart';

const PageCart = async () => {
  return <Cart/>; // Le pasamos los productos como `props` a `Cart`
};

export default PageCart;
