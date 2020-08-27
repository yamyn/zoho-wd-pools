const { hWithAuth, request, baseUrl } = require('../helpers/reqHelpers');

class PrivatespaceService {
    getPrivateFolder = ({ userId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/users/${userId}/privatespace`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    getPrivateFiles = ({ psId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/privatespace/${psId}/files`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };
}

module.exports = new PrivatespaceService();
