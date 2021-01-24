import MigrationError from './errors/MigrationError'

export const migrateWithQueries = async (cb: any, queries: () => Promise<boolean>) => {
  const result = await queries()
  if (result) {
    // eslint-disable-next-line no-console
    console.log('Migration successful.')
    cb()
  } else {
    throw new MigrationError('ERROR: Migration failed!')
  }
}
