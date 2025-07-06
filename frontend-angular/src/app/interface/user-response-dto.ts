export interface UserResponseDTO {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  address?: string;
  profileImgUrl?: string;
  aboutMe?: string;
  country?: string;
  enabled: boolean;
  createdTime: string;
  accountStatus?: { [key: string]: boolean };
}
