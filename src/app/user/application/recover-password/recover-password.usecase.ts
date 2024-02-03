import { Inject, Injectable } from "@nestjs/common";
import { RecoveryPasswordService } from "../../domain/recovery-password.service";
import { RecoverPasswordCommand } from "./recover-password.command";

@Injectable()
export class RecoverPasswordUseCase {
    constructor(
        @Inject(RecoveryPasswordService)
        private readonly recoveryPasswordService: RecoveryPasswordService,
    ){}

    async execute(command: RecoverPasswordCommand) {
        const { email, recoveryPasswordToken, newPassword } = command;
        return await this.recoveryPasswordService.recoverPassword(
            email,
            recoveryPasswordToken,
            newPassword
        );
    }
}