import USERS_TABLE from 'serverSrc/database/models/tables/users';

const { columns: {
    id, email, nickname, password, photo, confirmed, date_last_active, date_registered,
} } = USERS_TABLE; 

module.exports = {
    up: (conn, cb) => {
        conn.query(`CREATE TABLE ${USERS_TABLE.name} (
            ${id} INT AUTO_INCREMENT PRIMARY KEY,
            ${email} VARCHAR(255) NOT NULL,
            ${nickname} VARCHAR(255) NOT NULL,
            ${password} CHAR(60) NOT NULL,
            ${photo} VARCHAR(2083),
            ${confirmed} TINYINT(1) NOT NULL DEFAULT 0,
            ${date_registered} DATETIME NOT NULL,
            ${date_last_active} DATETIME
        )`);
        conn.query(`INSERT INTO ${USERS_TABLE.name} (
            ${email}, ${nickname}, ${password}, ${confirmed}, ${date_registered}
        ) VALUES (
            'test@test.cz', 'test', '$2y$12$917uKopA7bPqkCDlHCyavO5fAch/CFYre7aANyqxnUqZZrNnQQQOy',
            1, NOW()
        )`);
        cb();
    },
    down: `DROP TABLE ${USERS_TABLE.name}`,
};
