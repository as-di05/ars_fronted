import { IReStatus, IRoom, IUser } from "../types/types";

export const usersData: IUser[] = [
  {
    id: 1,
    firstName: "Adilet",
    lastName: "Ulukbekov",
    phoneNumber: "996500005535",
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
    phoneNumber: "996500005535",
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
    phoneNumber: "+1234567890",
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
  10: {
    id: 10,
    label: "10 этаж",
  },
  11: {
    id: 11,
    label: "11 этаж",
  },
  12: {
    id: 12,
    label: "12 этаж",
  },
  13: {
    id: 13,
    label: "13 этаж",
  },
  14: {
    id: 14,
    label: "14 этаж",
  },
  15: {
    id: 15,
    label: "15 этаж",
  },
  16: {
    id: 16,
    label: "16 этаж",
  },
  17: {
    id: 17,
    label: "17 этаж",
  },
  18: {
    id: 18,
    label: "18 этаж",
  },
  19: {
    id: 19,
    label: "19 этаж",
  },
  20: {
    id: 20,
    label: "20 этаж",
  },
  21: {
    id: 21,
    label: "21 этаж",
  },
  22: {
    id: 22,
    label: "22 этаж",
  },
  23: {
    id: 23,
    label: "23 этаж",
  },
  24: {
    id: 24,
    label: "24 этаж",
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
