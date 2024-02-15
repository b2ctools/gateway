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
import { ProductCategory } from "../../domain/product-category.interface";
import { Optional } from "@nestjs/common";

export class AddProductCategoryRequest
  implements Omit<ProductCategory, "id" | "tenantId">
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
}

class JsonCategory {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Optional()
  @ValidateNested({ each: true })
  @Type(() => JsonCategory)
  subcategories?: JsonCategory[];
}

export class AddProductCategoryJSONRequest {
  // @IsNotEmpty()
  // @IsJSON({ message: "Product Categories must be a valid JSON string.!"})
  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JsonCategory)
  categories: JsonCategory[];
}
