import { Module } from "@nestjs/common";
import { PermissionsController } from "./application/permissions.controller";

@Module({
  controllers: [PermissionsController],
})
export class AccessModule {}
