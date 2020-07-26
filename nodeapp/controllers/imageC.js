const validator = require('../helpers/validator');
const { loadImageBase64, loadImageBufferPromise } = require('../helpers/img');
const { handleError } = require('../helpers/errorHandler');
const fs = require('fs');
const conf = require('../config/config');

const loadImage = async (req, res, next) => {
    try {
        // console.log('imageName: ', req.params.imageName);
        let imagePath = `${conf.imageFolderPath}${req.params.imageName}`;
        // console.log(imagePath);
        if (!fs.existsSync(imagePath))
            throw {msg: 'Image Not Found.', code: 500};
        let readStream = fs.createReadStream(imagePath);
        readStream.on('data', (chunk) => {
            // console.log('read a chunk.');
        });
        readStream.on('end', (chunk) => {
            // console.log('stream ended.');
        });
        readStream.pipe(res);
    }
    catch (err) {
		// console.log(err);
		next(handleError(err.code, err.msg));
    }
}

module.exports = {
    load: loadImage,
}