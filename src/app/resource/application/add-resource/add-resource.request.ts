import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Resource, ResourseModuleType } from "../../domain/resource.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class AddResourceRequest implements Omit<Resource, "id" | "tenantId"> {
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;
  
  @IsNotEmpty()
  @IsString()
  module: ResourseModuleType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissions: ID[];
  
}
