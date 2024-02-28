import { IsArray, IsString } from "class-validator";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class SetPermissionsRequest {

  @IsArray()
  @IsString({ each: true })
  permissions: ID[];
}
