import http from "@/config/request"

/** 首页获取网站config */
export const homeGetConfig = () => {
  return new Promise((resolve, reject) => {
    http.get("/api/config", {}).then(res => {
      resolve(res)
    })
  })
}

/** 增加网站访问量 */
export const addView = () => {
  return new Promise((resolve, reject) => {
    http.put("/api/config/addView", {}).then(res => {
      resolve(res)
    })
  })
}
