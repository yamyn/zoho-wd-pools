const axios = require('axios');
const { get } = require('lodash');

const hWithAuth = accessToken => ({ Authorization: `Bearer ${accessToken}` });
const request = async params => {
    const res = await axios(params);

    return get(res, 'data.data');
};

const baseUrl = 'https://workdrive.zoho.';

module.exports = { hWithAuth, request, baseUrl };
