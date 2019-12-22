const tagsM = require('../models/tagsM');
const conf = require('../config/config');
const validator = require('../helpers/validator');


const likeTags = (req, res) => {
    let tags = req.body.tags;
    let err;
    
    try {
        if ((err = validator.tags(tags)))
            throw err;
    }
    catch (err) {
        console.log(err);
    }
}

const unlikeTags = () => {

}

const getTagsLike = () => {

}

module.exports = {
    likeTags:     likeTags,
    unlikeTags:   unlikeTags,
    getTagsLike:  getTagsLike,
}