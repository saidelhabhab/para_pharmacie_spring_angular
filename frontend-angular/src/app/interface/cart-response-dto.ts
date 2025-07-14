import { CartItemResponseDTO } from "./cart-item-response-dto";

export interface CartResponseDTO {
  cartId: number;
  userId: string;
  items: CartItemResponseDTO[];
}
