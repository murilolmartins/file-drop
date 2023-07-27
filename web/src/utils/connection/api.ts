import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({})

const ERROR_CONNECTION = 'Error connecting to the server'
const ERROR_ACCESS_DANIED = 'Access denied'

enum MethodEnum {
  DELETE = 'delete',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
}

export type MethodType = 'get' | 'delete' | 'post' | 'put' | 'patch'

export default class ConnectionAPI {
  static async call<T, B = unknown>(
    url: string,
    method: MethodType,
    body?: B,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    switch (method) {
      case MethodEnum.DELETE:
      case MethodEnum.GET:
        return (await api[method]<T>(url, config)).data
      case MethodEnum.POST:
      case MethodEnum.PUT:
      case MethodEnum.PATCH:
      default:
        return (await api[method]<T>(url, body, config)).data
    }
  }

  static async connect<T, B = unknown>(
    url: string,
    method: MethodType,
    body?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.call<T>(url, method, body, config).catch((error) => {
      console.log(error)
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            throw new Error(ERROR_ACCESS_DANIED)
          default:
            throw new Error(ERROR_CONNECTION)
        }
      }
      throw new Error(ERROR_CONNECTION)
    })
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.GET)
}

export const connectionAPIPut = async <T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.PUT, body, config)
}
