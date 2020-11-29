import path from 'path'
import { readdirSync, unlink } from 'fs'
import dotenv from 'dotenv'
import rimraf from 'rimraf'

import { database } from 'serverSrc/database'
import {
  tUsersName, tUsersCols, tHouseMemName, tHouseMemCols, tHouseholdsName, tHouseholdsCols,
} from 'serverSrc/database/models/tables'

dotenv.config()
const UPLOAD_DIR = process.env.UPLOAD_PATH || 'uploads'

const getFiles = dir => {
  const dirents = readdirSync(dir, { withFileTypes: true })
  const files = dirents.map(dirent => {
    const fileOrDir = path.join(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(fileOrDir) : fileOrDir
  })
  return Array.prototype.concat(...files)
}

const cleanDirectory = (dirPath, files) =>
  getFiles(dirPath)
    .filter(storedFile => files.indexOf(storedFile) === -1)
    // eslint-disable-next-line no-console
    .forEach(unusedFile => unlink(unusedFile, () => console.log(`unlinked ${unusedFile}`)))

const cleanUploads = async () => {
  const userResults = await database.query(`
    SELECT ${tUsersCols.photo} FROM ${tUsersName} WHERE ${tUsersCols.photo} IS NOT NULL
  `, [], false)

  const membershipResults = await database.query(`
    SELECT ${tHouseMemCols.photo} FROM ${tHouseMemName} WHERE ${tHouseMemCols.photo} IS NOT NULL
  `, [], false)

  const householdResults = await database.query(`
    SELECT ${tHouseholdsCols.photo} FROM ${tHouseholdsName} WHERE ${tHouseholdsCols.photo} IS NOT NULL
  `, [], false)

  const photosByKeys = [...userResults, ...membershipResults, ...householdResults].reduce((acc, result) => {
    const parts = result.photo.split('/')
    const fsKey = parts[2]
    const file = path.join(path.resolve('./'), UPLOAD_DIR, fsKey, parts[3], parts[4])
    if (acc[fsKey]) {
      acc[fsKey].push(file)
    } else {
      acc[fsKey] = [file]
    }
    return acc
  }, {})

  const uploadsDir = path.join(path.resolve('./'), UPLOAD_DIR)
  const directories = readdirSync(uploadsDir, { withFileTypes: true })
  directories.forEach(directory => {
    if (directory.isDirectory()) {
      if (photosByKeys[directory.name]) {
        cleanDirectory(path.join(uploadsDir, directory.name), photosByKeys[directory.name])
      } else {
        // eslint-disable-next-line no-console
        rimraf(path.join(uploadsDir, directory.name), [], () => console.log(`removed ${directory.name}/`))
      }
    }
  })
}

cleanUploads()
  .then(() => process.exit())
  .catch(err => {
    console.error(err)
    process.exit()
  })