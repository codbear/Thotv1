class Ajax {

    constructor(url, userOptions = {}) {
        this.xhr = new XMLHttpRequest();
        this.url = url;
        this.options = Object.assign({}, {
            method: 'GET',
            async: true
        }, userOptions)
    }

    setUrl(url) {
        if (url) {
            this.url = url;
        }
    }

    setMethod(method) {
        method = method.toUpperCase();
        const authoMethods = ['GET', 'POST', 'PUT', 'DELETE'];
        if (authoMethods.includes(method)) {
            this.options.method = method;
        }
    }

    setParams(params) {
        for (let param in params) {
            if (this.url.indexOf('?') !== -1) {
                this.url += '&';
            } else {
                this.url += '?';
            }
            this.url += encodeURIComponent(param) + '=' + encodeURIComponent(params[param]);
        }
    }

    setPostDatas(postDatas, isJson = false) {
        if (!postDatas) {
            return
        }
        if (isJson) {
            this.postJsonDatas = JSON.stringify(postDatas);
        } else {
            this.postDatas = new FormData(postDatas);
        }
    }

    execute(onSuccess, onError = () => {
    }) {
        if (!this.url) {
            return;
        }
        this.xhr.open(this.options.method, this.url, this.options.async);
        if (this.postJsonDatas) this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status >= 400) {
                return onError(this.status, this.statusText);
            }
            if (this.status === 0) {
                if (this.statusText === 'abort' || this.statusText === 'aborted' || this.statusText === '') {
                    return onError(this.status, 'aborted');
                }
                return onError(this.status, 'offline');
            }
            if (this.status === 200 || this.status === 201) {
                const parsedDatas = JSON.parse(this.responseText);
                return onSuccess(parsedDatas);
            }
            if (this.status === 204) {
                return onSuccess();
            }
        }
        if (this.options.method === 'POST' || this.options.method === 'PUT') {
            if (this.postJsonDatas) {
                this.xhr.send(this.postJsonDatas);
            } else {
                this.xhr.send(this.postDatas);
            }
        } else {
            this.xhr.send();
        }
    }
}

export default Ajax;