export interface IDocument {
  id: number;
  label: string;
}

export interface IPrice {
  id: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  ownerPrice: number;
  objectPrice: number | null;
}

interface Role {
  id: number;
  label: string;
}

export interface IUser {
  id: number;
  phoneNumber: string;
  roleId?: number;
  role?: Role;
  lastName: string;
  firstName: string;
  avatarUrl?: string | null;
}

export interface IRealEstate {
  id: number;
  category: {
    id: number;
    label: string;
  };
  employee: IUser;
  idFloor: number;
  idSeries: number;
  idRoom: number;
  dealType: {
    id: number;
    label: string;
  } | null;
  district: {
    id: number;
    label: string;
  } | null;
  idWallMaterial: number;
  ownerPhone: string;
  ownerName: string;
  idStatus: number;
  statusUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
  area: number;
  image?: string | null;
  description: string;
  documents?: IDocument[] | null;
  prices?: IPrice[] | null;
}

export interface IRoom {
  id: number;
  label: string;
}

export interface IReStatus {
  id: number;
  label: string;
  color: string;
}

export interface IRealEstateInput {
  id?: number;
  categoryId: number;
  ownerName: string;
  ownerPhone: string;
  idRoom: number;
  idFloor: number;
  area?: number;
  idSeries?: number;
  idDistrict?: number;
  idDealType?: number;
  idWallMaterial?: number;
  description?: string;
  documents?: number[] | null;
  images?: string[] | null;
  price?: IPrice | null;
}
