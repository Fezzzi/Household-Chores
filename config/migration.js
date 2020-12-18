import { readdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import migration from 'mysql-migrations'

import { pool } from 'serverSrc/database/connection'

const migrationsDir = path.join(__dirname, '..', 'migrations')
const template = path.join(__dirname, 'migration-template.js')
migration.init(pool, migrationsDir, () => {
  const latestFile = readdirSync(migrationsDir).slice(-1)[0]
  const templateFile = readFileSync(template, { encoding: 'utf8' })
  if (templateFile && latestFile) {
    const file = readFileSync(path.join(migrationsDir, latestFile), { encoding: 'utf8' })
    if (!file.startsWith('import')) {
      writeFileSync(path.join(migrationsDir, latestFile), templateFile)
    }
  }
})
