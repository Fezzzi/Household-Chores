import { database } from 'serverSrc/database';
import HOUSEHOLD_ROLE_TYPE from 'shared/constants/householdRoleType';

import { HOUSEHOLD_KEYS } from 'shared/constants/settingsDataKeys';
import HOUSEHOLDS_TABLE from './tables/households';
import HOUSEHOLD_INVITATIONS_TABLE from './tables/household_invitations';
import HOUSEHOLD_MEMBERS_TABLE from './tables/household_members';
import USERS_TABLE from './tables/users';
import { number } from '~/node_modules/@types/prop-types';

const {
  name: tName,
  columns: { id: tabID, name: tabName, photo: tabPhoto, date_created: tabDateCreated },
} = HOUSEHOLDS_TABLE;

const {
  name: tHouseInvName,
  columns: {
    id_household: tabHouseInvIDHousehold, id_from: tabHouseInvIDFrom, id_to: tabHouseInvIDTo, message: tabHouseInvMessage,
    date_created: tabHouseInvDateCreated,
  },
} = HOUSEHOLD_INVITATIONS_TABLE;

const {
  name: tHouseMemName,
  columns: houseMemCols,
} = HOUSEHOLD_MEMBERS_TABLE;

const {
  name: tUsersName,
  columns: { id: tabUsersID, nickname: tabUsersNickname, photo: tabUsersPhoto },
} = USERS_TABLE;

export const findUserInvitations = async (currentUser: number): Promise<Array<object>> => {
  return [{
    [tabHouseInvIDHousehold]: 1,
    [tabName]: 'HOUSEHOLD 1',
    [tabPhoto]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    fromId: 1,
    fromNickname: 'Uzivatel 1',
    fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
    [tabHouseInvMessage]: 'AHOJKY',
  }, {
    [tabHouseInvIDHousehold]: 2,
    [tabName]: 'HOUSEHOLD 2',
    [tabPhoto]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    fromId: 2,
    fromNickname: 'Uzivatel 2',
    fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
    [tabHouseInvMessage]: 'AHOJKY',
  }];

  return database.query(`SELECT * FROM ${tHouseInvName} WHERE ${tabHouseInvIDTo}=${currentUser}`);
};


export const findUserHouseholds = async (currentUser: number): Promise<Array<object>> =>
  [{
    [tabID]: 1,
    [tabName]: 'household 1',
    key: 'household-1',
    [tabDateCreated]: '21.6. 2020 18:56:42',
    [tabPhoto]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    members: [
      { [houseMemCols.role]: HOUSEHOLD_ROLE_TYPE.ADMIN, [houseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [houseMemCols.role]: HOUSEHOLD_ROLE_TYPE.MEMBER, [houseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tabHouseInvMessage]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }, {
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tabHouseInvMessage]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }],
  }, {
    [tabID]: 2,
    [tabName]: 'household 2',
    key: 'household-2',
    [tabDateCreated]: '21.6. 2021 18:56:42',
    [tabPhoto]: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw22620c58/images/products/vegetables/00053_01_brilliantfield.jpg?sw=387&cx=226&cy=0&cw=1196&ch=1196',
    members: [
      { [houseMemCols.role]: HOUSEHOLD_ROLE_TYPE.ADMIN, [houseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [houseMemCols.role]: HOUSEHOLD_ROLE_TYPE.MEMBER, [houseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tabHouseInvMessage]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }, {
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tabHouseInvMessage]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }],
  }, {
    [tabID]: 3,
    [tabName]: 'household 3',
    key: 'household-3',
    [tabDateCreated]: '21.6. 2022 18:56:42',
    [tabPhoto]: 'https://www.rareseeds.com/media/catalog/product/cache/4f71e30e38ffe1b90b59b74efe76a4b8/m/e/melon-tigger-lss-dsc_3440.jpg',
    members: [
      { [houseMemCols.role]: HOUSEHOLD_ROLE_TYPE.ADMIN, [houseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [houseMemCols.role]: HOUSEHOLD_ROLE_TYPE.MEMBER, [houseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tabHouseInvMessage]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }, {
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tabHouseInvMessage]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }],
  }]
  /* await database.query(`
      SELECT households.${tabID}, households.${tabName}, households.${tabPhoto}, households.${tabDateCreated},
        (SELECT * FROM ${tHouseMemName} AS mems WHERE households.${tabID}=mems.${tabHouseMemIDHousehold}) AS members,
        (SELECT * FROM ${tHouseInvName} AS invs WHERE households.${tabID}=invs.${tabHouseInvIDHousehold}) AS invitations
      FROM ${tName} AS households
      INNER JOIN ${tHouseMemName} ON households.${tabID}=${tabHouseMemIDHousehold} AND ${tabHouseMemIDUser}=${currentUser}
  `); */
;

export const addHouseholdInvitations = async (
  householdId: number,
  users: Array<Record<string, string | number>>,
  currentId: number,
): Promise<boolean> => database.query(`
    INSERT INTO ${tHouseInvName} VALUES (${
  users.map(() => `${householdId}, ${currentId}, ?, ?, NOW()`).join('),(')
})
  `, users.flatMap(user => [user.id, user.invitationMessage || '']));

export const createHousehold = async (
  data: Record<string, string | number>,
  currentId: number
): Promise<number | null> => {
  const result = await database.query(`
    INSERT INTO ${tName} (${tabName}, ${tabPhoto}, ${tabDateCreated}) VALUES (?, ?, NOW())
    `, [data[HOUSEHOLD_KEYS.NAME], data[HOUSEHOLD_KEYS.PHOTO]]
  );
  if (!result?.insertId) {
    return null;
  }
  const success = await database.query(`
    INSERT INTO ${tHouseMemName}
    VALUES (${result.insertId}, ${currentId}, ${currentId}, '${HOUSEHOLD_ROLE_TYPE.ADMIN}', ?, ?, NOW())
  `, [data[HOUSEHOLD_KEYS.USER_NAME], data[HOUSEHOLD_KEYS.USER_PHOTO]]);
  return success && result.insertId;
};

export const deleteHousehold = async (
  householdId: number
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tName}
    WHERE ${tabID}=?
  `, [householdId]);

export const leaveHousehold = async (
  userId: number,
  householdId: number
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseMemName}
    WHERE ${houseMemCols.id_household}=? AND ${houseMemCols.id_user}=${userId}
  `, [householdId]);

export const deleteInvitation = async (
  currentId: number,
  { fromId, householdId }: { fromId: number; householdId: number },
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseInvName}
    WHERE ${tabHouseInvIDTo}=${currentId} AND ${tabHouseInvIDFrom}=? AND ${tabHouseInvIDHousehold}=?
  `, [fromId, householdId]);

export const approveInvitation = async (
  currentId: number,
  { fromId, householdId, name, photo }: { fromId: number; householdId: number; name: string; photo: string },
): Promise<boolean> =>
  database.query(`
    INSERT INTO ${tHouseMemName} (
      ${houseMemCols.id_household}, ${houseMemCols.id_user}, ${houseMemCols.id_from} ${houseMemCols.role},
      ${houseMemCols.name}, ${houseMemCols.photo}, ${houseMemCols.date_joined}
    ) VALUES (?, ${currentId}, ?, '${HOUSEHOLD_ROLE_TYPE.MEMBER}', ?, NOW())
  `, [householdId, fromId, name, photo]);

export const getUserRole = async (
  userId: number,
  householdId: number
): Promise<string | null> =>
  database.query(`
    SELECT ${houseMemCols.role}
    FROM ${tHouseMemName}
    WHERE ${houseMemCols.id_user}=${userId} AND ${houseMemCols.id_household}=?
  `, [householdId]);
