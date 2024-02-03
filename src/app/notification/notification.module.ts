import { Module } from "@nestjs/common";
import { EmailService } from "./domain/email.service";

@Module({
    providers: [EmailService],
    exports: [EmailService]
})
export class NotificationModule {}