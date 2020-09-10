const { get } = require('lodash');
const NodeCache = require('node-cache');

const WorkdriveService = require('./services/index');

let instance = null;
const baseConfig = {
    stdTTLToken: 3000,
    stdTTLCreds: 43200,
    checkperiod: 1200,
    metaMark: {
        bwn: '||',
        end: '()',
    },
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
    /**
     *
     * @param {object} options WorkdriveController configuration options
     * @param {number}  options.stdTTLToken   - 3000 (s).
     * @param {number}  options.stdTTLCreds   - 43200 (s).
     * @param {number}  options.checkperiod   - 1200 (s).
     * @returns {WorkdriveController} instance of OneDrivePool
     * @memberof WorkdriveController
     */
    constructor(options) {
        if (instance) {
            return instance;
        }
        this[config] = { ...baseConfig, ...options };
        this[credsCache] = new NodeCache({
            stdTTL: this[config].stdTTLCreds,
            checkperiod: this[config].checkperiod,
        });

        instance = this;
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

    getDomain = pool => {
        const { domain } = this[credsCache].get(this[parseKey](pool).creds());

        return domain
    }

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

    parseMetaStr = (name, fileId, shareId, createdAt) =>
        `${name}${this[config].metaMark.bwn}${fileId}${this[config].metaMark.bwn}${shareId}${this[config].metaMark.bwn}${createdAt}${this[config].metaMark.end}`;

    parseDownloadUri = (str, domain) => {
        const arr = str.split(this[config].metaMark.end);
        arr.pop();
        const urls = arr.map(str => {
            const [name, id, linkId, createdAt] = str.split(this[config].metaMark.bwn);

            return {
                id,
                name,
                createdAt,
                downloadUrl: this.parseDownloadUrlById(id, linkId, domain),
            };
        });

        return urls;
    };

    parseDomainLinkCom = {
        com: (fileId, downLinkId) => `https://files.zohoexternal.com/public/workdrive-external/download/${fileId}?x-cli-msg=%7B%22linkId%22%3A%22${downLinkId}%22%7D`,
        eu: (fileId, downLinkId) => `https://download.zohopublic.eu/public/workdrive-public/download/${fileId}?x-cli-msg=%7B%22linkId%22%3A%22${downLinkId}%22%7D`,
        in: (fileId, downLinkId) => `https://files.zohopublic.in/public/workdrive-public/download/${fileId}?x-cli-msg=%7B%22linkId%22%3A%22${downLinkId}%22%7D`,
        'com.au': (fileId, downLinkId) => `https://files.zohopublic.com.au/public/workdrive-public/download/${fileId}?x-cli-msg=%7B%22linkId%22%3A%22${downLinkId}%22%7D`
    }

    parseDownloadUrlById = (fileId, downLinkId, domain) => this.parseDomainLinkCom[domain](fileId, downLinkId);

    [isExpiredToken] = error => get(error, 'response.data.errors[0].title') === 'Invalid OAuth token.';

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
        meta: async (pool, params) => {
            return this[withToken](WorkdriveService.filesService.getFileCustomMeta, pool, params);
        },
    };

    share = {
        list: async (pool, params) => {
            return this[withToken](WorkdriveService.extSharingService.getSharedLinks, pool, params);
        },
        create: async (pool, params) => {
            return this[withToken](WorkdriveService.extSharingService.createShareLink, pool, params);
        },
        createDownLoad: async (pool, params) => {
            return this[withToken](WorkdriveService.extSharingService.createDownloadLink, pool, params);
        },
        update: async (pool, params) => {
            return this[withToken](WorkdriveService.extSharingService.updateShareLink, pool, params);
        },
        delete: async (pool, params) => {
            return this[withToken](WorkdriveService.extSharingService.deleteShareLink, pool, params);
        },
    };

    customMeta = {
        dataTemp: {
            list: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.getDataTemplates, pool, params);
            },
            create: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.createDataTemplate, pool, params);
            },
            update: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.updateDataTemplate, pool, params);
            },
            delete: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.deleteDataTemplate, pool, params);
            },
        },
        fields: {
            list: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.getCustomFields, pool, params);
            },
            create: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.createCustomField, pool, params);
            },
            update: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.updateCustomField, pool, params);
            },
            delete: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.deleteCustomField, pool, params);
            },
        },
        meta: {
            create: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.createCustomMetadata, pool, params);
            },
            update: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.updateCustomMetadata, pool, params);
            },
            delete: async (pool, params) => {
                return this[withToken](WorkdriveService.customDataService.deleteCustomMetadata, pool, params);
            },
        },
    };

    url = (pool, params) => {
        return this[withToken](WorkdriveService.commonService.getByLink, pool, params);
    };
}

module.exports = WorkdriveController;
