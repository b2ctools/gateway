import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateResourceRequest {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
