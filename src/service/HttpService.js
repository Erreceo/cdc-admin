export default class HttpService{

    get(url){
        return fetch(url)
                .then( response => {
                    return response.json() 
                });
    }

    post(url, body){
       return fetch(url, {
                    method : 'post',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(body)
            }).then( response => response.json() );
    }
}