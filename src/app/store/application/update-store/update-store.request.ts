import { ID } from "../../../shared/abstract-repository/repository.interface";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateStoreRequest {
  @IsNotEmpty()
  @IsString()
  id: ID;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
