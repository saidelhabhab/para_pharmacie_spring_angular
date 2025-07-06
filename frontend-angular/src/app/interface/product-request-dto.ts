export interface ProductRequestDTO {
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  imageFile?: File;
  photoFiles?: File[];
  inStock: boolean;
  quantity: number;
  brand: string;
  category: string;
  taxClass?: string;
}
