
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Plan } from "../../domain/plan.interface"

export class AddPlanRequest implements Omit<Plan, 'id' | 'tenantId'>{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

}
