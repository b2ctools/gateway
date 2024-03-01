import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateCategoryRequest {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
