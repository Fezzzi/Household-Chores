import { Response } from 'express'
import crypto from 'crypto'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

import { RequestImage } from 'api/actions/types'
import { CONFIG } from 'api/constants'
import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import FileUploadingError from 'api/helpers/errors/FileUploadingError'

export const PROFILE_DIR = 'profile'
export const HOUSEHOLD_DIR = 'household'

/**
 * Helper function that takes uploaded RequestImage and stores it under user's file system key directory on disk.
 */
export const uploadFiles = (
  files: Array<RequestImage | undefined>,
  directory: string,
  userFsKey: string,
  res: Response,
): Array<string | undefined> => {
  const uploadedFiles: Array<string | undefined> = []

  files.forEach(file => {
    if (file === undefined || isImageUrl(file)) {
      uploadedFiles.push(file)
      return
    }

    const fileHash = file.data.split(';base64,').pop()

    const filePath = path.join(path.resolve('./'), CONFIG.UPLOADS_PATH, userFsKey, directory)
    mkdirSync(filePath, { recursive: true })

    const fileExtension = file.type.substring(file.type.indexOf('/') + 1)
    let fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`
    let attempts = 5
    while (existsSync(path.join(filePath, fileName)) && attempts > 0) {
      fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`
      --attempts
    }

    if (attempts === 0 || fileHash === undefined) {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
      throw new FileUploadingError(`Uploading file ${fileName} failed`)
    } else {
      writeFileSync(path.join(filePath, fileName), fileHash, { encoding: 'base64' })
      uploadedFiles.push(`/${CONFIG.UPLOADS_PATH}/${userFsKey}/${directory}/${fileName}`)
    }
  })
  return uploadedFiles
}

export const isImageUrl = (image: RequestImage): image is string =>
  typeof image === 'string'

export const isLocalImage = (image: RequestImage, userFsKey: string): boolean =>
  isImageUrl(image)
  && image.startsWith(`/${CONFIG.UPLOADS_PATH}/${userFsKey}/`)
  && image.length < 140

export const isExternalImage = (image: RequestImage): boolean =>
  isImageUrl(image)
  && !!image.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
  && image.length < 140

