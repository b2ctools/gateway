import casual from "casual";

import { UserRole } from "../../user/domain/user.interface";
import { AddResourceCommand } from "src/app/resource/application/add-resource/add-resource.command";

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

  
  const users = [
    //  elmer
    {
      firstName: "Elmer", //casual.name,
      lastName: "Entenza", //casual.last_name,
      email: `elmer@email.com`, //casual.email.toLowerCase(),
      password: "12345", //casual.password,
      role: UserRole.USER,
      ...commondData,
    },
    //  yoennis
    {
      firstName: "Yoennis", //casual.name,
      lastName: "Rodriguez", //casual.last_name,
      email: "yoennis@email.com", //casual.email.toLowerCase(),
      password: "12345", //casual.password,
      role: UserRole.ADMIN,
      ...commondData,
    },
    //  leonardo
    {
      firstName: "Leonardo", //casual.name,
      lastName: "McTesterson", //casual.last_name,
      email: "leo@email.com", //casual.email.toLowerCase(),
      password: "12345", //casual.password,
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
    }));
};

export const getMockedBrandList = () => {
  return Array(5)
    .fill(null)
    .map(() => ({
      name: "Brand " + casual.title,
      description: casual.description.slice(0, 50),
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

export const getMockedPlansList = () => {
  return [{ name: "Starter" }, { name: "Pro" }];
};

export const getMockedResourcesList = (): AddResourceCommand[] => {
  return [
    { name: "user", module: "user", permissions: [] },
    { name: "sample", module: "product", permissions: [] },
    { name: "product", module: "product", permissions: [] },
    { name: "order", module: "billing", permissions: [] },
    { name: "location", module: "delivery", permissions: [] },
  ];
};
