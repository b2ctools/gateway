import { IsNotEmpty, IsString } from "class-validator";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class SetPlanRequest {
  @IsNotEmpty()
  @IsString()
  id: ID;

  @IsNotEmpty()
  @IsString()
  planId: ID;
}
