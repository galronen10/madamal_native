export interface IUserLoginDetails {
  email: string;
  password: string;
}

export interface IUserUpdateDto {
  fileName: string;
  imageUrl?: string;
}

export type IUserRegister = IUserUpdateDto & IUserLoginDetails;

export interface IBasicUserData {
  email: string;
  fullName: string;
  imageUrl?: string;
}

export interface StoreUser extends IBasicUserData {
  userId: string;
}
export interface UserDto extends IBasicUserData {
  _id: string;
}
