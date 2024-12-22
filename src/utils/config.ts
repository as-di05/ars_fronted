import { IRealEstate, IReStatus, IRoom } from "../types/types";

export const realEstateData: IRealEstate[] = [
  {
    id: 1,
    idFloor: 8,
    idSeries: 1,
    category: {
      id: 1,
      label: "Квартира",
    },
    idRoom: 2,
    dealType: {
      id: 3,
      label: "Рассрочка",
    },
    idWallMaterial: 1,
    ownerPhone: "996500005535",
    ownerName: "Улукбеков Адилет",
    idStatus: 2,
    statusUpdatedAt: "2024-12-15T12:34:12.000Z",
    createdAt: "2024-12-15T12:34:12.000Z",
    updatedAt: "2024-12-15T15:32:45.000Z",
    area: 59,
    district: "Район молодой гвардии",
    description: "Сдача под ПСО назначена на март месяц 2025 года",
    documents: [
      {
        id: 1,
        label: "Договор купли-продажи",
      },
    ],
    prices: [
      {
        id: 1,
        currency: "USD",
        createdAt: "2024-12-15 21:26:35.000000",
        updatedAt: "2024-12-15 21:26:35.000000",
        ownerPrice: 60000,
        objectPrice: 65000,
      },
    ],
  },
  {
    id: 2,
    idFloor: 8,
    idSeries: 1,
    category: {
      id: 1,
      label: "Квартира",
    },
    idRoom: 2,
    dealType: {
      id: 3,
      label: "Рассрочка",
    },
    idWallMaterial: 1,
    ownerPhone: "996500005535",
    ownerName: "Улукбеков Адилет",
    idStatus: 2,
    statusUpdatedAt: "2024-12-15T15:39:00.000Z",
    createdAt: "2024-12-15T15:39:00.000Z",
    updatedAt: "2024-12-15T15:39:00.000Z",
    area: 59,
    district: "Район молодой гвардии",
    description: "Сдача под ПСО назначена на 1 квартал 2025 года",
    documents: null,
    prices: null,
  },
  {
    id: 3,
    idFloor: 8,
    idSeries: 1,
    category: {
      id: 1,
      label: "Квартира",
    },
    idRoom: 2,
    dealType: {
      id: 3,
      label: "Рассрочка",
    },
    idWallMaterial: 1,
    ownerPhone: "996500005535",
    ownerName: "Улукбеков Адилет",
    idStatus: 2,
    statusUpdatedAt: "2024-12-15T15:41:20.000Z",
    createdAt: "2024-12-15T15:41:20.000Z",
    updatedAt: "2024-12-15T15:41:20.000Z",
    area: 59,
    district: "Район молодой гвардии",
    description: "Сдача под ПСО назначена на 1 квартал 2025 года",
    documents: null,
    prices: [
      {
        id: 2,
        currency: "USD",
        createdAt: "2024-12-15 21:41:20.000000",
        updatedAt: "2024-12-15 21:41:20.000000",
        ownerPrice: 100000,
        objectPrice: null,
      },
    ],
  },
  {
    id: 4,
    idFloor: 8,
    idSeries: 1,
    category: {
      id: 1,
      label: "Квартира",
    },
    idRoom: 2,
    dealType: {
      id: 3,
      label: "Рассрочка",
    },
    idWallMaterial: 1,
    ownerPhone: "996500005535",
    ownerName: "Улукбеков Адилет",
    idStatus: 2,
    statusUpdatedAt: "2024-12-15T15:42:14.000Z",
    createdAt: "2024-12-15T15:42:14.000Z",
    updatedAt: "2024-12-15T15:42:14.000Z",
    area: 59,
    district: "Район молодой гвардии",
    description: "Сдача под ПСО назначена на 1 квартал 2025 года",
    documents: [
      {
        id: 5,
        label: "Договор долевого участия",
      },
    ],
    prices: [
      {
        id: 3,
        currency: "USD",
        createdAt: "2024-12-15 21:42:14.000000",
        updatedAt: "2024-12-15 21:42:14.000000",
        ownerPrice: 100000,
        objectPrice: null,
      },
      {
        id: 4,
        currency: "USD",
        createdAt: "2024-12-15 21:42:47.000000",
        updatedAt: "2024-12-15 21:42:47.000000",
        ownerPrice: 70000,
        objectPrice: 75000,
      },
    ],
  },
];

export const FloorsObj: { [key: number]: IRoom } = {
  1: {
    id: 1,
    label: "1 этаж",
  },
  2: {
    id: 2,
    label: "2 этаж",
  },
  3: {
    id: 3,
    label: "3 этаж",
  },
  4: {
    id: 4,
    label: "4 этаж",
  },
  5: {
    id: 5,
    label: "5 этаж",
  },
  6: {
    id: 6,
    label: "6 этаж",
  },
  7: {
    id: 7,
    label: "7 этаж",
  },
  8: {
    id: 8,
    label: "8 этаж",
  },
  9: {
    id: 9,
    label: "9 этаж",
  },
};

export const RoomsObj: { [key: number]: IRoom } = {
  1: {
    id: 1,
    label: " 1 ком",
  },
  2: {
    id: 2,
    label: " 2 ком",
  },
  3: {
    id: 3,
    label: " 3 ком",
  },
  4: {
    id: 4,
    label: " 4 ком",
  },
  5: {
    id: 5,
    label: " 5 ком",
  },
  6: {
    id: 6,
    label: " 6 ком",
  },
  7: {
    id: 7,
    label: " 7 ком",
  },
};

export const ReStatusObj: { [key: number]: IReStatus } = {
  1: {
    id: 1,
    color: "#50d503",
    label: "Продано",
  },
  2: {
    id: 2,
    color: "#10b4e7",
    label: "Актуально",
  },
  3: {
    id: 3,
    color: "#a4abb6",
    label: "Неактуально",
  },
};
