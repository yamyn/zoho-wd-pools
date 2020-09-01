const teamService = require('./team-service');
const workspaceService = require('./workspace-service');
const privatespaceService = require('./privatespace-service');
const foldersService = require('./folders-service');
const filesService = require('./files-service');
const commonService = require('./common-service');
const customDataService = require('./customData-service');
const extSharingService = require('./externalSharingService');

module.exports = {
    teamService,
    workspaceService,
    privatespaceService,
    foldersService,
    filesService,
    commonService,
    customDataService,
    extSharingService,
};
