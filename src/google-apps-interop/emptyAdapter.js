/** @typedef {import("axios").AxiosRequestConfig} AxiosRequestConfig */
/** @type {(config: AxiosRequestConfig) => any} */

module.exports = function myAdapter(config) {
  return new Promise(function (resolve, reject) {
    var response = {
      data: null,
      status: 599,
      statusText: 'You need to setup custom axios adapter for Google Apps',
      headers: {},
      config: config,
      request: {},
    }

    reject(response)

    // From here:
    //  - response transformers will run
    //  - response interceptors will run
  })
}
