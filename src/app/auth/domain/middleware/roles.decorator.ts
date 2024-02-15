import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../../../user/domain/user.interface";

export const ROLES_KEY = "roles";
export const Roles = (roles: UserRole[]) => {
  console.log("Setting roles metadata, ", roles);
  return SetMetadata(ROLES_KEY, roles);
};
