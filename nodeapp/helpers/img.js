const fs = require('fs');
const bufferFrom = require('buffer-from');
const fsPromises = fs.promises;

const storeImageBase64 = async (base64File, pathToSave) => {
    let pixels = new bufferFrom(base64File, 'base64');
    await fs.writeFile(pixels, pathToSave)
}


const loadImageBase64 = async (picPath) => {
    let pixels = await fs.readFile(picPath);
    return (new bufferFrom(pixels).toString('base64'));
}

const loadImageBufferPromise = async (picPath) => {
    return (fsPromises.readFile(picPath));
}

module.exports = {
    storeImageBase64:   storeImageBase64,
    loadImageBase64:    loadImageBase64,
    loadImageBufferPromise: loadImageBufferPromise,
}