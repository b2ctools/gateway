import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Store, StoreAddress } from "../../domain/store.interface";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

export class UpdateStoreRequest implements Omit<Store, "id">{

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  address: StoreAddress;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  logo: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  managedBy: ID;
}
