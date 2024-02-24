import casual from "casual";

import { UserRole } from "../../user/domain/user.interface";
import { ctxSrv } from "../context.service";

export const getMockedUserList = () => {
  const commondData = {
    nickname: "",
    phone: "",
    avatar: "",
    birthDay: new Date(),
    address: casual.address1,
    city: casual.city,
    state: casual.state_abbr,
    zip: casual.zip(8),
    countryId: null,
  };

  //  elmer
  const users = [
    {
      firstName: "Elmer", //casual.name,
      lastName: "Entenza", //casual.last_name,
      email: `elmer@email.com`, //casual.email.toLowerCase(),
      password: "12345", //casual.password,
      tenantId: ctxSrv.getTenantId(),
      role: UserRole.USER,
      ...commondData,
    },
    {
      firstName: "Yoennis", //casual.name,
      lastName: "Rodriguez", //casual.last_name,
      email: "yoennis@email.com", //casual.email.toLowerCase(),
      password: "12345", //casual.password,
      tenantId: ctxSrv.getTenantId(),
      role: UserRole.ADMIN,
      ...commondData,
    },
    {
      firstName: "Leonargo", //casual.name,
      lastName: "McTesterson", //casual.last_name,
      email: "leo@email.com", //casual.email.toLowerCase(),
      password: "12345", //casual.password,
      tenantId: ctxSrv.getTenantId(),
      role: UserRole.OWNER,
      ...commondData,
    },
  ];

  // random users
  Array(2)
    .fill(null)
    .map(() => {
      users.push({
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email.toLowerCase(),
        password: "12345",
        role: UserRole.USER,
        tenantId: ctxSrv.getTenantId(),
        ...commondData,
      });
    });

  // random clients
  Array(2)
    .fill(null)
    .map(() => {
      users.push({
        firstName: casual.name,
        lastName: casual.last_name,
        email: casual.email.toLowerCase(),
        password: "12345",
        role: UserRole.CLIENT,
        tenantId: ctxSrv.getTenantId(),
        ...commondData,
      });
    });

  return users;
};

export const getMockedStoreList = () => {
  return Array(3)
    .fill(null)
    .map(() => ({
      name: "Store " + casual.title,
      description: casual.description.slice(0, 50),
      tenantId: ctxSrv.getTenantId(),
    }));
};

export const getMockedBrandList = () => {
  return Array(5)
    .fill(null)
    .map(() => ({
      name: "Brand " + casual.title,
      description: casual.description.slice(0, 50),
      tenantId: ctxSrv.getTenantId(),
    }));
};

export const getMockedCountryList = () => {
  return Array(5)
    .fill(null)
    .map(() => ({
      name: casual.country,
      code: casual.country_code,
    }));
};

export const getMockedProductCategoryList = () => {
  return Array(3)
    .fill(null)
    .map(() => ({
      name: "Product Cateory" + casual.title.slice(0, 10),
      description: casual.description.slice(0, 50),
      parent: "0",
    }));
};
