import { Controller, Get } from "@nestjs/common";
import { jsonPermissions } from "../domain/permissions";

@Controller("permissions")
export class PermissionsController {
  @Get()
  permissions() {
    return jsonPermissions;
  }
}
