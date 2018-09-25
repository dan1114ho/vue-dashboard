import axios from 'axios'


let baseUrl = 'https://rw3gl2g6ff.execute-api.us-east-1.amazonaws.com/dev';
let convertObjectToFormData = (items) => {
  const formData = new FormData();
  for (let key in items) {
    formData.append(key, items[key])
  }
  return formData
}

let convertObjectToUrlData = (items) => {
  const params = new URLSearchParams();
  for (let key in items) {
    if (items[key]) {
      params.append(key, items[key])
    }
  }
  return params
}

let config = {
  address: baseUrl,
  port: '',
  basePath: '',
  axiosConfig: {
    baseURL: baseUrl,
    headers: {},
    withCredentials: false,
    crossDomain: true,
  },
  getEndpointUrl () {
    return this.address + (this.basePath ? this.basePath : '')
  }
}

let setConfig = () => {
  if (localStorage.getItem('sessionTokens') || sessionStorage.getItem('sessionTokens')) {
    const tokenInfo = JSON.parse(localStorage.getItem('sessionTokens') || sessionStorage.getItem('sessionTokens'))
    config.axiosConfig.headers['authorization'] = 'Bearer ' +  tokenInfo['IdToken']['jwtToken'];
  }
}

setConfig()
let $http = axios.create(config.axiosConfig)


let sendPostForm = (url, payload, headers = null) => {
  setConfig()
  $http = axios.create(config.axiosConfig)
  return new Promise((resolve, reject) => {
    $http.post(url, convertObjectToFormData(payload))
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendPost = (url, payload, headers = null) => {
  setConfig()
  $http = axios.create(config.axiosConfig)
  return new Promise((resolve, reject) => {
    $http.post(url, payload)
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendPatchForm = (url, payload, headers = null) => {
  setConfig()
  $http = axios.create(config.axiosConfig)

  return new Promise((resolve, reject) => {
    $http.patch(url, convertObjectToUrlData(payload), headers)
      .then((handleSuccess) => {
        resolve(handleSuccess.data)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendPatch = (url, payload, headers = null) => {
  setConfig()
  let $http = axios.create(config.axiosConfig)

  return new Promise((resolve, reject) => {
    $http.patch(url, payload, headers)
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendPut = (url, payload, headers = null) => {
  setConfig()
  $http = axios.create(config.axiosConfig)

  return new Promise((resolve, reject) => {
    $http.put(url, payload, headers)
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendGet = (url, headers = null) => {
  let pageCount = null
  setConfig()
  console.log(config);
  $http = axios.create(config.axiosConfig)
  return new Promise((resolve, reject) => {
    $http.get(url, config.axiosConfig)
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

// let sendDelete = (url, payload, headers = null) => {
//   return new Promise((resolve, reject) => {
//     $http.delete(url, payload, headers)
//       .then((handleSuccess) => {
//         resolve(handleSuccess)
//       })
//       .catch((handleError) => {
//         reject(handleError)
//       })
//   })
// }

export default config

export { config }

export { setConfig }

export { sendPost }

export { sendPostForm }

export { sendGet }

export { sendPatch }

export { sendPut }

export { sendPatchForm }

// export { sendDelete }
