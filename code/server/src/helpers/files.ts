import crypto from 'crypto'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'
import dotenv from 'dotenv'

import { RequestImage } from 'serverSrc/actions/types'

dotenv.config()

export const PROFILE_DIR = 'profile'
export const HOUSEHOLD_DIR = 'household'
const UPLOAD_DIR = process.env.UPLOAD_PATH ?? 'uploads'

export const uploadFiles = (
  files: RequestImage[],
  directory: string,
  userFsKey: string
): Array<string | null> => {
  const uploadedFiles: Array<string | null> = []

  files.forEach(file => {
    if (isImageUrl(file)) {
      uploadedFiles.push(file)
      return
    }

    const fileHash = file.data.split(';base64,').pop()

    const filePath = path.join(path.resolve('./'), UPLOAD_DIR, userFsKey, directory)
    mkdirSync(filePath, { recursive: true })

    const fileExtension = file.type.substring(file.type.indexOf('/') + 1)
    let fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`
    let attempts = 5
    while (existsSync(path.join(filePath, fileName)) && attempts > 0) {
      fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`
      --attempts
    }

    if (attempts === 0) {
      uploadedFiles.push(null)
    } else {
      writeFileSync(path.join(filePath, fileName), fileHash, { encoding: 'base64' })
      uploadedFiles.push(`/${UPLOAD_DIR}/${userFsKey}/${directory}/${fileName}`)
    }
  })
  return uploadedFiles
}

export const isImageUrl = (image: RequestImage): image is string =>
  typeof image === 'string'

export const isLocalImage = (image: RequestImage, userFsKey: string): boolean =>
  isImageUrl(image)
  && image.startsWith(`/${UPLOAD_DIR}/${userFsKey}/`)
  && image.length < 140

export const isExternalImage = (image: RequestImage): boolean =>
  isImageUrl(image)
  && !!image.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
  && image.length < 140

