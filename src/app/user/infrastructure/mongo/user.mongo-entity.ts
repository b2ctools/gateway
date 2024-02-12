import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { MongoEntity } from "../../../shared/abstract-repository/entities/mongo-entity";
import { User, UserRole, UserStatus } from "../../domain/user.interface";

export class UserMongoEntity extends MongoEntity implements Omit<User, 'id'> {
    name: string;
    email: string;
    password: string;
    status: UserStatus;
    role: UserRole;
    recoveryPasswordCode: string;
    failedLogin: number;
    nickname: string;
    phone: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    avatar: string;
    birthDay: Date;
    address: string;
    city: string;
    state: string;
    zip: string;
    countryId: ID;
}