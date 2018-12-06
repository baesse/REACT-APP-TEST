const TIMEOUT = 1000
export const request = ({ url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'} }) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      console.log(xhr)
      xhr.timeout = TIMEOUT
  
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })
      console.log(url)
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            let response = xhr.response
            console.log(response)
            if (response) response = JSON.parse(response)
            resolve(response, xhr)
          } catch (error) {
            reject(xhr)
          }
        } else reject(xhr)
      }
  
      xhr.onerror = xhr.onabort = xhr.ontimeout = () => reject(xhr)
      xhr.send(body ? JSON.stringify(body) : null)
    })
  }