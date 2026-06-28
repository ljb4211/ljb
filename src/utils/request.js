import axios from 'axios'
import { ElMessage } from 'element-plus'

//创建axios实例
const service = axios.create({
  baseURL: '/api',//请求前缀
  timeout: 5000,//请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, config } = response
    if (data.code === '200') {
      return data.data
    } else {
      if (data.code === '-1') {
        ElMessage.error(data.msg || '登录过期，请重新登录')
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        if (!config.url?.includes('/login')) {
          window.location.href = '/auth/login'
        }
      } else {
        ElMessage.error(data.msg || '请求失败')
      }
      return Promise.reject(data.msg || '请求失败')
    }
  },
  (error) => {
    ElMessage.error('网络请求失败，请检查网络连接')
    return Promise.reject(error)
  }
)
export default service
