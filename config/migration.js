import migration from 'mysql-migrations';

import { pool } from 'serverSrc/models/connection';

migration.init(pool, `${__dirname}/../migrations`);
