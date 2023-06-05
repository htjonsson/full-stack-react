export const HttpGet = (url) => {
    console.log("HttpGet");

    const data = {};
    const error = {};
    const status = {};

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => {
            this.status = response.status;

            return response.json()
        })
        .then(data => {
            data = data;
        })
        .catch(error => {
            error = error;   
        })
        .finally(() => {
        });

    return { data, error, status };
}