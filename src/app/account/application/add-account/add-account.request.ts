import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Account, Scope } from "../../domain/account.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class AddAccountRequest
  implements Omit<Account, "id" | "tenantId" | "permissions">
{
  @IsNotEmpty()
  @IsString()
  userId: ID;

  @IsNotEmpty()
  @IsString()
  storeId: string;

  @IsEnum(Scope)
  scope: Scope;
}
