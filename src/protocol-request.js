export default class ProtocolRequest {

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    buildUrl(components, query) {
        let url = this.baseUrl
        if (!url.endsWith('/')) url += '/'

        // Join array of URL components into the path
        let pathString = components
            .filter(i => i)
            .map(encodeURIComponent)
            .join('/')

        // Create the querystring
        let queryComponents = []
        if (query) for (let i in query) {
            if (!i || !query[i]) continue

            let key = encodeURIComponent(i)
            let value = encodeURIComponent(query[i])
            queryComponents.push(key + '=' + value)
        }
        let queryString = queryComponents.join("&")
        if (queryString) queryString = '?' + queryString

        return (url + pathString + queryString)
    }

    async send(url) {
        console.log('Send', url)

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.onload = e => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //console.log(xhr.responseText)
                        resolve(xhr.responseXML)
                    }
                    else {
                        //console.error(xhr.statusText)
                        reject(xhr.statusText)
                    }
                }
            }

            xhr.onerror = e => {
                //console.error(xhr.statusText)
                reject(xhr.statusText)
            }

            xhr.send(null)
        })
    }

}