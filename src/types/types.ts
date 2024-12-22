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

export interface IRealEstate {
  id: number;
  category: {
    id: number;
    label: string;
  };
  idFloor: number;
  idSeries: number;
  idRoom: number;
  dealType: {
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
  district: string;
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
