import { OrderItemRequest } from "./order-item-request";

export interface OrderRequestDTO {
  userId: string;
  addressId : number | null;
  couponCode?: string;
  deliveryOption: 'standard' | 'express'; // "standard" => 2-3 jours, "express" => 24h
  paymentMethod: 'cod' | 'card'; // méthode de paiement choisie
  items: OrderItemRequest[];
}