import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class UpdateClientRequest {
  @IsNotEmpty()
  @IsString()
  id: ID;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;
}
