export interface ProductRequestDTO {
  name: string;
  description?: string;
  price: number;
  oldPrice?: number | null;
  discount?: number | null;
  imageFile?: File;
  photoFiles?: File[];
  inStock: boolean;
  quantity: number;
  brand: string;
  category: string;
  taxClass?: string;
  barcode?:string;
  subCategoryIds?: number[]; 
}
