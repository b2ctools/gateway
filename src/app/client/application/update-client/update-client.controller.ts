import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { clientPath } from "../../../shared/routes";
import { clientToDto } from "../../domain/client.interface";
import { UpdateClientUseCse } from "./update-client.usecase";
import { UpdateClientRequest } from "./update-client.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(clientPath)
export class UpdateClientController {
  constructor(
    @Inject(UpdateClientUseCse)
    private readonly useCase: UpdateClientUseCse,
  ) {}

  @Patch(":id")
  async updateClient(
    @Param("id") id: ID,
    @Body() request: UpdateClientRequest,
  ) {
    const pc = await this.useCase.execute(id, request);
    return clientToDto(pc);
  }
}
