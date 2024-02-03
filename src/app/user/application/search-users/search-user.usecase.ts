import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../../domain/user.service';
import { SearchRequest } from '../../../shared/base.request';

@Injectable()
export class SearchUsersUseCase {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async execute(request: SearchRequest) {
    return await this.userService.findAllUsers(request);
  }
}
