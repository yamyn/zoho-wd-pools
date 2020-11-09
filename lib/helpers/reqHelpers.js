const axios = require('axios');
const { get } = require('lodash');

const hWithAuth = accessToken => ({ Authorization: `Bearer ${accessToken}` });
const request = async params => {
    const res = await axios(params);
    
    return get(res, 'data.data');
};

const baseUrl = 'https://workdrive.zoho.';

const parseListQuery = (offset, limit) => {
    if(!offset && !limit) return '';
    const limitQuery = limit ? `page%5Blimit%5D=${limit}` : '';
    let offsetQuery = '';
    if(offset) {
        offsetQuery += `page%5Boffset%5D=${offset}&`;
        if(!limitQuery) {
            offsetQuery += 'page%5Blimit%5D=50'
        }
    }

    return `?${offsetQuery}${limitQuery}`
}

module.exports = { hWithAuth, request, baseUrl, parseListQuery };
