import axios from "axios"
import { BASE_URL, TIMEOUT } from "./config"

class HYRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
    })

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request(config) {
    return this.instance.request(config)
  }

  get(config) {
    return this.request({ ...config, methods: "get" })
  }
  post(config) {
    return this.request({ ...config, methods: "post" })
  }
}

// 老师课上讲的方法，有警告
// export default new HYRequest(BASE_URL, TIMEOUT)
// gpt建议改成：
const hyRequest = new HYRequest(BASE_URL, TIMEOUT)
export default hyRequest
