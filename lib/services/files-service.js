const FormData = require('form-data');
const axios = require('axios');

const { hWithAuth, request, baseUrl, parseListQuery } = require('../helpers/reqHelpers');
const zFileTypes = require('../shared/zohoFiles.enum');

class FilesService {
    IdArrCopyMapper = idArr =>
        idArr.map(id => ({
            attributes: {
                resource_id: id,
            },
            type: 'files',
        }));
    IdArrMoveMapper = idArr =>
        idArr.map(({ id, parentId }) => ({
            attributes: {
                parent_id: parentId,
            },
            id,
            type: 'files',
        }));
    IdArrDeleteMapper = idArr =>
        idArr.map(id => ({
            attributes: {
                status: '61',
            },
            id,
            type: 'files',
        }));

    createFile = ({ parentId, name, zFileType, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    name,
                    service_type: zFileTypes[zFileType],
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

    uploadFile = ({ parentId, name, overrideNameExist, readableStream, contentType, accessToken, domain, maxContentLength, maxBodyLength }) => {
        const fd = new FormData();
        const fileOpt = contentType ? { contentType } : null;

        fd.append('content', readableStream, fileOpt);

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/upload?filename=${name}&parent_id=${parentId}&override-name-exist=${overrideNameExist}`,
            headers: { ...hWithAuth(accessToken), ...fd.getHeaders() },
            data: fd,
            maxContentLength: maxContentLength || 'Infinity',
            maxBodyLength: maxBodyLength || 'Infinity',
        };

        return request(fetchParams);
    };

    downloadFile = async ({ fileId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/download/${fileId}`,
            headers: hWithAuth(accessToken),
        };
        const { data } = await axios(fetchParams);

        return data;
    };

    renameFile = ({ fileId, name, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    name,
                },
                type: 'files',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/files/${fileId}`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    copyFiles = ({ idArr, parentId, accessToken, domain }) => {
        const body = {
            data: this.IdArrCopyMapper(idArr),
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/files/${parentId}/copy`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    moveFiles = ({ idArr, accessToken, domain }) => {
        const body = {
            data: this.IdArrMoveMapper(idArr),
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/files`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    deleteFiles = ({ idArr, accessToken, domain }) => {
        const body = {
            data: this.IdArrDeleteMapper(idArr),
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/files`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    getList = ({ folderId, accessToken, domain, offset, limit }) => {
        const query = parseListQuery(offset, limit);
    
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/files/${folderId}/files${query}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    getOneFileInfo = ({ fileId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/files/${fileId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    getFileCustomMeta = ({ fileId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/files/${fileId}/custommetadata`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };
}

module.exports = new FilesService();
