# zoho-wd-pools

![onix](https://img.shields.io/badge/onix-systems-blue.svg)

ZohoWorkDrive module, which makes communication with ZohoWorkDrive API easier, based in 'zoho-workdrive-api' and have
auto set tokens mechanism

# Install

```sh
npm i zoho-wd-pools
```

# API

## Methods

-   [team](#team-1)

    -   [all](#teamall)
    -   [info](#teaminfo)
    -   [currentUser](#teamcurrentuser)

-   [ws](#workspase) (Workspace)

    -   [all](#wsall)
    -   [info](#wsinfo)
    -   [create](#wscreate)
    -   [rename](#wsrename)
    -   [delete](#wsdelete)

-   [users](#wsusers) (Users of workspace)

    -   [all](#wsusersall)
    -   [add](#wsusersadd)
    -   [newRole](#wsusersnewrole)
    -   [delete](#wsusersdelete)

-   [ps](#privatespace) (Privatespace)

    -   [all](#psinfo)
    -   [files](#psfiles)

-   [folder](#folder-1)

    -   [info](#folderinfo)
    -   [create](#foldercreate)
    -   [rename](#folderrename)
    -   [copy](#foldercopy)
    -   [delete](#folderdelete)

-   [files](#files-1)

    -   [info](#filesinfo)
    -   [create](#filescreate)
    -   [upload](#filesupload)
    -   [download](#filesdownload)
    -   [rename](#filesrename)
    -   [copy](#filescopy)
    -   [delete](#filesdelete)
    -   [move](#filesmove)
    -   [list](#fileslist)

-   [url](#url-1)

-   [share](#share-1)

    -   [list](#sharelist)
    -   [create](#sharecreate)
    -   [createDownLoad](#sharecreateDownLoad)
    -   [update](#shareupdate)
    -   [delete](#sharedelete)

-   [share](#share-1)

    -   [list](#sharelist)
    -   [create](#sharecreate)
    -   [createDownLoad](#sharecreateDownLoad)
    -   [update](#shareupdate)
    -   [delete](#sharedelete)

# Examples

## Require module

```javascript
const ZohoWorkDriveApi = require('zoho-wd-pools');
const ZWDApi = new ZohoWorkDriveApi(options);

ZWDApi.addConection('myPool', {
    clientId,
    clientSecret,
    refreshToken,
    domain,
}).then(res => {
    // console.log(res); //return true
});
```

| Param               | Type                | Description                             | Required |
| ------------------- | ------------------- | --------------------------------------- | -------- |
| pool                | <code>string</code> | name of the pool you would like, of use | true     |
| params              | <code>Object</code> |                                         |          |
| params.clientId     | <code>String</code> | Zoho app clientId                       | true     |
| params.clientSecret | <code>String</code> | Zoho app clientSecret                   | true     |
| params.refreshToken | <code>String</code> | Zoho app refreshToken                   | true     |
| params.domain       | <code>String</code> | Zoho api domain                         | true     |

<br>

## team

#### team.all

_Return all user`s teams info_

**Returns**: <code>Object[]</code> - User`s teams array of objects

| Param       | Type                | Description                             | Required |
| ----------- | ------------------- | --------------------------------------- | -------- |
| pool        | <code>string</code> | name of the pool you would like, of use | true     |
| params      | <code>Object</code> |                                         |          |
| params.zuid | <code>String</code> | Zoho user`s account id                  | true     |

<br>

```javascript
zWDApi.team
    .all('myPool', {
        zuid: 'Zoho user`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with info all user`s teams
    });
```

### team.info

_Return user`s team by id_

**Returns**: <code>Object</code> - User`s team object

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.teamId | <code>String</code> | Id of the desired team                  | true     |

<br>

```javascript
zWDApi.team
    .info('myPool', {
        teamId: 'Zoho team`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with team`s info
    });
```

### team.currentUser

_Return current user for team_

**Returns**: <code>Object</code> - current user object

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.teamId | <code>String</code> | Id of the desired team`s user           | true     |

```javascript
zWDApi.team
    .currentUser('myPool', {
        teamId: 'Zoho team`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with current user info
    });
```

## workspase

### ws.all

_Return current team`s workspases_

**Returns**: <code>Object[]</code> - current team`s workspases array of objects

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.teamId | <code>String</code> | Id of the desired team`s ws             | true     |

<br>

```javascript
zWDApi.ws
    .all('myPool', {
        teamId: 'Zoho team`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with current team`s workspases
    });
```

### ws.info

_Return current workspase by id_

**Returns**: <code>Object</code> - current workspase object

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.teamId | <code>String</code> | Id of the desired team`s ws             | true     |
| params.wsId   | <code>String</code> | Id of the desired ws                    | true     |

<br>

```javascript
zWDApi.ws
    .info('myPool', {
        teamId: 'Zoho team`s id',
        wsId: 'Zoho ws id',
    })
    .then(data => {
        // console.log(data)
        // returns data with current workspace
    });
```

### ws.create

_Create new workspace_

**Returns**: <code>Object</code> - new workspase object

| Param               | Type                 | Description                             | Required |
| ------------------- | -------------------- | --------------------------------------- | -------- |
| pool                | <code>string</code>  | name of the pool you would like, of use | true     |
| params              | <code>Object</code>  |                                         |          |
| params.teamId       | <code>String</code>  | Id of the desired team`s ws             | true     |
| params.name         | <code>String</code>  | Name your new workspace                 | true     |
| params.isPublicTeam | <code>Boolean</code> | Is public within team                   | false    |
| params.description  | <code>String</code>  | description for your new workspace      | false    |

<br>

```javascript
zWDApi.ws
    .create('myPool', {
        teamId: 'Zoho team`s id',
        name: 'myWs',
        isPublicTeam: 'true',
        description: 'new workspace for example',
    })
    .then(data => {
        // console.log(data)
        // returns data with new workspace
    });
```

### ws.rename

_Rename current workspace_

**Returns**: <code>Object</code> - object with workspase id and new name

| Param       | Type                | Description                             | Required |
| ----------- | ------------------- | --------------------------------------- | -------- |
| pool        | <code>string</code> | name of the pool you would like, of use | true     |
| params      | <code>Object</code> |                                         |          |
| params.wsId | <code>String</code> | Id of the desired ws                    | true     |
| params.name | <code>String</code> | New name your workspace                 | true     |

<br>

```javascript
zWDApi.ws
    .rename('myPool', {
        wsId: 'Zoho ws id',
        name: 'renamedWs',
    })
    .then(data => {
        // console.log(data)
        // returns data with ws id and new name
    });
```

### ws.delete

_Delete current workspace_

**Returns**: <code>Object</code> - object with message about delete workspace

| Param       | Type                | Description                             | Required |
| ----------- | ------------------- | --------------------------------------- | -------- |
| pool        | <code>string</code> | name of the pool you would like, of use | true     |
| params      | <code>Object</code> |                                         |          |
| params.wsId | <code>String</code> | Id of the desired ws                    | true     |

<br>

```javascript
zWDApi.ws
    .delete('myPool', {
        wsId: 'Zoho ws id',
    })
    .then(data => {
        // console.log(data)
        // returns undefined
    });
```

## ws.users

### ws.users.all

_Return current workspase`s users_

**Returns**: <code>Object[]</code> - current workspase`s users array of objects

| Param       | Type                | Description                             | Required |
| ----------- | ------------------- | --------------------------------------- | -------- |
| pool        | <code>string</code> | name of the pool you would like, of use | true     |
| params      | <code>Object</code> |                                         |          |
| params.wsId | <code>String</code> | Id of the desired ws                    | true     |

<br>

```javascript
zWDApi.ws.users
    .all('myPool', {
        wsId: 'Zoho ws id',
    })
    .then(data => {
        // console.log(data)
        // returns data with current workspase`s users
    });
```

### ws.users.add

_Add new user for current workspase_

**Returns**: <code>Object</code> - new workspase`s user object

| Param        | Type                | Description                                      | Required |
| ------------ | ------------------- | ------------------------------------------------ | -------- |
| pool         | <code>string</code> | name of the pool you would like, of use          | true     |
| params       | <code>Object</code> |                                                  |          |
| params.wsId  | <code>String</code> | Id of the desired ws                             | true     |
| params.email | <code>String</code> | New user email                                   | true     |
| params.role  | <code>String</code> | New user role (Admin, Organizer, Editor, Viewer) | true     |

<br>

```javascript
zWDApi.ws.users
    .add('myPool', {
        wsId: 'Zoho ws id',
        email: 'new.user@mail.com',
        role: 'Admin',
    })
    .then(data => {
        // console.log(data)
        // returns data with new workspase`s user
    });
```

### ws.users.newRole

_Change user`s role_

**Returns**: <code>Object</code> - object with user`s id and new role

| Param         | Type                | Description                                         | Required |
| ------------- | ------------------- | --------------------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use             | true     |
| params        | <code>Object</code> |                                                     |          |
| params.userId | <code>String</code> | Id of the desired user                              | true     |
| params.role   | <code>String</code> | New role of user (Admin, Organizer, Editor, Viewer) | true     |

<br>

```javascript
zWDApi.ws.users
    .newRole('myPool', {
        userId: 'Zoho ws user`s id',
        role: 'Organizer',
    })
    .then(data => {
        // console.log(data)
        // returns data with user`s id and new role
    });
```

### ws.users.delete

_Delete user_

**Returns**: <code>Object</code> - object with message about delete user

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.userId | <code>String</code> | Id of the desired user                  | true     |

<br>

```javascript
zWDApi.ws.users
    .delete('myPool', {
        userId: 'Zoho ws user`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with message about delete user
    });
```

## privatespace

### ps.info

_Return user`s privatespaces_

**Returns**: <code>Object[]</code> - current user`s privatespaces array of objects

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.userId | <code>String</code> | Id user that desired privatespace       | true     |

<br>

```javascript
zWDApi.ps
    .info('myPool', {
        userId: 'Zoho team`s current user`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with current user`s privatespaces
    });
```

### ps.files

_Return current privatespace`s files by id_

**Returns**: <code>Object[]</code> - current privatespace`s files array of objects

| Param       | Type                | Description                             | Required |
| ----------- | ------------------- | --------------------------------------- | -------- |
| pool        | <code>string</code> | name of the pool you would like, of use | true     |
| params      | <code>Object</code> |                                         |          |
| params.psId | <code>String</code> | Id of the desired privatespace          | true     |

<br>

```javascript
zWDApi.ps
    .files('myPool', {
        psId: 'Zoho ps id',
    })
    .then(data => {
        // console.log(data)
        // returns data with current privatespace`s files
    });
```

## folder

### folder.info

_Return info about any folder by id_

**Returns**: <code>Object</code> - current folder object

| Param           | Type                | Description                             | Required |
| --------------- | ------------------- | --------------------------------------- | -------- |
| pool            | <code>string</code> | name of the pool you would like, of use | true     |
| params          | <code>Object</code> |                                         |          |
| params.folderId | <code>String</code> | Id of the desired folder                | true     |

<br>

```javascript
zWDApi.folder
    .info('myPool', {
        folderId: 'Zoho folder`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with current folder
    });
```

### folder.create

_Return info about new folder_

**Returns**: <code>Object</code> - new folder object

| Param           | Type                | Description                             | Required |
| --------------- | ------------------- | --------------------------------------- | -------- |
| pool            | <code>string</code> | name of the pool you would like, of use | true     |
| params          | <code>Object</code> |                                         |          |
| params.parentId | <code>String</code> | Id of parent folder for new             | true     |
| params.name     | <code>String</code> | Name of new folder                      | true     |

<br>

```javascript
zWDApi.folder
    .create('myPool', {
        parentId: 'Zoho folder`s id',
        name: 'myNewFolder',
    })
    .then(data => {
        // console.log(data)
        // returns data with new folder
    });
```

### folder.rename

_Rename current folder by id_

**Returns**: <code>Object</code> - object with folder`s id and new name

| Param           | Type                | Description                             | Required |
| --------------- | ------------------- | --------------------------------------- | -------- |
| pool            | <code>string</code> | name of the pool you would like, of use | true     |
| params          | <code>Object</code> |                                         |          |
| params.folderId | <code>String</code> | Id of the desired folder                | true     |
| params.name     | <code>String</code> | New name your folder                    | true     |

<br>

```javascript
zWDApi.folder
    .rename('myPool', {
        folderId: 'Zoho folder`s id',
        name: 'renamedFolder',
    })
    .then(data => {
        // console.log(data)
        // returns data with folder
    });
```

### folder.copy

_Copy current folder by id to folder with current id_

**Returns**: <code>Object</code> - сopied folder object

| Param           | Type                | Description                                        | Required |
| --------------- | ------------------- | -------------------------------------------------- | -------- |
| pool            | <code>string</code> | name of the pool you would like, of use            | true     |
| params          | <code>Object</code> |                                                    |          |
| params.folderId | <code>String</code> | Id of the desired folder                           | true     |
| params.parentId | <code>String</code> | Id of the folder where will be copy current folder | true     |

<br>

```javascript
zWDApi.folder
    .copy('myPool', {
        folderId: 'Zoho folder`s id',
        parentId: 'Zoho folder`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with сopied folder
    });
```

### folder.delete

_Delete folder_

**Returns**: <code>Object</code> - object with message about delete folder

| Param           | Type                | Description                             | Required |
| --------------- | ------------------- | --------------------------------------- | -------- |
| pool            | <code>string</code> | name of the pool you would like, of use | true     |
| params          | <code>Object</code> |                                         |          |
| params.folderId | <code>String</code> | Id of the desired folder                | true     |

<br>

```javascript
zWDApi.folder
    .delete('myPool', {
        folderId: 'Zoho folder`s id',
    })
    .then(data => {
        // console.log(data)
        // returns undefined
    });
```

## files

### files.info

_Return info about any file by id_

**Returns**: <code>Object</code> - current file object

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.fileId | <code>String</code> | Id of the desired file                  | true     |

<br>

```javascript
zWDApi.files
    .info('myPool', {
        fileId: 'Zoho file`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with current file
    });
```

### files.create

_Create file_

**Returns**: <code>Object</code> - new file object

| Param            | Type                | Description                                                                                   | Required |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------- | -------- |
| pool             | <code>string</code> | name of the pool you would like, of use                                                       | true     |
| params           | <code>Object</code> |                                                                                               |          |
| params.parentId  | <code>String</code> | Id of the folder where will be file                                                           | true     |
| params.name      | <code>String</code> | Name of your new file                                                                         | true     |
| params.zFileType | <code>String</code> | Type of your new file (zw - writer native, zohosheet - sheet native, zohoshow - show native ) | true     |

<br>

```javascript
zWDApi.files
    .create('myPool', {
        parentId: 'Zoho folder`s id',
        name: 'my_table',
        zFileType: 'zohosheet',
    })
    .then(data => {
        // console.log(data)
        // returns data with new file
    });
```

### files.upload

_Upload file_

**Returns**: <code>Object</code> - current file object

| Param                    | Type                 | Description                             | Required |
| ------------------------ | -------------------- | --------------------------------------- | -------- |
| pool                     | <code>string</code>  | name of the pool you would like, of use | true     |
| params                   | <code>Object</code>  |                                         |          |
| params.parentId          | <code>String</code>  | Id of the folder where will be file     | true     |
| params.name              | <code>String</code>  | Name of your new file                   | true     |
| params.overrideNameExist | <code>Boolean</code> | Override if same file exist in a folder | true     |
| params.readableStream    | <code>file</code>    | Readable Stream with file's content     | true     |

<br>

```javascript
zWDApi.files
    .upload('myPool', {
        parentId: 'Zoho folder`s id',
        name: 'myImg',
        overrideNameExist: 'true',
        readableStream: readableStream,
    })
    .then(data => {
        // console.log(data)
        // returns data with current file
    });
```

### files.download

_Download file by id_

**Returns**: <code>String</code> - String, that simple transform to buffer

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.fileId | <code>String</code> | Id of the desired file                  | true     |

<br>

```javascript
zWDApi.files
    .download('myPool', {
        fileId: 'Zoho file`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with file in string format
    });
```

### files.rename

_Rename current file by id_

**Returns**: <code>Object</code> - object with file`s id and new name

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.fileId | <code>String</code> | Id of the desired file                  | true     |
| params.name   | <code>String</code> | New name your file                      | true     |

<br>

```javascript
zWDApi.files
    .rename('myPool', {
        fileId: 'Zoho file`s id',
        name: 'renamedFolder',
    })
    .then(data => {
        // console.log(data)
        // returns data with files`s id and new name
    });
```

### files.copy

_Copy current files by id (more files) to folder with current id_

**Returns**: <code>Object[]</code> - сopied files array of object

| Param           | Type                  | Description                                       | Required |
| --------------- | --------------------- | ------------------------------------------------- | -------- |
| pool            | <code>string</code>   | name of the pool you would like, of use           | true     |
| params          | <code>Object</code>   |                                                   |          |
| params.idArr    | <code>String[]</code> | Array with file`s id                              | true     |
| params.parentId | <code>String</code>   | Id of the folder where will be copy current files | true     |

<br>

```javascript
zWDApi.files
    .copy('myPool', {
        idArr: ['Zoho file`s id', 'Zoho file`s id', 'Zoho file`s id'],
        parentId: 'Zoho folder`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with сopied files
    });
```

### files.delete

_Delete current files by id (more files)_

**Returns**: <code>Object</code> - object with message about delete files

| Param        | Type                  | Description                             | Required |
| ------------ | --------------------- | --------------------------------------- | -------- |
| pool         | <code>string</code>   | name of the pool you would like, of use | true     |
| params       | <code>Object</code>   |                                         |          |
| params.idArr | <code>String[]</code> | Array with file`s id                    | true     |

<br>

```javascript
zWDApi.files
    .delete('myPool', {
        idArr: ['Zoho file`s id', 'Zoho file`s id', 'Zoho file`s id'],
    })
    .then(data => {
        // console.log(data)
        // returns data with message about delete files
    });
```

### files.move

_Move current files by id (more files) to folder with current id_

**Returns**: <code>Object[]</code> - movied files array of object

| Param        | Type                  | Description                             | Required |
| ------------ | --------------------- | --------------------------------------- | -------- |
| pool         | <code>string</code>   | name of the pool you would like, of use | true     |
| params       | <code>Object</code>   |                                         |          |
| params.idArr | <code>Object[]</code> | Array with file`s id and new parentId   | true     |

<br>

```javascript
zWDApi.files
    .move('myPool', {
        idArr: [
            { id: 'Zoho file`s id', parentId: 'Zoho folder`s id' },
            { id: 'Zoho file`s id', parentId: 'Zoho folder`s id' },
            { id: 'Zoho file`s id', parentId: 'Zoho folder`s id' },
        ],
    })
    .then(data => {
        // console.log(data)
        // returns data with movied files
    });
```

### files.list

_Return info about all files by parent folder id_

**Returns**: <code>Object[]</code> - folder`s files array of object

| Param           | Type                | Description                             | Required |
| --------------- | ------------------- | --------------------------------------- | -------- |
| pool            | <code>string</code> | name of the pool you would like, of use | true     |
| params          | <code>Object</code> |                                         |          |
| params.folderId | <code>String</code> | Id of the parent folder                 | true     |

<br>

```javascript
zWDApi.files
    .list('myPool', {
        folderId: 'Zoho folder`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with folder`s files
    });
```

## url

_Return result get operation for current link (Only GET operation)_

**Returns**: <code>Object</code> - result object

| Param       | Type                | Description                             | Required |
| ----------- | ------------------- | --------------------------------------- | -------- |
| pool        | <code>string</code> | name of the pool you would like, of use | true     |
| params      | <code>Object</code> |                                         |          |
| params.link | <code>String</code> | link for request                        | true     |

<br>

```javascript
zWDApi
    .url('myPool', {
        link: 'https://workdrive.zoho.com/api/v1/files/<id>',
    })
    .then(data => {
        // console.log(data)
        // returns data with result object
    });
```

## share

### share.createShare

_Create Share Link_

**Returns**: <code>Object</code> - new Share Link object

| Param                            | Type                  | Description                             | Required |
| -------------------------------- | --------------------- | --------------------------------------- | -------- |
| pool                             | <code>string</code>   | name of the pool you would like, of use | true     |
| params                           | <code>Object</code>   |                                         |          |
| params.resourceId                | <code>String</code>   | Id of the file                          | true     |
| params.name                      | <code>String</code>   | Name of new link                        | true     |
| params.allowDownload             | <code>Boolean</code>  | download Possible                       | true     |
| params.role                      | <code>String</code>   | role                                    | true     |
| params.requestUserData           | <code>Boolean</code>  | Request User Data                       | false    |
| params.password                  | <code>String</code>   | password                                | false    |
| params.expiredDate               | <code>String</code>   | Expired date                            | false    |
| params.inputFields               | <code>String[]</code> | fields array                            | false    |
| params.inputFields.field_name    | <code>String</code>   | field name                              | true     |
| params.inputFields.field_type    | <code>String</code>   | field type                              | true     |
| params.inputFields.is_name_field | <code>Boolean</code>  | is field name                           | false    |

<br>

```javascript
zWDApi
    .share.createShare('myPool', {
        name,
        inputFields: [{​
        "field_name":"Name",​
        "field_type": "TEXT",
        "is_name_field" : true
        }],
        requestUserData: true,
        allowDownload: true,
        password: 'pass',
        expiredDate: "2020-09-26",
        role: 'edit',
    })
    .then(data => {
        // console.log(data)
    });
```

### share.createDownLoad

_Create Download Link_

**Returns**: <code>Object</code> - new Download Link object

| Param                  | Type                 | Description                             | Required |
| ---------------------- | -------------------- | --------------------------------------- | -------- |
| pool                   | <code>string</code>  | name of the pool you would like, of use | true     |
| params                 | <code>Object</code>  |                                         |          |
| params.resourceId      | <code>String</code>  | Id of the file                          | true     |
| params.name            | <code>String</code>  | Name of new link                        | true     |
| params.requestUserData | <code>Boolean</code> | Request User Data                       | false    |
| params.expiredDate     | <code>String</code>  | Expired date                            | false    |
| params.downloadLimit   | <code>Number</code>  | count downloads                         | false    |

<br>

```javascript
zWDApi.share
    .createDownLoad('myPool', {
        resourceId: 'fileId',
        name: 'linkName',
        requestUserData: true,
        expiredDate: '2020-09-26',
        downloadLimit: 5,
    })
    .then(data => {
        // console.log(data)
    });
```

### share.update

_Update Link_

**Returns**: <code>Object</code> - updated Link object

| Param                                 | Type                 | Description                             | Required |
| ------------------------------------- | -------------------- | --------------------------------------- | -------- |
| pool                                  | <code>string</code>  | name of the pool you would like, of use | true     |
| params                                | <code>Object</code>  |                                         |          |
| params.linkId                         | <code>String</code>  | link Id                                 | true     |
| params.attributes                     | <code>Object</code>  |                                         | true     |
| params.attributes.expiredDate         | <code>String</code>  | Expired date                            | false    |
| params.attributes.allowDownload       | <code>Boolean</code> | download Possible                       | false    |
| params.attributes.isPasswordProtected | <code>Boolean</code> | Request User Data                       | false    |
| params.attributes.password            | <code>String</code>  | password                                | false    |

<br>

```javascript
zWDApi.share
    .update('myPool', {
        attributes: {
            allowDownload: false,
            password: 'updatepassword1',
            isPasswordProtected: true,
            expiredDate: '2020-09-30',
        },
        linkId: 'Link id',
    })
    .then(data => {
        // console.log(data)
    });
```

### share.delete

_Delete Shared Link_

**Returns**: <code>Object</code>

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.linkId | <code>String</code> | link Id                                 | true     |

<br>

```javascript
zWDApi.share
    .delete('myPool', {
        linkId: 'Link id',
    })
    .then(data => {
        // console.log(data)
    });
```

## customMeta

## customMeta.dataTemp

### customMeta.dataTemp.list

_Return info about all templates for your team_

**Returns**: <code>Object[]</code> - templates array of object

| Param         | Type                | Description                             | Required |
| ------------- | ------------------- | --------------------------------------- | -------- |
| pool          | <code>string</code> | name of the pool you would like, of use | true     |
| params        | <code>Object</code> |                                         |          |
| params.teamId | <code>String</code> | Zoho team`s id                          | true     |

<br>

```javascript
zWDApi.customMeta.dataTemp
    .list('myPool', {
        teamId: 'Zoho team`s id',
    })
    .then(data => {
        // console.log(data)
        // returns data with all templates for your team
    });
```

### customMeta.dataTemp.create

_Create customData template_

**Returns**: <code>Object</code> - new template object

| Param              | Type                | Description                             | Required |
| ------------------ | ------------------- | --------------------------------------- | -------- |
| pool               | <code>string</code> | name of the pool you would like, of use | true     |
| params             | <code>Object</code> |                                         |          |
| params.teamId      | <code>String</code> | Id your zoho team                       | true     |
| params.name        | <code>String</code> | Name of new template                    | true     |
| params.description | <code>String</code> |                                         | false    |

<br>

```javascript
zWDApi.customMeta.dataTemp
    .create('myPool', {
        teamId,
        name,
        description,
    })
    .then(data => {
        // console.log(data)
    });
```

### customMeta.dataTemp.update

_Update customData template_

**Returns**: <code>Object</code> - updated template object

| Param              | Type                | Description                             | Required |
| ------------------ | ------------------- | --------------------------------------- | -------- |
| pool               | <code>string</code> | name of the pool you would like, of use | true     |
| params             | <code>Object</code> |                                         |          |
| params.templateId  | <code>String</code> | Template id                             | true     |
| params.name        | <code>String</code> | Name template                           | true     |
| params.description | <code>String</code> |                                         | false    |

<br>

```javascript
zWDApi.customMeta.dataTemp
    .update('myPool', {
        templateId,
        name,
        description,
    })
    .then(data => {
        // console.log(data)
    });
```

### customMeta.dataTemp.delete

_Delete customData template_

**Returns**: <code>Object</code>

| Param             | Type                | Description                             | Required |
| ----------------- | ------------------- | --------------------------------------- | -------- |
| pool              | <code>string</code> | name of the pool you would like, of use | true     |
| params            | <code>Object</code> |                                         |          |
| params.templateId | <code>String</code> | template Id                             | true     |

<br>

```javascript
zWDApi.customMeta.dataTemp
    .delete('myPool', {
        templateId,
    })
    .then(data => {
        // console.log(data)
    });
```

## customMeta.fields

### customMeta.fields.list

_Return info about all custom fields for your template_

**Returns**: <code>Object[]</code> - fields array of object

| Param             | Type                | Description                             | Required |
| ----------------- | ------------------- | --------------------------------------- | -------- |
| pool              | <code>string</code> | name of the pool you would like, of use | true     |
| params            | <code>Object</code> |                                         |          |
| params.templateId | <code>String</code> | Template id                             | true     |

<br>

```javascript
zWDApi.customMeta.fields
    .list('myPool', {
        templateId,
    })
    .then(data => {
        // console.log(data)
        // returns data with all custom fields for your template
    });
```

### customMeta.fields.create

_Create custom field_

**Returns**: <code>Object</code> - new custom field object

| Param             | Type                | Description                             | Required |
| ----------------- | ------------------- | --------------------------------------- | -------- |
| pool              | <code>string</code> | name of the pool you would like, of use | true     |
| params            | <code>Object</code> |                                         |          |
| params.templateId | <code>String</code> | Template id                             | true     |
| params.name       | <code>String</code> | Name of new custom field                | true     |
| params.properties | <code>Object</code> |                                         | false    |

<br>

```javascript
zWDApi.customMeta.fields
    .create('myPool', {
        name: 'c-field',
        templateId,
        index: 0,
        type: 'multiline_text',
        properties: {
            description: `my Custom field`,
            is_mandatory: false,
        },
    })
    .then(data => {
        // console.log(data)
    });
```

#### Note : _index attribute represents position of Custom Field inside Data Template._

#### Other Custom Field types with

supported field properties:

1. text field_properties:

    1. description
    2. default_value
    3. max_char_length
    4. is_mandatory

2. multiline_text field_properties:

    1. description
    2. is_mandatory
    3. number field_properties:
    4. description
    5. default_value
    6. min_value
    7. max_value
    8. is_mandatory

3. datetime field_properties:

    1. description
    2. default_value - (in milli seconds)
    3. is_mandatory

4. date field_properties:

    1. description
    2. default_value - (in milli seconds)
    3. is_mandatory

5. yes_or_no field_properties:

    1. description
    2. default_value - (in boolean)
    3. is_mandatory

6. dropdown / radio / checkbox options: <JSON ARRAY format> Example: ["One","Two", "Three"] field_properties:

    1. description
    2. default_value
    3. is_mandatory

7. email field_properties:
    1. description
    2. is_mandatory

### customMeta.fields.update

_Update custom field_

**Returns**: <code>Object</code> - updated custom field object

| Param          | Type                | Description                             | Required |
| -------------- | ------------------- | --------------------------------------- | -------- |
| pool           | <code>string</code> | name of the pool you would like, of use | true     |
| params         | <code>Object</code> |                                         |          |
| params.fieldId | <code>String</code> | custom field id                         | true     |
| params.name    | <code>String</code> | Name of field                           | false    |

<br>

```javascript
zWDApi.customMeta.fields
    .update('myPool', {
        fieldId,
        name,
    })
    .then(data => {
        // console.log(data)
    });
```

### customMeta.fields.delete

_Delete custom field_

**Returns**: <code>Object</code>

| Param          | Type                | Description                             | Required |
| -------------- | ------------------- | --------------------------------------- | -------- |
| pool           | <code>string</code> | name of the pool you would like, of use | true     |
| params         | <code>Object</code> |                                         |          |
| params.fieldId | <code>String</code> | custom field Id                         | true     |

<br>

```javascript
zWDApi.customMeta.fields
    .delete('myPool', {
        fieldId: 'field id',
    })
    .then(data => {
        // console.log(data)
    });
```

## customMeta.meta

### customMeta.meta.create

_Create meta data for file_

**Returns**: <code>Object</code> - new meta object

| Param                             | Type                | Description                             | Required |
| --------------------------------- | ------------------- | --------------------------------------- | -------- |
| pool                              | <code>string</code> | name of the pool you would like, of use | true     |
| params                            | <code>Object</code> |                                         |          |
| params.templateId                 | <code>String</code> | Template id                             | true     |
| params.resourceId                 | <code>String</code> | file id                                 | true     |
| params.customData                 | <code>Object</code> |                                         | true     |
| params.customData.custom_field_id | <code>String</code> | custom field id                         | true     |
| params.customData.value           | <code>String</code> | saved data                              | true     |

<br>

```javascript
zWDApi.customMeta.meta
    .create('myPool', {
        templateId,
        resourceId,
        customData: [
            {
                custom_field_id,
                value,
            },
            {
                custom_field_id,
                value,
            },
        ],
    })
    .then(data => {
        // console.log(data)
    });
```

### customMeta.meta.update

_Update meta data_

**Returns**: <code>Object</code> - updated meta object

| Param                             | Type                | Description                             | Required |
| --------------------------------- | ------------------- | --------------------------------------- | -------- |
| pool                              | <code>string</code> | name of the pool you would like, of use | true     |
| params                            | <code>Object</code> |                                         |          |
| params.metadataId                 | <code>String</code> | file metadataId id                      | true     |
| params.customData                 | <code>Object</code> |                                         | true     |
| params.customData.custom_field_id | <code>String</code> | custom field id                         | true     |
| params.customData.value           | <code>String</code> | saved data                              | true     |

<br>

```javascript
zWDApi.customMeta.meta
    .update('myPool', {
        metadataId,
        customData: [
            {
                custom_field_id,
                value,
            },
            {
                custom_field_id,
                value,
            },
        ],
    })
    .then(data => {
        // console.log(data)
    });
```

### customMeta.meta.delete

_Delete file meta data_

**Returns**: <code>Object</code>

| Param             | Type                | Description                             | Required |
| ----------------- | ------------------- | --------------------------------------- | -------- |
| pool              | <code>string</code> | name of the pool you would like, of use | true     |
| params            | <code>Object</code> |                                         |          |
| params.metadataId | <code>String</code> | file metadataId id                      | true     |

<br>

```javascript
zWDApi.customMeta.meta
    .delete('myPool', {
        metadataId,
    })
    .then(data => {
        // console.log(data)
    });
```
