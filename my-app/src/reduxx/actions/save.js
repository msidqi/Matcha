export const saveLogin = (data = {}) => {
    if (Object.keys(data).length === 0)
        return {
            type: 'SAVE',
        };
    return {
        type:'SAVE',
        ...data,
    };
}

export const saveRegister = (data = {}) => {
    console.log(data);
    if (Object.keys(data).length === 0)
        return {
            type: 'SAVE',
        };
    return {
        type:'SAVE',
        ...data,
    };
}
