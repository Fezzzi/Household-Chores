import MigrationError from './errors/MigrationError'

export const migrateWithQueries = (cb: any, ok: boolean) => {
  if (ok) {
    // eslint-disable-next-line no-console
    console.log('Migration successful.')
    cb()
  } else {
    throw new MigrationError('ERROR: Migration failed!')
  }
}
