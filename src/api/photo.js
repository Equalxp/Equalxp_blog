import http from "@/config/request"

/** 分页获取相册 */
export const getAlbumList = param => {
  return new Promise((resolve, reject) => {
    http.post("/api/photoAlbum", param).then(res => {
      resolve(res)
    })
  })
}

/** 获取相册内的图片 */
export const getPhotosByAlbumId = param => {
  return new Promise((resolve, reject) => {
    http.post("/api/photo/getPhotoListByAlbumId", param).then(res => {
      resolve(res)
    })
  })
}