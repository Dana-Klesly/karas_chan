// create and get cart all data
export interface Cart {
  id: string;
  userId: string;
  status: string;
  checkedOutAt: Date;
  archivedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
// create cart item
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OneCartItem {
  productId: string;
  quantity: number;
}
