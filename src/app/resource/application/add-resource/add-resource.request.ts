import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Resource } from "../../domain/resource.interface";

export class AddResourceRequest implements Omit<Resource, "id" | "tenantId"> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
