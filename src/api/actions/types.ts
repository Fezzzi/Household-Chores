export interface RequestRawImage {
  data: string
  type: string
  name: string
  size: number
}

export type RequestImage = RequestRawImage | string
