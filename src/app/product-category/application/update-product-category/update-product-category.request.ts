import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateProductCategoryRequest {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
