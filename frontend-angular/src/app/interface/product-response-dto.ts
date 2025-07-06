export interface ProductResponseDTO {
  id: number;
  productId: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  imageUrl: string | null;
  inStock: boolean;
  quantity: number;
  brand: string;
  category: string;
  taxClass: string;
  createdTime: number[];
  photoUrls: string[];
}
