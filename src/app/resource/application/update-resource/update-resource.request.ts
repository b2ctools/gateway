import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { Resource, ResourseModuleType } from "../../domain/resource.interface";

export class UpdateResourceRequest implements Omit<Partial<Resource>, "id"> {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  module: ResourseModuleType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissions: ID[];
}
