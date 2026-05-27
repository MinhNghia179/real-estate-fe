export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  phone?: string;
  bio?: string;
  createdAt: Date;
}

export type PropertyType = 'apartment' | 'house' | 'commercial' | 'land';
export type PropertyStatus = 'available' | 'sold' | 'rented';
export type TransactionType = 'sale' | 'rent';

export interface PropertyLocation {
  address: string;
  city: string;
  district?: string;
  latitude: number;
  longitude: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  transactionType: TransactionType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: PropertyLocation;
  images: string[];
  amenities?: string[];
  ownerId: string;
  ownerName?: string;
  isFavorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: Date;
  read: boolean;
}

export interface Chat {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerId: string;
  sellerId: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
