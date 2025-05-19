interface OrderItem {
  quantity: number;
  unit_price: number;
}

interface OrderItemReponse extends OrderItem {
  id?: number;
  quantity: number;
  unit_price: number;
  orderId?: number;
  menuItemId?: number;
  createdAt?: string;
}

interface Order {
  customerId: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  total_amount: number;
  platform_charge: number;
  sms_charge: number;
  delivery_charge: number;
  payment_status: boolean;
}

export interface OrderResponse extends Order {
  id?: number;
  createdAt?: string;
  orderItems?: OrderItemReponse[];
  grand_total?: number;
}
