import Joi from "joi";

export const envVarsSchema = Joi.object({
  APP_PORT: Joi.number().default(3000),
  ENVIROMENT: Joi.string().valid("local", "dev", "staging"),

  /** JWT Config */
  JWT_ACCESS_EXPIRE: Joi.string().required(),
  JWT_ACCESS_EXPIRE_TIMESTAMP: Joi.number().required(),
  JWT_REFRESH_EXPIRE: Joi.string().required(),
  JWT_REFRESH_EXPIRE_TIMESTAMP: Joi.number().required(),
  JWT_RECOVERY_EXPIRE: Joi.string().required(),
  JWT_RECOVERY_EXPIRE_TIMESTAMP: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),

  // DB settings
  // DB_HOST: Joi.string(),
  // DB_USERNAME: Joi.string().required(),
  // DB_PASSWORD: Joi.string().required(),
  // DB_PORT: Joi.number(),
  // DB_NAME: Joi.string().required(),

  // REPOSITORY TYPES
  USER_REPO: Joi.string().valid("mock", "mongo").required(),
  STORE_REPO: Joi.string().valid("mock", "mongo").required(),
  PRODUCT_CATEGORY_REPO: Joi.string().valid("mock", "mongo").required(),
  BRAND_REPO: Joi.string().valid("mock", "mongo").required(),
  COUNTRY_REPO: Joi.string().valid("mock", "mongo").required(),
  SAMPLE_REPO: Joi.string().valid("mock", "mongo").required(),
  ACCOUNT_REPO: Joi.string().valid("mock", "mongo").required(),
  CLIENT_REPO: Joi.string().valid("mock", "mongo").required(),
  TENANT_REPO: Joi.string().valid("mock", "mongo").required(),
  PLAN_REPO: Joi.string().valid("mock", "mongo").required(),
  RESOURCE_REPO: Joi.string().valid("mock", "mongo").required(),
  PERMISSION_REPO: Joi.string().valid("mock", "mongo").required(),

  DISABLED_LOGIN: Joi.string().required(),
  DISABLED_LOGIN_ATTEMPS_ALLOWED: Joi.number().required(),
  DISABLED_LOGIN_EXPIRE_TIMESTAMP: Joi.number().required(),
});

export const envVarValues = {
  APP_PORT: process.env.APP_PORT,
  ENVIROMENT: process.env.ENVIROMENT,

  JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE,
  JWT_ACCESS_EXPIRE_TIMESTAMP: parseInt(
    process.env.JWT_ACCESS_EXPIRE_TIMESTAMP,
  ),
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
  JWT_REFRESH_EXPIRE_TIMESTAMP: parseInt(
    process.env.JWT_REFRESH_EXPIRE_TIMESTAMP,
  ),
  JWT_RECOVERY_EXPIRE: process.env.JWT_RECOVERY_EXPIRE,
  JWT_RECOVERY_EXPIRE_TIMESTAMP: parseInt(
    process.env.JWT_RECOVERY_EXPIRE_TIMESTAMP,
  ),
  JWT_SECRET: process.env.JWT_SECRET,

  USER_REPO: process.env.USER_REPO,
  STORE_REPO: process.env.STORE_REPO,
  PRODUCT_CATEGORY_REPO: process.env.PRODUCT_CATEGORY_REPO,
  BRAND_REPO: process.env.BRAND_REPO,
  COUNTRY_REPO: process.env.COUNTRY_REPO,
  SAMPLE_REPO: process.env.SAMPLE_REPO,
  ACCOUNT_REPO: process.env.ACCOUNT_REPO,
  CLIENT_REPO: process.env.CLIENT_REPO,
  TENANT_REPO: process.env.TENANT_REPO,
  PLAN_REPO: process.env.PLAN_REPO,
  RESOURCE_REPO: process.env.RESOURCE_REPO,
  PERMISSION_REPO: process.env.PERMISSION_REPO,

  DISABLED_LOGIN: process.env.DISABLED_LOGIN,
  DISABLED_LOGIN_ATTEMPS_ALLOWED: process.env.DISABLED_LOGIN_ATTEMPS_ALLOWED,
  DISABLED_LOGIN_EXPIRE_TIMESTAMP: process.env.DISABLED_LOGIN_EXPIRE_TIMESTAMP,
};
