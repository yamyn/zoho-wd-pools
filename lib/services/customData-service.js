const { hWithAuth, request, baseUrl } = require('../helpers/reqHelpers');

class CustomDataService {
    getDataTemplates = ({ teamId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/teams/${teamId}/datatemplates`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    createDataTemplate = ({ teamId, name, description, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    team_id: teamId,
                    name,
                    status: true,

                    description: description || '',
                },
                type: 'datatemplates',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/datatemplates`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    updateDataTemplate = ({ templateId, accessToken, domain, ...attributes }) => {
        const body = {
            data: {
                attributes,
                type: 'datatemplates',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/datatemplates/${templateId}`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    deleteDataTemplate = ({ templateId, accessToken, domain }) => {
        const fetchParams = {
            method: 'delete',
            url: `${baseUrl}${domain}/api/v1/datatemplates/${templateId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    getCustomFields = ({ templateId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/datatemplates/${templateId}/customfields`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    createCustomField = ({ templateId, name, index, type, properties, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    index,
                    type,
                    data_template_id: templateId,
                    display_name: name,
                    field_properties: properties,
                },
                type: 'customfields',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/customfields`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    updateCustomField = ({ fieldId, accessToken, domain, ...attributes }) => {
        const body = {
            data: {
                attributes,
                type: 'customfields',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/customfields${fieldId}`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    deleteCustomField = ({ fieldId, accessToken, domain }) => {
        const fetchParams = {
            method: 'delete',
            url: `${baseUrl}${domain}/api/v1/customfields${fieldId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    createCustomMetadata = ({ templateId, resourceId, customData, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    resource_id: resourceId,
                    data_template_id: templateId,
                    custom_data: customData,
                },
                type: 'custommetadata',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/custommetadata`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    updateCustomMetadata = ({ metadataId, accessToken, domain, customData }) => {
        const body = {
            data: {
                attributes: { custom_data: customData },
                type: 'custommetadata',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/custommetadata/${metadataId}`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    deleteCustomMetadata = ({ metadataId, accessToken, domain }) => {
        const fetchParams = {
            method: 'delete',
            url: `${baseUrl}${domain}/api/v1/custommetadata${metadataId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };
}

module.exports = new CustomDataService();
