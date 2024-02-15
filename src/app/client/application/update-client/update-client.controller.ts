import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { clientPath } from "../../../shared/routes";
import { clientToDto } from "../../domain/client.interface";
import { UpdateClientUseCse } from "./update-client.usecase";
import { UpdateClientRequest } from "./update-client.request";

@Controller(clientPath)
export class UpdateClientController {
  constructor(
    @Inject(UpdateClientUseCse)
    private readonly useCase: UpdateClientUseCse,
  ) {}

  @Patch()
  async updateClient(@Body() request: UpdateClientRequest) {
    const pc = await this.useCase.execute(request);
    return clientToDto(pc);
  }
}
