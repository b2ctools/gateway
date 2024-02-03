import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
  } from 'class-validator';
import { ID } from '../../../shared/abstract-repository/repository.interface';
import { User } from '../../domain/user.interface';
export class RegisterUserRequest implements Omit<User, 'id' | 'status' | 'role' | 'recoveryPasswordCode' | 'failedLogin'> {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    tenantId: ID;
}