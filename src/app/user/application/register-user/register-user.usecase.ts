import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../domain/user.service";
import { RegisterUserCommand } from "./register-user.command";
import { UserDto, userToDto } from "../../domain/user.interface";
import { CountryService } from "../../../country/domain/country.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(CountryService)
    private readonly countryService: CountryService,
  ) {}

  private async validateCountry(countryId: ID): Promise<void> {
    if (countryId) {
      await this.countryService.findByIdOrFail(countryId);
    }
  }

  async execute(comand: RegisterUserCommand): Promise<UserDto> {
    const { countryId } = comand;
    // validate countryId
    await this.validateCountry(countryId);

    const user = await this.userService.registerUser(comand);
    return userToDto(user);
  }
}
