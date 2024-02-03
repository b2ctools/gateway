// import casual from 'casual';

export const getMockedUserList = () => {
    return Array(1).fill(null).map(() => ({
        name: 'Elmer Entenza', //casual.name,
        email: 'elmer@email.com', //casual.email.toLowerCase(),
        password: '12345', //casual.password,
        tenantId: 1,
    }))
}

