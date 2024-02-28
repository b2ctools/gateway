import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateBrandRequest {

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
