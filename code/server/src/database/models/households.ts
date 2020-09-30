import { database } from 'serverSrc/database';
import HOUSEHOLD_ROLE_TYPE from 'serverSrc/constants/householdRoleType';

import HOUSEHOLDS_TABLE from './tables/households';
import HOUSEHOLD_INVITATIONS_TABLE from './tables/household_invitations';
import HOUSEHOLD_MEMBERS_TABLE from './tables/household_members';
import USERS_TABLE from './tables/users';

const {
  name: tName,
  columns: { id: tabID, name: tabName, photo: tabPhoto, date_created: tabDateCreated },
} = HOUSEHOLDS_TABLE;

const {
  name: tHouseInvName,
  columns: {
    id_household: tabHouseInvIDHousehold, id_from: tabHouseInvIDFrom, id_to: tabConnectionsIDTo, message: tabConnectionsMessage,
    date_created: tabHouseInvDateCreated,
  },
} = HOUSEHOLD_INVITATIONS_TABLE;

const {
  name: tHouseMemName,
  columns: {
    id_household: tabHouseMemIDHousehold, id_user: tabHouseMemIDUser, role: tabHouseMemRole, id_from: tabHouseMemIDFrom,
    photo: tabHouseMemPhoto, date_joined: tabHouseInvDateJoined,
  },
} = HOUSEHOLD_MEMBERS_TABLE;

const {
  name: tUsersName,
  columns: { id: tabUsersID, nickname: tabUsersNickname, photo: tabUsersPhoto },
} = USERS_TABLE;

export const findUserHouseholds = async (currentUser: number): Promise<{
  invitations: Array<object>;
  households: Array<object>;
}> => {
  // const invitations = await database.query(`SELECT * FROM ${tHouseInvName} WHERE ${tabConnectionsIDTo}=${currentUser}`);
  const invitations = [{
    [tabHouseInvIDHousehold]: 1,
    [tabName]: 'HOUSEHOLD 1',
    [tabPhoto]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    from: { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    [tabConnectionsMessage]: 'AHOJKY',
  }, {
    [tabHouseInvIDHousehold]: 2,
    [tabName]: 'HOUSEHOLD 2',
    [tabPhoto]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    from: { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    to: { [tabUsersID]: 2, [tabUsersNickname]: 'Uzivatel 2', [tabUsersPhoto]: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale' },
    [tabConnectionsMessage]: 'AHOJKY',
  }];
  const households = [{
    [tabID]: 1,
    [tabName]: 'household 1',
    [tabDateCreated]: '21.6. 2020 18:56:42',
    [tabPhoto]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    members: [
      { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      from: { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      to: { [tabUsersID]: 2, [tabUsersNickname]: 'Uzivatel 2', [tabUsersPhoto]: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale' },
      [tabConnectionsMessage]: 'AHOJKY',
    }, {
      from: { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      to: { [tabUsersID]: 2, [tabUsersNickname]: 'Uzivatel 2', [tabUsersPhoto]: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale' },
      [tabConnectionsMessage]: 'AHOJKY',
    }],
  }, {
    [tabID]: 2,
    [tabName]: 'household 2',
    [tabDateCreated]: '21.6. 2021 18:56:42',
    [tabPhoto]: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw22620c58/images/products/vegetables/00053_01_brilliantfield.jpg?sw=387&cx=226&cy=0&cw=1196&ch=1196',
    members: [
      { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      from: { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      to: { [tabUsersID]: 2, [tabUsersNickname]: 'Uzivatel 2', [tabUsersPhoto]: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale' },
      [tabConnectionsMessage]: 'AHOJKY',
    }, {
      from: { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      to: { [tabUsersID]: 2, [tabUsersNickname]: 'Uzivatel 2', [tabUsersPhoto]: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale' },
      [tabConnectionsMessage]: 'AHOJKY',
    }],
  }, {
    [tabID]: 3,
    [tabName]: 'household 3',
    [tabDateCreated]: '21.6. 2022 18:56:42',
    [tabPhoto]: 'https://www.rareseeds.com/media/catalog/product/cache/4f71e30e38ffe1b90b59b74efe76a4b8/m/e/melon-tigger-lss-dsc_3440.jpg',
    members: [
      { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      from: { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      to: { [tabUsersID]: 2, [tabUsersNickname]: 'Uzivatel 2', [tabUsersPhoto]: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale' },
      [tabConnectionsMessage]: 'AHOJKY',
    }, {
      from: { [tabUsersID]: 1, [tabUsersNickname]: 'Uzivatel 1', [tabUsersPhoto]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      to: { [tabUsersID]: 2, [tabUsersNickname]: 'Uzivatel 2', [tabUsersPhoto]: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale' },
      [tabConnectionsMessage]: 'AHOJKY',
    }],
  }];
  /* await database.query(`
      SELECT households.${tabID}, households.${tabName}, households.${tabPhoto}, households.${tabDateCreated},
        (SELECT * FROM ${tHouseMemName} AS mems WHERE households.${tabID}=mems.${tabHouseMemIDHousehold}) AS members,
        (SELECT * FROM ${tHouseInvName} AS invs WHERE households.${tabID}=invs.${tabHouseInvIDHousehold}) AS invitations
      FROM ${tName} AS households
      INNER JOIN ${tHouseMemName} ON households.${tabID}=${tabHouseMemIDHousehold} AND ${tabHouseMemIDUser}=${currentUser}
  `); */

  return {
    invitations,
    households,
  };
};

export const ignoreInvitation = async (
  currentId: number,
  { fromId, householdId }: { fromId: number; householdId: number },
): Promise<boolean> =>
  await database.query(`
    DELETE FROM ${tHouseInvName}
    WHERE ${tabConnectionsIDTo}=${currentId} AND ${tabHouseInvIDFrom}=? AND ${tabHouseInvIDHousehold}=?
  `, [fromId, householdId]);

export const approveInvitation = async (
  currentId: number,
  { fromId, householdId, photo }: { fromId: number; householdId: number; photo: string },
): Promise<boolean> =>
  await database.query(`
    INSERT INTO ${tHouseMemName} (
      ${tabHouseMemIDHousehold}, ${tabHouseMemIDUser}, ${tabHouseMemIDFrom} ${tabHouseMemRole}, ${tabHouseMemPhoto}, ${tabHouseInvDateJoined}
    ) VALUES (?, ${currentId}, ?, '${HOUSEHOLD_ROLE_TYPE.MEMBER}', ?, NOW())
  `, [householdId, fromId, photo]);
