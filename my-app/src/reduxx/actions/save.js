export const saveLogin = (data = {}) => {
    if (Object.keys(data).length === 0)
        return {
            type: 'SAVELOGIN',
        };
    return {
        type:'SAVELOGIN',
        ...data,
    };
}

export const saveRegister = (data = {}) => {
    if (Object.keys(data).length === 0)
        return {
            type: 'SAVEREGISTER',
        };
    return {
        type:'SAVEREGISTER',
        ...data,
    };
}
