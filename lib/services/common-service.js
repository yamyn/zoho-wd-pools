const axios = require('axios');
const { hWithAuth, request } = require('../helpers/reqHelpers');

class CommonService {
    getByLink = ({ link, accessToken }) => {
        const fetchParams = {
            method: 'get',
            url: link,
            headers: hWithAuth(accessToken),
        };

        return axios(fetchParams);
    };

    getAccessToken({ domain, refreshToken, clientId, clientSecret }) {
        const fetchParams = {
            method: 'post',
            url: `https://accounts.zoho.${domain}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`,
        };

        return axios(fetchParams);
    }
}

module.exports = new CommonService();
