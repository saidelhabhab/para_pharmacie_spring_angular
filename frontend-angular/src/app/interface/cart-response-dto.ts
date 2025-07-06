import { CartItemResponseDTO } from "./cart-item-response-dto";

export interface CartResponseDTO {
  cartId: number;
  userId: number;
  items: CartItemResponseDTO[];
}
