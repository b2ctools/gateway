import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Account, Scope } from "../../domain/account.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class AddAccountRequest
  implements Omit<Account, "id" | "tenantId" | "permissions" | "type">
{
  @IsNotEmpty()
  @IsString()
  userId: ID;

  @IsNotEmpty()
  @IsString()
  storeId?: ID;

  @IsEnum(Scope)
  scope: Scope;

  @IsString()
  @IsOptional()
  tenantId?: ID;
}
