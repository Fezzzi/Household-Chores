import HOUSEHOLDS_TABLE from 'serverSrc/database/models/tables/households';
import HOUSEHOLD_MEMBERS_TABLE from 'serverSrc/database/models/tables/household_members';
import HOUSEHOLD_INVITATIONS_TABLE from 'serverSrc/database/models/tables/household_invitations';
import HOUSEHOLD_ROLE_TYPE from 'serverSrc/constants/householdRoleType';
import { migrateWithQueries } from "serverSrc/helpers/migrations";

const { columns: householdColumns } = HOUSEHOLDS_TABLE;
const { columns: memberColumns } = HOUSEHOLD_MEMBERS_TABLE;
const { columns: invitationColumns } = HOUSEHOLD_INVITATIONS_TABLE;

module.exports = {
  up: (conn, cb) => migrateWithQueries(cb,
    conn.query(`
      CREATE TABLE ${HOUSEHOLDS_TABLE.name} (
        ${householdColumns.id} INT AUTO_INCREMENT PRIMARY KEY,
        ${householdColumns.name} VARCHAR(255) NOT NULL,
        ${householdColumns.photo} VARCHAR(2083),
        ${householdColumns.date_created} DATETIME NOT NULL
      )
    `)
    && conn.query(`
      CREATE TABLE ${HOUSEHOLD_MEMBERS_TABLE.name} (
        ${memberColumns.id_household} INT NOT NULL,
        ${memberColumns.id_user} INT NOT NULL,
        ${memberColumns.role} ENUM('${HOUSEHOLD_ROLE_TYPE.ADMIN}', '${HOUSEHOLD_ROLE_TYPE.MANAGER}', '${HOUSEHOLD_ROLE_TYPE.MEMBER}') NOT NULL DEFAULT '${HOUSEHOLD_ROLE_TYPE.MEMBER}',
        ${householdColumns.photo} VARCHAR(2083),
        ${householdColumns.date_joined} DATETIME NOT NULL,
        PRIMARY KEY (${memberColumns.id_household}, ${memberColumns.id_user})
      )
    `)
    && conn.query(`
      CREATE TABLE ${HOUSEHOLD_INVITATIONS_TABLE.name} (
        ${invitationColumns.id_household} INT NOT NULL,
        ${invitationColumns.id_from} INT NOT NULL,
        ${invitationColumns.id_to} INT NOT NULL,
        ${invitationColumns.message} VARCHAR(255) DEFAULT NULL,
        ${householdColumns.date_created} DATETIME NOT NULL,
        PRIMARY KEY (${memberColumns.id_household}, ${invitationColumns.id_to})
      )
    `)
  ),
  down: (conn, cb) => migrateWithQueries(cb,
    conn.query(`DROP TABLE ${HOUSEHOLDS_TABLE.name}`)
    && conn.query(`DROP TABLE ${HOUSEHOLD_MEMBERS_TABLE.name}`)
    && conn.query(`DROP TABLE ${HOUSEHOLD_INVITATIONS_TABLE.name}`)
  ),
}
