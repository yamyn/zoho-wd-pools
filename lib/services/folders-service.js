const { hWithAuth, request, baseUrl } = require('../helpers/reqHelpers');

class FoldersService {
    createFolder = ({ parentId, name, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    name,
                    parent_id: parentId,
                },
                type: 'files',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/files`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    async copyFolder({ folderId, parentId, accessToken, domain }) {
        const body = {
            data: {
                attributes: {
                    resource_id: folderId,
                },
                type: 'files',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/files/${parentId}/copy`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    }

    async deleteFolder({ folderId, accessToken, domain }) {
        const fetchParams = {
            method: 'delete',
            url: `${baseUrl}${domain}/api/v1/files/${folderId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    }
}

module.exports = new FoldersService();
