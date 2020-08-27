const get = require('lodash.get');
const NodeCache = require('node-cache');

const WorkdriveService = require('./services/index');

let instance = null;
const baseConfig = {
    stdTTLToken: 3000,
    stdTTLCreds: 43200,
    checkperiod: 1200,
};
const getAccessToken = Symbol('getAccessToken');
const config = Symbol('config');
const withToken = Symbol('withToken');
const credsCache = Symbol('credsCache');
const parseKey = Symbol('parseKey');
const addToken = Symbol('addToken');
const checkToken = Symbol('checkToken');
const isExpiredToken = Symbol('isExpiredToken');

class WorkdriveController {
    constructor(options) {
        this[config] = { ...baseConfig, ...options };
        this[credsCache] = new NodeCache({
            stdTTL: this[config].stdTTLCreds,
            checkperiod: this[config].checkperiod,
        });
    }
    /**
     *
     * @static
     * @param {object} options WorkdriveController configuration options
     * @param {number}  options.stdTTLToken   - 3000 (s).
     * @param {number}  options.stdTTLCreds   - 43200 (s).
     * @param {number}  options.checkperiod   - 1200 (s).
     * @returns {WorkdriveController} instance of OneDrivePool
     * @memberof WorkdriveController
     */
    static getInstance(options) {
        instance = instance || new WorkdriveController(options);

        return instance;
    }
    async [getAccessToken](pool, creds) {
        const { data } = await WorkdriveService.commonService.getAccessToken(creds);
        const saveData = { accessToken: data.access_token, domain: creds.domain };

        this[credsCache].set(this[parseKey](pool).token(), saveData, this[config].stdTTLToken);

        return saveData;
    }

    [parseKey] = pool => {
        return {
            creds: () => `creds-${pool}`,
            token: () => `token-${pool}`,
            setData: key => `${key}-${pool}`,
        };
    };
    /**
     * @param {string} pool name of the pool you would like, of use
     * @returns {boolean} returns boolen
     * @memberof WorkdriveController
     */
    checkCreds = pool => {
        return this[credsCache].has(this[parseKey](pool).creds());
    };
    /**
     * @param {string} pool name of the pool you would like, of use
     * @param {object} creds One Drive account credentials
     * @param {string}  creds.client_id
     * @param {string}  creds.client_secret
     * @param {string}  creds.redirect_uri
     * @param {string}  creds.refresh_token
     * @returns {boolean} boolean
     * @memberof WorkdriveController
     */
    addConection = async (pool, creds) => {
        this[credsCache].set(this[parseKey](pool).creds(), creds);
        await this[getAccessToken](pool, creds);

        return true;
    };

    [isExpiredToken] = error => get(error, 'error.error.code') === 'InvalidAuthenticationToken';

    [addToken] = async pool => {
        const creds = this[credsCache].get(this[parseKey](pool).creds());

        if (!creds) throw new Error('Not found creds for your pool, please make `addConection` method and try again');

        return this[getAccessToken](pool, creds);
    };

    [checkToken] = async pool => {
        let accessData = this[credsCache].get(this[parseKey](pool).token());

        if (!accessData) {
            accessData = await this[addToken](pool);
        }

        return accessData;
    };
    /**
     * @param {object} params
     * @param {string}  params.pool - name of the pool you would like, of use
     * @param {string}  params.key - key for saving your data
     * @param {any}  params.data - data for save
     * @param {number}  params.ttl - ttl for your saving data
     * @returns {void} void
     * @memberof WorkdriveController
     */
    setToCashe = ({ pool, key, data, ttl }) => {
        return this[credsCache].set(this[parseKey](pool).setData(key), data, ttl);
    };

    /**
     * @param {object} params
     * @param {string}  params.pool - name of the pool you would like, of use
     * @param {string}  params.key - key for take your saved data
     * @memberof WorkdriveController
     */
    getFromCashe = ({ pool, key }) => {
        return this[credsCache].get(this[parseKey](pool).setData(key));
    };

    [withToken] = async (cb, pool, params) => {
        try {
            const { accessToken, domain } = await this[checkToken](pool);

            return await cb({ accessToken, domain, ...params });
        } catch (error) {
            if (!this[isExpiredToken](error)) throw error;
            const { accessToken, domain } = await this[addToken](pool);

            return await cb({ accessToken, domain, ...params });
        }
    };

    team = {
        all: async (pool, params) => {
            return this[withToken](WorkdriveService.teamService.getUsersTeams, pool, params);
        },
        info: async (pool, params) => {
            return this[withToken](WorkdriveService.teamService.getTeamInfo, pool, params);
        },
        currentUser: async (pool, params) => {
            return this[withToken](WorkdriveService.teamService.getCurrentUser, pool, params);
        },
    };

    ws = {
        all: async (pool, params) => {
            return this[withToken](WorkdriveService.workspaceService.getAllTeamFolders, pool, params);
        },
        info: async (pool, params) => {
            return this[withToken](WorkdriveService.workspaceService.getTeamFolderInfo, pool, params);
        },
        create: async (pool, params) => {
            return this[withToken](WorkdriveService.workspaceService.createTeamFolder, pool, params);
        },
        rename: async (pool, params) => {
            return this[withToken](WorkdriveService.workspaceService.renameTeamFolder, pool, params);
        },
        delete: async (pool, params) => {
            return this[withToken](WorkdriveService.workspaceService.deleteTeamFolder, pool, params);
        },

        users: {
            all: async (pool, params) => {
                return this[withToken](WorkdriveService.workspaceService.getAllTeamFolderUsers, pool, params);
            },
            add: async (pool, params) => {
                return this[withToken](WorkdriveService.workspaceService.addMemberToTeamFolder, pool, params);
            },
            newRole: async (pool, params) => {
                return this[withToken](WorkdriveService.workspaceService.updateuserRoleinTeamFolder, pool, params);
            },
            delete: async (pool, params) => {
                return this[withToken](WorkdriveService.workspaceService.deleteUserFromTeamFolder, pool, params);
            },
        },
    };

    ps = {
        info: async (pool, params) => {
            return this[withToken](WorkdriveService.privatespaceService.getPrivateFolder, pool, params);
        },
        files: async (pool, params) => {
            return this[withToken](WorkdriveService.privatespaceService.getPrivateFiles, pool, params);
        },
    };

    folder = {
        info: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.getOneFileInfo, pool, params);
        },
        create: async (pool, params) => {
            return this[withToken](WorkdriveService.foldersService.createFolder, pool, params);
        },
        rename: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.renameFile, pool, params);
        },
        copy: async (pool, params) => {
            return this[withToken](WorkdriveService.foldersService.copyFolder, pool, params);
        },
        delete: async (pool, params) => {
            return this[withToken](WorkdriveService.foldersService.deleteFolder, pool, params);
        },
    };

    files = {
        create: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.createFile, pool, params);
        },
        upload: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.uploadFile, pool, params);
        },
        download: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.downloadFile, pool, params);
        },
        rename: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.renameFile, pool, params);
        },
        copy: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.copyFiles, pool, params);
        },
        move: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.moveFiles, pool, params);
        },
        delete: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.deleteFiles, pool, params);
        },
        list: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.getList, pool, params);
        },
        info: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.getOneFileInfo, pool, params);
        },
    };

    url = (pool, params) => {
        return this[withToken](WorkdriveService.commonService.getByLink, pool, params);
    };
}

module.exports = WorkdriveController;
