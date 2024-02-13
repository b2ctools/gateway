
import { ID } from '../../../shared/abstract-repository/repository.interface';
import { Account, Scope } from '../../domain/account.interface';
import { AddAccountRequest } from './add-account.request';

export class AddAccountCommand
  implements Omit<Account, 'id' | 'tenantId' | 'permissions'>
{
  userId: ID;
  storeId: ID;
  scope: Scope;

  constructor(request: AddAccountRequest) {
    const { userId, storeId, scope } = request;
    this.userId = userId;
    this.storeId = storeId;
    this.scope = scope;
        
  }
}
