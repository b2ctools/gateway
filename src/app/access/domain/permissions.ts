import { genId } from "../../shared/utils/gen-id";
import { ID } from "../../shared/abstract-repository/repository.interface";

const permissions = ["create", "read", "update", "delete"];

const getPermissions = (resourse: string) => {
  return permissions.map((permission) => {
    return {
      id: genId(),
      [permission]: `${permission}_${resourse}`,
    };
  });
};

const resourses = [
  "brand",
  "country",
  "product-category",
  "sample",
  "user",
  "store",
];

export const resourses_persmissions = () => {
  return resourses.map((resourse) => {
    return {
      resourse,
      permissions: getPermissions(resourse),
    };
  });
};

export const jsonPermissions = [
  {
    resourse: "brand",
    permissions: [
      {
        id: "d4c585a3e68224b45446dee023466998",
        name: "create_brand",
      },
      {
        id: "0b39677d091ffa02b4325218ef89ac1c",
        name: "read_brand",
      },
      {
        id: "83644947945364819185983469bea445",
        name: "update_brand",
      },
      {
        id: "c7699b631aa7d48273f3ad9a85afd64b",
        name: "delete_brand",
      },
    ],
  },
  {
    resourse: "country",
    permissions: [
      {
        id: "10d7f1795bebfd947eba352af4703edb",
        name: "create_country",
      },
      {
        id: "5923c6fd61df6f0857385c96891af4c1",
        name: "read_country",
      },
      {
        id: "c632bcaecf57bf88041f4962e07ab71e",
        name: "update_country",
      },
      {
        id: "ea073f910b5a8d4cdbee15ebec790bb3",
        name: "delete_country",
      },
    ],
  },
  {
    resourse: "product-category",
    permissions: [
      {
        id: "c54b9ce2dcf4db9582b131e716030226",
        name: "create_product-category",
      },
      {
        id: "6ecf0ffb9f5fbb44940707d9025e0832",
        name: "read_product-category",
      },
      {
        id: "8a4403c779e9bfd81550e4d28bdf6f21",
        name: "update_product-category",
      },
      {
        id: "b1e53317a192e413cafc601ac6780f30",
        name: "delete_product-category",
      },
    ],
  },
  {
    resourse: "sample",
    permissions: [
      {
        id: "76a7acdd9b81c042c96755f892f5e879",
        name: "create_sample",
      },
      {
        id: "a08a7b86c1db8fd27dbdbfb1c36ab0ce",
        name: "read_sample",
      },
      {
        id: "54d668828f9c9ce1f6c2130bf9c62fc0",
        name: "update_sample",
      },
      {
        id: "3ff607e6469fa3a9b06c713787ca466f",
        name: "delete_sample",
      },
    ],
  },
  {
    resourse: "user",
    permissions: [
      {
        id: "de4e2bd9eb2d26246eaa88ba34479c1e",
        name: "create_user",
      },
      {
        id: "dcccba85d5f5163e4a7fcdf3761d398f",
        name: "read_user",
      },
      {
        id: "0bc5b7f0a2496986e26b7ba432545687",
        name: "update_user",
      },
      {
        id: "c4a2b6c9addf5fbe8abcc748874a2e67",
        name: "delete_user",
      },
    ],
  },
  {
    resourse: "store",
    permissions: [
      {
        id: "b37eca289940f4fb61da0299fac75e0d",
        name: "create_store",
      },
      {
        id: "d88cef2bddeabec7bf9ce265c797d2cd",
        name: "read_store",
      },
      {
        id: "546a2dc466b6743226cdea730710121b",
        name: "update_store",
      },
      {
        id: "f6bde489a41bcce479498c116bd38c4a",
        name: "delete_store",
      },
    ],
  },
];

export const isValidPermission = (permission: ID) => {
  const permissionList = () => {
    const result: ID[] = jsonPermissions.flatMap((resourse) => {
      return resourse.permissions.map((permission) => permission.id);
    });
    return result;
  };

  return permissionList().includes(permission);
};

export const getPermissionsIdList = () => {
  return jsonPermissions.flatMap((resourse) => {
    return resourse.permissions.map((permission) => permission.id);
  });
};

export const getPermissionNamesListFromIds = (ids: ID[]): string[] => {
  return jsonPermissions.flatMap((resourse) => {
    return resourse.permissions
      .map((permission) => {
        if (ids.includes(permission.id)) {
          return permission;
        }
      })
      .filter((permission) => permission)
      .map((permission) => permission.name.toUpperCase());
  });
};
