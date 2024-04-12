export interface IUserLoginDetails {
  email: string;
  password: string;
}

export interface IUserUpdateDto {
  fullName: string;
  imageUrl?: string;
}

export type IUserRegister = IUserUpdateDto & IUserLoginDetails;

export interface IUserFromDb {
  uid: string;
  email: string;
  fullName: string;
}

export interface IStoreUser extends IUserFromDb {
  imageUrl?: string;
}
