import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateClientRequest {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
