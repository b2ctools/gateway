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
}