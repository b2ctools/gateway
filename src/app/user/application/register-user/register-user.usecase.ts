import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../domain/user.service";
import { RegisterUserCommand } from "./register-user.command";
import { UserDto, userToDto } from "../../domain/user.interface";
import { AddressValidator } from "src/app/address/domain/address-validator.service";
import { IAddress } from "src/app/shared/address/address.interface";

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(AddressValidator)
    private readonly addressValidator: AddressValidator
  ) {}

  private async validateAddress(address: IAddress): Promise<boolean> {
    const validationResult = await this.addressValidator.validate(address);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.errors.join(", "));
    }
    return true;
  }

  async execute(comand: RegisterUserCommand): Promise<UserDto> {
    const { address } = comand;
    // validate countryId
    await this.validateAddress(address);

    const user = await this.userService.registerUser(comand);
    return userToDto(user);
  }
}
