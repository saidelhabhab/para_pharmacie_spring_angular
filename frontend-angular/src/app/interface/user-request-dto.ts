export interface UserRequestDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: string;
  phone: string;
  address?: string;
  profileImgBase64?: string;
  aboutMe?: string;
  country?: string;
}
