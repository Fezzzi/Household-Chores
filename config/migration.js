import migration from 'mysql-migrations';

import { pool } from 'serverSrc/database/connection';

migration.init(pool, `${__dirname}/../migrations`);
