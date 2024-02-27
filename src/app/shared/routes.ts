import { RequestMethod } from "@nestjs/common";

export const userPath = "user";
export const storePath = "store";
export const productCategoryPath = "product-category";
export const brandPath = "brand";
export const countryPath = "country";
export const samplePath = "sample";
export const accountPath = "account";
export const orderPath = "order";
export const clientPath = "client";
export const tenantPath = "tenant";
export const planPath = "plan";

export const excludeRoutes = [
  { path: "/", method: RequestMethod.GET },
  { path: "/login", method: RequestMethod.POST },
  { path: "/logout", method: RequestMethod.POST },
  { path: "/refresh-token", method: RequestMethod.POST },

  { path: userPath + "/register", method: RequestMethod.POST },
  { path: userPath + "/send-recovery-password", method: RequestMethod.POST },
  { path: userPath + "/recover-password", method: RequestMethod.POST },

  // TODO: just for testing... remove it later.
  { path: samplePath, method: RequestMethod.POST },
  { path: samplePath, method: RequestMethod.GET },
  { path: samplePath + "/:id", method: RequestMethod.DELETE },
  { path: samplePath, method: RequestMethod.PATCH },
];
