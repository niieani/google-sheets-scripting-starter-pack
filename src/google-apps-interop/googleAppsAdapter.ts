import buildFullPath from 'axios/lib/core/buildFullPath'
import buildURL from 'axios/lib/helpers/buildURL'
import type { AxiosRequestConfig, AxiosPromise } from 'axios'

/**
 * We can't use the default 'axios/lib/adapters' because they're for Node
 * and Browsers, but we're running in a Google Apps Script engine, and the function
 * "fetch" doesn't exist.
 * This is an attempt to create a crude "fetch" adapter for 'axios', which is
 * used by 'jira.js'.
 */
export function googleAppsAdapter(
  config: AxiosRequestConfig,
): AxiosPromise<any> {
  return new Promise(function (resolve, reject) {
    try {
      const fullPath = buildFullPath(config.baseURL, config.url)
      const request = UrlFetchApp.fetch(
        buildURL(fullPath, config.params, config.paramsSerializer),
        {
          headers: config.headers,
          method: (config.method ?? 'get').toLowerCase() as 'get' | 'post',
          payload: config.data,
        },
      )
      const status = request.getResponseCode()
      const headers = request.getAllHeaders()

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
