
import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { permissionPath } from "../../../shared/routes";
import { permissionToDto } from "../../domain/permission.interface";
import { UpdatePermissionUseCse } from "./update-permission.usecase";
import { UpdatePermissionRequest } from "./update-permission.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(permissionPath)
export class UpdatePermissionController {
    constructor(
        @Inject(UpdatePermissionUseCse)
        private readonly useCase: UpdatePermissionUseCse,
    ){}

    @Patch(":id")
    async updatePermission(@Param("id") id: ID, @Body() request: UpdatePermissionRequest){
        const pc = await this.useCase.execute(id, request)
        return permissionToDto(pc);
    }
}
