import { RequestMethod } from "@nestjs/common";

export const userPath = "users";
export const storePath = "stores";
export const productCategoryPath = "categories";
export const brandPath = "brands";
export const countryPath = "countries";
export const samplePath = "samples";
export const accountPath = "accounts";
export const orderPath = "order";
export const customerPath = "customers";
export const tenantPath = "tenants";
export const planPath = "plans";
export const resourcePath = "resources";
export const permissionPath = "permissions";

export const excludeRoutes = [
  { path: "/", method: RequestMethod.GET },
  { path: "/login", method: RequestMethod.POST },
  { path: "/logout", method: RequestMethod.POST },
  { path: "/refresh-token", method: RequestMethod.POST },

  { path: userPath + "/register", method: RequestMethod.POST },
  { path: userPath + "/send-recovery-password", method: RequestMethod.POST },
  { path: userPath + "/recover-password", method: RequestMethod.POST },

  // TODO: just for testing... remove it later.
  // { path: samplePath, method: RequestMethod.POST },
  // { path: samplePath, method: RequestMethod.GET },
  // { path: samplePath + "/:id", method: RequestMethod.DELETE },
  // { path: samplePath, method: RequestMethod.PATCH },

  { path: planPath + "/plan/set-resources", method: RequestMethod.POST },
];
