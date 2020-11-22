import { migrateWithQueries } from "serverSrc/helpers/migrations";
import HOUSEHOLDS_TABLE from 'serverSrc/database/models/tables/households';
import HOUSEHOLD_MEMBERS_TABLE from 'serverSrc/database/models/tables/household_members';
import HOUSEHOLD_INVITATIONS_TABLE from 'serverSrc/database/models/tables/household_invitations';

const { columns: householdColumns } = HOUSEHOLDS_TABLE;
const { columns: memberColumns } = HOUSEHOLD_MEMBERS_TABLE;
const { columns: invitationColumns } = HOUSEHOLD_INVITATIONS_TABLE;

module.exports = {
    up: (conn, cb) => migrateWithQueries(cb,
        conn.query(`
      ALTER TABLE ${HOUSEHOLD_MEMBERS_TABLE.name}
      ADD CONSTRAINT FK_HouseholdId
      ADD FOREIGN KEY (${memberColumns.id_household} REFERENCES ${HOUSEHOLDS_TABLE.name}(${householdColumns.id_household}))
    `)
        && conn.query(`
      ALTER TABLE ${HOUSEHOLD_INVITATIONS_TABLE.name}
      ADD CONSTRAINT FK_HouseholdId
      ADD FOREIGN KEY (${invitationColumns.id_household} REFERENCES ${HOUSEHOLDS_TABLE.name}(${householdColumns.id_household}))
    `)
    ),
    down: (conn, cb) => migrateWithQueries(cb,
        conn.query(`
        ALTER TABLE ${HOUSEHOLD_MEMBERS_TABLE.name}
        DROP FOREIGN KEY FK_HouseholdId
        `)
        && conn.query(`
        ALTER TABLE ${HOUSEHOLD_INVITATIONS_TABLE.name}
        DROP FOREIGN KEY FK_HouseholdId
        `)
    ),
}
