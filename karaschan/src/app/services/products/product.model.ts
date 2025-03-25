export interface Product {
  data: {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
