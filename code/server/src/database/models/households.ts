import { database } from 'serverSrc/database'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { HOUSEHOLD_KEYS } from 'shared/constants/settingsDataKeys'

import HOUSEHOLDS_TABLE from './tables/households'
import HOUSEHOLD_INVITATIONS_TABLE from './tables/household_invitations'
import HOUSEHOLD_MEMBERS_TABLE from './tables/household_members'
import USERS_TABLE from './tables/users'

const { name: tName, columns: tHouseholdCols } = HOUSEHOLDS_TABLE
const { name: tHouseInvName, columns: tHouseInvCols } = HOUSEHOLD_INVITATIONS_TABLE
const { name: tHouseMemName, columns: tHouseMemCols } = HOUSEHOLD_MEMBERS_TABLE
const { name: tUsersName, columns: tUserCols } = USERS_TABLE

export const findUserInvitations = async (currentUser: number): Promise<Array<object>> => {
  return [{
    [tHouseInvCols.id_household]: 1,
    [tHouseholdCols.name]: 'HOUSEHOLD 1',
    [tHouseholdCols.photo]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    fromId: 1,
    fromNickname: 'Uzivatel 1',
    fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
    [tHouseInvCols.message]: 'AHOJKY',
  }, {
    [tHouseInvCols.id_household]: 2,
    [tHouseholdCols.name]: 'HOUSEHOLD 2',
    [tHouseholdCols.photo]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    fromId: 2,
    fromNickname: 'Uzivatel 2',
    fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
    [tHouseInvCols.message]: 'AHOJKY',
  }]

  return database.query(`SELECT * FROM ${tHouseInvName} WHERE ${tHouseInvCols.id_to}=${currentUser}`)
}

export const findUserHouseholds = async (currentUser: number): Promise<Array<object>> =>
  [{
    [tHouseholdCols.id]: 1,
    [tHouseholdCols.name]: 'household 1',
    key: 'household-1',
    [tHouseholdCols.date_created]: '21.6. 2020 18:56:42',
    [tHouseholdCols.photo]: 'https://www.fondation-louisbonduelle.org/wp-content/uploads/2016/09/melon_194841866.png',
    members: [
      { [tHouseMemCols.role]: HOUSEHOLD_ROLE_TYPE.ADMIN, [tHouseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tUserCols.id]: 1, [tUserCols.nickname]: 'Uzivatel 1', [tUserCols.photo]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [tHouseMemCols.role]: HOUSEHOLD_ROLE_TYPE.MEMBER, [tHouseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tUserCols.id]: 1, [tUserCols.nickname]: 'Uzivatel 1', [tUserCols.photo]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tHouseInvCols.message]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }, {
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tHouseInvCols.message]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }],
  }, {
    [tHouseholdCols.id]: 2,
    [tHouseholdCols.name]: 'household 2',
    key: 'household-2',
    [tHouseholdCols.date_created]: '21.6. 2021 18:56:42',
    [tHouseholdCols.photo]: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw22620c58/images/products/vegetables/00053_01_brilliantfield.jpg?sw=387&cx=226&cy=0&cw=1196&ch=1196',
    members: [
      { [tHouseMemCols.role]: HOUSEHOLD_ROLE_TYPE.ADMIN, [tHouseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tUserCols.id]: 1, [tUserCols.nickname]: 'Uzivatel 1', [tUserCols.photo]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [tHouseMemCols.role]: HOUSEHOLD_ROLE_TYPE.MEMBER, [tHouseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tUserCols.id]: 1, [tUserCols.nickname]: 'Uzivatel 1', [tUserCols.photo]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tHouseInvCols.message]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }, {
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tHouseInvCols.message]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }],
  }, {
    [tHouseholdCols.id]: 3,
    [tHouseholdCols.name]: 'household 3',
    key: 'household-3',
    [tHouseholdCols.date_created]: '21.6. 2022 18:56:42',
    [tHouseholdCols.photo]: 'https://www.rareseeds.com/media/catalog/product/cache/4f71e30e38ffe1b90b59b74efe76a4b8/m/e/melon-tigger-lss-dsc_3440.jpg',
    members: [
      { [tHouseMemCols.role]: HOUSEHOLD_ROLE_TYPE.ADMIN, [tHouseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tUserCols.id]: 1, [tUserCols.nickname]: 'Uzivatel 1', [tUserCols.photo]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
      { [tHouseMemCols.role]: HOUSEHOLD_ROLE_TYPE.MEMBER, [tHouseMemCols.date_joined]: '21. 1. 2020 16:32:58', [tUserCols.id]: 1, [tUserCols.nickname]: 'Uzivatel 1', [tUserCols.photo]: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg' },
    ],
    invitations: [{
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tHouseInvCols.message]: 'AHOJKY',
      dateCreated: '21.6. 2020 18:56:42',
    }, {
      fromId: 1,
      fromNickname: 'Uzivatel 1',
      fromPhoto: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
      toId: 2,
      toNickname: 'Uzivatel 2',
      toPhoto: 'https://images.ctfassets.net/6jpeaipefazr/3KUmXmc2mO7wmAC1nT3NNH/b3d928a1bcb1d7260eb9ce00fda51cca/F3-melon.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale',
      [tHouseInvCols.message]: 'AHOJKY',
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

export const addHouseholdInvitations = async (
  householdId: number,
  users: Array<Record<string, string | number>>,
  currentId: number,
): Promise<boolean> => database.query(`
    INSERT INTO ${tHouseInvName}
    VALUES (${users.map(() => `${householdId}, ${currentId}, ?, ?, NOW()`).join('),(')})
  `, users.flatMap(user => [user.id, user.invitationMessage || '']))

export const createHousehold = async (
  data: Record<string, string | number>,
  currentId: number
): Promise<number | null> =>
  database.withTransaction(async (): Promise<number | null> => {
    const result = await database.query(`
      INSERT INTO ${tName} (${tHouseholdCols.name}, ${tHouseholdCols.photo}, ${tHouseholdCols.date_created})
      VALUES (?, ?, NOW())
    `, [data[HOUSEHOLD_KEYS.NAME], data[HOUSEHOLD_KEYS.PHOTO]])

    if (!result?.insertId) {
      return null
    }
    const success = await database.query(`
      INSERT INTO ${tHouseMemName}
      VALUES (${result.insertId}, ${currentId}, ${currentId}, '${HOUSEHOLD_ROLE_TYPE.ADMIN}', ?, ?, NOW())
    `, [data[HOUSEHOLD_KEYS.USER_NAME], data[HOUSEHOLD_KEYS.USER_PHOTO]])
    return success && result.insertId
  })

export const deleteHousehold = async (
  householdId: number
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tName}
    WHERE ${tHouseholdCols.id}=?
  `, [householdId])

export const leaveHousehold = async (
  userId: number,
  householdId: number
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.id_household}=? AND ${tHouseMemCols.id_user}=${userId}
  `, [householdId])

export const deleteInvitation = async (
  currentId: number,
  { fromId, householdId }: { fromId: number; householdId: number },
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseInvName}
    WHERE ${tHouseInvCols.id_to}=${currentId} AND ${tHouseInvCols.id_from}=? AND ${tHouseInvCols.id_household}=?
  `, [fromId, householdId])

export const approveInvitation = async (
  currentId: number,
  data: { fromId: number; householdId: number; name: string; photo: string },
): Promise<boolean | null> =>
  database.withTransaction(async (): Promise<boolean> => {
    const success = await deleteInvitation(currentId, data)
    if (success) {
      const { fromId, householdId, name, photo } = data
      return database.query(`
        INSERT INTO ${tHouseMemName} (
          ${tHouseMemCols.id_household}, ${tHouseMemCols.id_user}, ${tHouseMemCols.id_from} ${tHouseMemCols.role},
          ${tHouseMemCols.name}, ${tHouseMemCols.photo}, ${tHouseMemCols.date_joined}
        ) VALUES (?, ${currentId}, ?, '${HOUSEHOLD_ROLE_TYPE.MEMBER}', ?, NOW())
      `, [householdId, fromId, name, photo])
    }
    return false
  })

export const getUserRole = async (
  userId: number,
  householdId: number
): Promise<string | null> =>
  database.query(`
    SELECT ${tHouseMemCols.role}
    FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.id_user}=${userId} AND ${tHouseMemCols.id_household}=?
  `, [householdId])
