import { CategoryResponseDto } from "./category-response-dto";

export interface ProductResponseDTO {
  id: number;
  productId: string;
  barcode:string;
  name: string;
  description: string;
  price: number;
  oldPrice: number | undefined;
  discount: number | undefined;
  imageUrl: string | null;
  inStock: boolean;
  quantity: number;
  brand: string;
  category: string;
  taxClass: string;
  createdTime: number[];
  photoUrls: string[];
  subCategories: CategoryResponseDto[];  // sous-catégories associées

}
