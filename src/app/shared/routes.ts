import { RequestMethod } from "@nestjs/common";

export const userPath = "users";
export const storePath = "stores";
export const productCategoryPath = "product-category";
export const brandPath = "brands";
export const countryPath = "country";
export const samplePath = "sample";
export const accountPath = "account";
export const orderPath = "order";
export const customerPath = "customers";
export const tenantPath = "tenant";
export const planPath = "plan";
export const resourcePath = "resource";
export const permissionPath = "permission";

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
