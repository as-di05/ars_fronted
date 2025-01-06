import { IRealEstate, IReStatus, IRoom, IUser } from "../types/types";

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
    employee: {
      id: 1,
      avatarUrl: null,
      phone: "996500005535",
      roleId: 1,
      lastName: "Ulukbekov",
      firstName: "Adilet",
    },
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
    image:
      "https://rent.brookfieldproperties.com/wp-content/uploads/2024/05/Atelier-PH7-08_Web.jpg",
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
    id: 5,
    idFloor: 8,
    idSeries: 1,
    category: {
      id: 1,
      label: "Квартира",
    },
    employee: {
      id: 1,
      avatarUrl:
        "https://img.tapimg.net/market/images/1cf93eb96436b0740f38d749f31c0ccc.jpg",
      phone: "996500005535",
      roleId: 1,
      lastName: "Ulukbekov",
      firstName: "Adilet",
    },
    dealType: {
      id: 1,
      label: "Наличный расчет",
    },
    idRoom: 5,
    idWallMaterial: 1,
    ownerPhone: "996500005535",
    ownerName: "Улукбеков Адилет",
    idStatus: 2,
    statusUpdatedAt: "2024-12-23T07:33:10.000Z",
    createdAt: "2024-12-23T07:33:10.000Z",
    updatedAt: "2024-12-23T07:33:10.000Z",
    area: 59,
    district: "Филармония",
    description:
      "Сдача под ПСО назначена на 1 квартал 2025 года./n \n Есть центральное отопление. Тихий район",
    documents: [
      {
        id: 1,
        label: "Договор купли-продажи",
      },
      {
        id: 3,
        label: "Генеральная доверенность",
      },
    ],
    image:
      "https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg",
    prices: [
      {
        id: 5,
        currency: "USD",
        createdAt: "2024-12-23 13:33:10.000000",
        updatedAt: "2024-12-23 13:33:10.000000",
        ownerPrice: 100000,
        objectPrice: 120000,
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
    employee: {
      id: 1,
      avatarUrl: null,
      phone: "996500005535",
      roleId: 1,
      lastName: "Ulukbekov",
      firstName: "Adilet",
    },
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
    image:
      "https://media.self.com/photos/630635c30b7f36ce816f374a/4:3/w_2560%2Cc_limit/DAB03919-10470989.jpg",
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
    employee: {
      id: 1,
      avatarUrl: null,
      phone: "996500005535",
      roleId: 1,
      lastName: "Ulukbekov",
      firstName: "Adilet",
    },
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
    description: `Продается 3 комнатная квартира расположенного в золотом квадрате!
                  находится на пересечении бульвара Эркиндик - улицы Боконбаева,
                  Премиальный жилой дом от надежного застройщика Бийик-Курулуш,`,
    documents: null,
    image:
      "https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg",
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
    employee: {
      id: 1,
      avatarUrl: null,
      phone: "996500005535",
      roleId: 1,
      lastName: "Ulukbekov",
      firstName: "Adilet",
    },
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
    image:
      "https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg",
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

export const usersData: IUser[] = [
  {
    id: 1,
    firstName: "Adilet",
    lastName: "Ulukbekov",
    phone: "996500005535",
    avatarUrl: null,
    role: {
      id: 1,
      label: "Управляющий",
    },
  },
  {
    id: 2,
    firstName: "Jork",
    lastName: "Doe",
    phone: "996500005535",
    avatarUrl: null,
    role: {
      id: 2,
      label: "Менеджер",
    },
  },
  {
    id: 4,
    firstName: "Jinn",
    lastName: "Deels",
    phone: "+1234567890",
    avatarUrl: null,
    role: {
      id: 2,
      label: "Менеджер",
    },
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

export const IdTypeObj: { [key: number]: string } = {
  1: "A",
  2: "H",
  3: "S",
  4: "C",
};

export const categoriesData = [
  {
    id: 1,
    label: "Квартиры",
  },
  {
    id: 2,
    label: "Дома",
  },
  {
    id: 3,
    label: "Участки",
  },
  {
    id: 4,
    label: "Коммерческие помещения",
  },
];
