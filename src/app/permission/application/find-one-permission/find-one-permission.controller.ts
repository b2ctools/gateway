
import { Controller, Get, Inject, Param } from "@nestjs/common";
import { permissionPath } from "src/app/shared/routes";
import { FindOnePermissionUseCase } from "./find-one-permission.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { PermissionDto } from "../../domain/permission.interface";

@Controller(permissionPath)
export class FindOnePermissionController {
    constructor(
        @Inject(FindOnePermissionUseCase)
        private readonly useCase: FindOnePermissionUseCase
    ) {}

    @Get(":id")
    async findOne(@Param("id") id: ID): Promise<PermissionDto> {
        return await this.useCase.execute(id);
    }
}
