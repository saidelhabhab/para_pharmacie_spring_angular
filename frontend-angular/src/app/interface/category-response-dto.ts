export interface CategoryResponseDto {
  id: number;
  name: string;
  parentCategory?: string; // optionnel, si tu veux afficher la catégorie principale liée

}
