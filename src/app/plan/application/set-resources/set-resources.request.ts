import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class SetResourcesRequest {
  @IsNotEmpty()
  @IsString()
  id: ID;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  resources: string[];
}
