import buildFullPath from 'axios/lib/core/buildFullPath'
import buildURL from 'axios/lib/helpers/buildURL'
import type { AxiosPromise, InternalAxiosRequestConfig } from 'axios'

/**
 * We can't use the default 'axios/lib/adapters' because they're for Node
 * and Browsers, but we're running in a Google Apps Script engine, and the function
 * "fetch" doesn't exist.
 * This is an attempt to create a crude "fetch" adapter for 'axios', which is
 * used by 'jira.js'.
 */
export function googleAppsAdapter(
  config: InternalAxiosRequestConfig,
): AxiosPromise<any> {
  return new Promise((resolve, reject) => {
    try {
      const fullPath = buildFullPath(config.baseURL, config.url)
      const fullUrl = buildURL(fullPath, config.params, config.paramsSerializer)

      Logger.log(`Requesting: ${config.method ?? 'get'} ${fullUrl}`)

      const request = UrlFetchApp.fetch(fullUrl, {
        headers: config.headers.toJSON(true) as Record<string, string>,
        method: (config.method ?? 'get').toLowerCase() as 'get' | 'post',
        payload: config.data,
      })
      const status = request.getResponseCode()
      const headers = request.getAllHeaders()

      Logger.log(`Request status: ${status}`)

      const data =
        !config.responseType || config.responseType === 'text'
          ? request.getContentText()
          : config.responseType === 'json'
          ? JSON.parse(request.getContentText())
          : config.responseType === 'blob'
          ? request.getBlob()
          : request

      resolve({
        data,
        status,
        statusText: String(status),
        headers,
        config,
        request,
      })
    } catch (e) {
      reject(e)
    }

    // From here:
    //  - response transformers will run
    //  - response interceptors will run
  })
}
