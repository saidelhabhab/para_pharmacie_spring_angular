import { OrderItemResponse } from "./order-item-response";

export interface OrderResponseDTO {
  orderId: string;
  userId: string;
  addressId : number;
  items: OrderItemResponse[];
  totalAmount: number;
  orderDate: string;
  status: string;
  couponCode?: string;
  discountAmount?: number;
}
