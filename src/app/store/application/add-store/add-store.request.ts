import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Store, StoreAddress } from "../../domain/store.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class AddStoreRequest implements Omit<Store, "id" | "managedBy"> {
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  address: StoreAddress;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  tenantId: ID;
}
