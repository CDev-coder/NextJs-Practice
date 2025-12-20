// This file defines the types used throughout the application.

export interface Product {
  id: string;
  name: string;
  category: string;
  animal: string;
  subcategory: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  animal: string;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}