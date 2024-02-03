import { IsNotEmpty, IsString } from 'class-validator';
export class LogoutRequest {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
