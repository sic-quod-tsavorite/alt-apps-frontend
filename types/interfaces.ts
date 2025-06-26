export type Program = {
  _id: string;
  name: string;
  description: string;
  logo: string;
  country: string;
  isHidden: boolean;
};

export type newPrg = Omit<Program, "_id"> & {
  _createdBy?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  registerDate: string;
};
