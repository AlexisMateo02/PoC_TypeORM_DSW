import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  Product,
  Category,
  Tag,
  CreateProductDTO,
  UpdateProductDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
  CreateTagDTO,
  UpdateTagDTO,
  ApiResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        console.error('API error:', error.response?.data || error.message);
        
        if (error.response?.status === 404) {
          throw new Error('Recurso no encontrado');
        } else if (error.response?.status >= 500) {
          throw new Error('Error del servidor. Inténtelo más tarde.');
        } else if (error.response?.status === 400) {
          throw new Error(error.response?.data?.message || 'Datos inválidos');
        }
        
        throw new Error(error.response?.data?.message || 'Error de conexión');
      }
    );
  }

  private handleResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return response.data;
  }

  // Products API
  async getProducts(): Promise<ApiResponse<Product[]>> {
    const response = await this.api.get<ApiResponse<Product[]>>('/products');
    return this.handleResponse(response);
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    const response = await this.api.get<ApiResponse<Product>>(`/products/${id}`);
    return this.handleResponse(response);
  }

  async createProduct(data: CreateProductDTO): Promise<ApiResponse<Product>> {
    const response = await this.api.post<ApiResponse<Product>>('/products', data);
    return this.handleResponse(response);
  }

  async updateProduct(id: string, data: UpdateProductDTO): Promise<ApiResponse<Product>> {
    const response = await this.api.put<ApiResponse<Product>>(`/products/${id}`, data);
    return this.handleResponse(response);
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete<ApiResponse<void>>(`/products/${id}`);
    return this.handleResponse(response);
  }

  // Categories API
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await this.api.get<ApiResponse<Category[]>>('/categories');
    return this.handleResponse(response);
  }

  async getCategory(id: string): Promise<ApiResponse<Category>> {
    const response = await this.api.get<ApiResponse<Category>>(`/categories/${id}`);
    return this.handleResponse(response);
  }

  async createCategory(data: CreateCategoryDTO): Promise<ApiResponse<Category>> {
    const response = await this.api.post<ApiResponse<Category>>('/categories', data);
    return this.handleResponse(response);
  }

  async updateCategory(id: string, data: UpdateCategoryDTO): Promise<ApiResponse<Category>> {
    const response = await this.api.put<ApiResponse<Category>>(`/categories/${id}`, data);
    return this.handleResponse(response);
  }

  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete<ApiResponse<void>>(`/categories/${id}`);
    return this.handleResponse(response);
  }

  // Tags API
  async getTags(): Promise<ApiResponse<Tag[]>> {
    const response = await this.api.get<ApiResponse<Tag[]>>('/tags');
    return this.handleResponse(response);
  }

  async getTag(id: string): Promise<ApiResponse<Tag>> {
    const response = await this.api.get<ApiResponse<Tag>>(`/tags/${id}`);
    return this.handleResponse(response);
  }

  async createTag(data: CreateTagDTO): Promise<ApiResponse<Tag>> {
    const response = await this.api.post<ApiResponse<Tag>>('/tags', data);
    return this.handleResponse(response);
  }

  async updateTag(id: string, data: UpdateTagDTO): Promise<ApiResponse<Tag>> {
    const response = await this.api.put<ApiResponse<Tag>>(`/tags/${id}`, data);
    return this.handleResponse(response);
  }

  async deleteTag(id: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete<ApiResponse<void>>(`/tags/${id}`);
    return this.handleResponse(response);
  }
}

export const api = new ApiService();