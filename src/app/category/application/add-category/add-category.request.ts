import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { Category } from "../../domain/category.interface";

export class AddCategoryRequest
  implements Omit<Category, "id" | "status">
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  parent: ID;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  tenantId: ID;
}

class JsonCategory {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => JsonCategory)
  subcategories?: JsonCategory[];
}

export class AddCategoryJSONRequest {
  // @IsNotEmpty()
  // @IsJSON({ message: "Product Categories must be a valid JSON string.!"})
  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JsonCategory)
  categories: JsonCategory[];

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  tenantId: ID;
}
