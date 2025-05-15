export interface IMenuItem {
  available: boolean;
  createdAt?: string;
  customerId?: number;
  description: string;
  id: number;
  image_url?: string;
  name: string;
  price: number;
}

export interface ICartItem {
  available: boolean;
  createdAt?: string;
  customerId?: number;
  description: string;
  id: number;
  image_url?: string;
  name: string;
  price: number;
  quantity?: number;
}
