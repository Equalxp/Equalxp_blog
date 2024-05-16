import http from "@/config/request"

/** 获取所有相册 */
export const getAllAlbum = () => {
  return new Promise((resolve, reject) => {
    http.get("/api/photoAlbum/getAllAlbumList", {}).then(res => {
      resolve(res)
    })
  })
}

/** 根据id获取对应相册内所有图片 */
export const getAllPhotosByAlbumId = id => {
  return new Promise((resolve, reject) => {
    http.get(`/api/photo/getAllPhotosByAlbumId/${id}`, {}).then(res => {
      resolve(res)
    })
  })
}