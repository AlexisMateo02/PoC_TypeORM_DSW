// types/index.ts

export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  products?: Product[];
}

export interface Tag extends BaseEntity {
  name: string;
  color?: string;
  description?: string;
  products?: Product[];
}

export interface Product extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: Category;
  tags: Tag[];
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
}

export interface CreateTagDTO {
  name: string;
  color?: string;
  description?: string;
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  tagIds: string[];
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
}

export interface UpdateTagDTO {
  name?: string;
  color?: string;
  description?: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  tagIds?: string[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}