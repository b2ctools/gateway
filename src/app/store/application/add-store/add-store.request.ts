import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Store, StoreAddress } from "../../domain/store.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class AddStoreRequest implements Omit<Store, "id" | "managedBy"> {
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @Optional()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Optional()
  address: StoreAddress;

  @IsNotEmpty()
  @IsString()
  @Optional()
  logo: string;

  @IsNotEmpty()
  @IsString()
  @Optional()
  tenantId: ID;
}
