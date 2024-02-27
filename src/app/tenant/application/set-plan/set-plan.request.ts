import { IsNotEmpty, IsString } from "class-validator";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class SetPlanRequest {
  @IsNotEmpty()
  @IsString()
  id: ID;

  @IsNotEmpty()
  @IsString()
  planId: ID;
}
