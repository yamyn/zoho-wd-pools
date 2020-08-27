const { hWithAuth, request, baseUrl } = require('../helpers/reqHelpers');

class TeamService {
    getUsersTeams = ({ accessToken, domain, zuid }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/users/${zuid}/teams`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    getTeamInfo = ({ teamId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/teams/${teamId}`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };

    getCurrentUser = ({ teamId, accessToken, domain }) => {
        const fetchParams = {
            method: 'get',
            url: `${baseUrl}${domain}/api/v1/teams/${teamId}/currentuser`,
            headers: hWithAuth(accessToken),
        };

        return request(fetchParams);
    };
}

module.exports = new TeamService();
