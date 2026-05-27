import {
  type QueryConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { CreatePropertyInput, SearchPropertyInput } from '@schemas';

import type { Property } from '@models/models';

import { db } from '@config/firebase';

const COLLECTION = 'properties';

const mapDoc = (id: string, data: Record<string, unknown>): Property => ({
  id,
  title: data.title as string,
  description: data.description as string,
  price: data.price as number,
  type: data.type as Property['type'],
  status: (data.status as Property['status']) ?? 'available',
  transactionType: data.transactionType as Property['transactionType'],
  bedrooms: data.bedrooms as number,
  bathrooms: data.bathrooms as number,
  area: data.area as number,
  location: data.location as Property['location'],
  images: data.images as string[],
  amenities: data.amenities as string[] | undefined,
  ownerId: data.ownerId as string,
  ownerName: data.ownerName as string | undefined,
  isFavorite: false,
  createdAt: (data.createdAt as { toDate: () => Date })?.toDate() ?? new Date(),
  updatedAt: (data.updatedAt as { toDate: () => Date })?.toDate() ?? new Date(),
});

export const propertyService = {
  getAllProperties: async (filters?: SearchPropertyInput): Promise<Property[]> => {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    if (filters?.city) constraints.push(where('location.city', '==', filters.city));
    if (filters?.bedrooms) constraints.push(where('bedrooms', '>=', filters.bedrooms));

    const q = query(collection(db, COLLECTION), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapDoc(d.id, d.data() as Record<string, unknown>));
  },

  getPropertyById: async (id: string): Promise<Property | null> => {
    const docSnap = await getDoc(doc(db, COLLECTION, id));
    if (!docSnap.exists()) return null;
    return mapDoc(docSnap.id, docSnap.data() as Record<string, unknown>);
  },

  createProperty: async (data: CreatePropertyInput, ownerId: string): Promise<Property> => {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      ownerId,
      status: 'available',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const created = await getDoc(docRef);
    return mapDoc(created.id, created.data() as Record<string, unknown>);
  },

  updateProperty: async (id: string, data: Partial<CreatePropertyInput>): Promise<void> => {
    await updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: serverTimestamp() });
  },

  deleteProperty: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, COLLECTION, id));
  },

  getPropertiesByOwner: async (ownerId: string): Promise<Property[]> => {
    const q = query(
      collection(db, COLLECTION),
      where('ownerId', '==', ownerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => mapDoc(d.id, d.data() as Record<string, unknown>));
  },
};
