interface IOrders {
  customerId: number | null;
  status: string;
  total_amount: number;
  delivery_charge: number;
  platform_charge: number;
  sms_charge: number;
  payment_status: boolean;
}

export interface OrderItemWithName {
  id: number;
  quantity: number;
  unit_price: number;
  orderId: number;
  menuItemId: number;
  createdAt: string | Date; // ISO 8601 date string
  item?: {
    name?: string;
  };
}

export interface SingleOrder {
  orderId: number;
  orderItem: string;
  total: number;
  date: string;
  status: boolean;
}

interface IOrderItem {
  quantity: number;
  unit_price: number;
  orderId?: number | null;
  menuItemId: number;
}

export interface OrderCreateInput {
  order: IOrders;
  order_item: IOrderItem[];
}
