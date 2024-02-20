import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Client } from "../../domain/client.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

export class AddClientRequest implements Omit<Client, "id" | "tenantId"> {
  @IsNotEmpty()
  @IsString()
  userId: ID;

  @IsString()
  @IsOptional()
  description?: string;
}
