import path from 'path'
import { readdirSync, unlink } from 'fs'
import rimraf from 'rimraf'

import { database } from 'serverSrc/database'
import { CONFIG } from 'serverSrc/constants'
import {
  tUsersName, tUsersCols, tHouseMemName, tHouseMemCols, tHouseholdsName, tHouseholdsCols, TUsersType,
} from 'serverSrc/database/tables'

const getFiles = (dir: string): string[] => {
  const dirents = readdirSync(dir, { withFileTypes: true })
  const files: Array<string | string[]> = dirents.map(dirent => {
    const fileOrDir = path.join(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(fileOrDir) : fileOrDir
  })
  return Array.prototype.concat(...files)
}

const cleanDirectory = (dirPath: string, files: string[]) =>
  getFiles(dirPath)
    .filter(storedFile => files.indexOf(storedFile) === -1)
    // eslint-disable-next-line no-console
    .forEach(unusedFile => unlink(unusedFile, () => console.log(`unlinked ${unusedFile}`)))

type UserPhotoType = Pick<TUsersType, typeof tUsersCols.photo>

const cleanUploads = async () => {
  const userResults = await database.query<UserPhotoType>(`
    SELECT ${tUsersCols.photo} FROM ${tUsersName} WHERE ${tUsersCols.photo} IS NOT NULL
  `, [], null, false)

  const membershipResults = await database.query<UserPhotoType>(`
    SELECT ${tHouseMemCols.photo} FROM ${tHouseMemName} WHERE ${tHouseMemCols.photo} IS NOT NULL
  `, [], null, false)

  const householdResults = await database.query<UserPhotoType>(`
    SELECT ${tHouseholdsCols.photo} FROM ${tHouseholdsName} WHERE ${tHouseholdsCols.photo} IS NOT NULL
  `, [], null, false)

  const photosByKeys: Record<string, string[]> = [...userResults, ...membershipResults, ...householdResults]
    .filter(result => result[tUsersCols.photo])
    .reduce((acc: Record<string, string[]>, result) => {
      const parts = result[tUsersCols.photo]!.split('/')
      const fsKey = parts[2]
      const file = path.join(path.resolve('./'), CONFIG.UPLOADS_PATH, fsKey, parts[3], parts[4])
      if (acc[fsKey]) {
        acc[fsKey].push(file)
      } else {
        acc[fsKey] = [file]
      }
      return acc
    }, {})

  const uploadsDir = path.join(path.resolve('./'), CONFIG.UPLOADS_PATH)
  const directories = readdirSync(uploadsDir, { withFileTypes: true })
  directories.forEach(directory => {
    if (directory.isDirectory()) {
      if (photosByKeys[directory.name]) {
        cleanDirectory(path.join(uploadsDir, directory.name), photosByKeys[directory.name])
      } else {
        rimraf.sync(path.join(uploadsDir, directory.name))
        // eslint-disable-next-line no-console
        console.log(`removed ${directory.name}/`)
      }
    }
  })
}

cleanUploads()
  .catch(console.error)
  .finally(() => process.exit())
