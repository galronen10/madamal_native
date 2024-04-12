export interface IUserLoginDetails {
  email: string;
  password: string;
}

export interface IUserRegister extends IUserLoginDetails {
  fullName: string;
  imageUrl?: string;
}

export interface IUserFromDb {
  uid: string;
  email: string;
  fullName: string;
}

export interface IStoreUser extends IUserFromDb {
  imageUri?: string;
}
