import { Inject, Injectable } from '@nestjs/common';
import { RecoveryPasswordService } from '../../domain/recovery-password.service';

@Injectable()
export class SendRecoveryTokenUseCase {
  constructor(
    @Inject(RecoveryPasswordService)
    private readonly recoveryPasswordService: RecoveryPasswordService
  ) {}

  async execute(email: string){
    await this.recoveryPasswordService.sendRecoveryPasswordToken(email);
  }
}
