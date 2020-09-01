const axios = require('axios');
const { hWithAuth, request } = require('../helpers/reqHelpers');
const shareRoles = require('../shared/zohoShareRole.enum');

class ExtSharingService {
    getSharedLinks = ({ fileId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/files/${fileId}/links`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    createShareLink = ({
        resourceId,
        name,
        inputFields,
        requestUserData,
        allowDownload,
        password,
        expiredDate,
        role,
        accessToken,
        domain,
    }) => {
        const body = {
            data: {
                attributes: {
                    resource_id: resourceId,
                    link_name: name,
                    input_fields: inputFields,
                    request_user_data: requestUserData,
                    allow_download: allowDownload,
                    password_text: password,
                    expiration_date: expiredDate,
                    role_id: shareRoles[role],
                },
                type: 'links',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/links`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };
    createDownloadLink = ({ resourceId, name, requestUserData, expiredDate, downloadLimit, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    resource_id: resourceId,
                    link_name: name,
                    request_user_data: requestUserData,
                    expiration_date: expiredDate,
                    download_link: {
                        download_limit: downloadLimit,
                    },
                    link_type: 'download',
                    allow_download: true,
                },
                type: 'links',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/links`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    updateShareLink = ({ linkId, accessToken, domain, ...attributes }) => {
        const body = {
            data: {
                attributes,
                id: linkId,
                type: 'links',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/links/${linkId}`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    deleteShareLink = ({ linkId, accessToken, domain }) => {
        const fetchParams = {
            method: 'delete',
            url: `${baseUrl}${domain}/api/v1/links/${linkId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };
}

module.exports = new ExtSharingService();
