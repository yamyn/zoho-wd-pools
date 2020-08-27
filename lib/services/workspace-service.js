const { hWithAuth, request, baseUrl } = require('../helpers/reqHelpers');

const roles = require('../shared/wsRoles.enum');

class WorkspaceService {
    getAllTeamFolders = ({ teamId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/teams/${teamId}/workspaces`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    getTeamFolderInfo = async ({ teamId, wsId, accessToken, domain }) => {
        const wsAll = await this.getAllTeamFolders({ teamId, accessToken, domain });

        return wsAll.find(ws => ws.id === wsId);
    };

    createTeamFolder = ({ teamId, name, isPublicTeam, description, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    name,
                    parent_id: teamId,
                    is_public_within_team: isPublicTeam,
                    description: description,
                },
                type: 'workspaces',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/workspaces`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    renameTeamFolder = ({ wsId, name, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    name,
                },
                id: wsId,
                type: 'workspaces',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/workspaces/${wsId}`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    deleteTeamFolder = ({ wsId, accessToken, domain }) => {
        const fetchParams = {
            method: 'delete',
            url: `${baseUrl}${domain}/api/v1/workspaces/${wsId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    getAllTeamFolderUsers = ({ wsId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/workspaces/${wsId}/permissions`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    addMemberToTeamFolder = ({ wsId, email, role, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    resource_id: wsId,
                    shared_type: 'workspace',
                    email_id: email,
                    role_id: roles.onServer[role],
                },
                type: 'permissions',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `${baseUrl}${domain}/api/v1/permissions`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    updateuserRoleinTeamFolder = ({ userId, role, accessToken, domain }) => {
        const body = {
            data: {
                attributes: {
                    role_id: roles.onServer[role],
                },
                id: userId,
                type: 'permissions',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `${baseUrl}${domain}/api/v1/permissions/${userId}`,
            headers: hWithAuth(accessToken),
            data: JSON.stringify(body),
        };

        return request(fetchParams);
    };

    deleteUserFromTeamFolder = ({ userId, accessToken, domain }) => {
        const fetchParams = {
            method: 'delete',
            url: `${baseUrl}${domain}/api/v1/permissions/${userId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };
}

module.exports = new WorkspaceService();
