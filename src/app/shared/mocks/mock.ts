import casual from 'casual';

import { DEFAULT_TENANT } from "../context.service"

export const getMockedUserList = () => {
    const users = [{
        name: 'Elmer Entenza', //casual.name,
        email: 'elmer@email.com', //casual.email.toLowerCase(),
        password: '12345', //casual.password,
        tenantId: DEFAULT_TENANT,
    }]
    Array(25).fill(null).map(() => {
        users.push({
            name: casual.name,
            email: casual.email.toLowerCase(),
            password: casual.password,
            tenantId: DEFAULT_TENANT,
        })
    })

    return users;
}

export const getMockedStoreList = () => {
    return Array(25).fill(null).map(() => ({
        name: 'Store ' + casual.title,
        description: casual.description.slice(0, 50),
        tenantId: DEFAULT_TENANT,
    }))
}

export const getMockedBrandList = () => {
    return Array(25).fill(null).map(() => ({
        name: 'Brand ' + casual.title,
        description: casual.description.slice(0, 50),
        tenantId: DEFAULT_TENANT,
    }))
}

export const getMockedCountryList = () => {
    return Array(25).fill(null).map(() => ({
        name: casual.country,
        code: casual.country_code,
    }))
}

export const getMockedProductCategoryList = () => {
    return Array(3).fill(null).map(() => ({
        name: 'Product Cateory' + casual.title.slice(0, 10),
        description: casual.description.slice(0, 50),
        parent: '0',
    }))
}