import { MockedEntity } from '../../../shared/abstract-repository/entities/mocked-entity';
import { User, UserRole, UserStatus } from '../../domain/user.interface';

export class UserMockedEntity extends MockedEntity implements Omit<User, 'id'> {
    name: string;
    user: string;
    password: string;
    email: string;
    status: UserStatus;
    role: UserRole;
    recoveryPasswordCode: string;
    failedLogin: number;
}
