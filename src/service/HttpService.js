
import TratadorErros from './TratadorErros';
export default class HttpService{

    get(url){
        return fetch(url)
                .then( response => response.json());
    }

    post(url, body){
       return fetch(url, {
                    method : 'post',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(body)
            }).then( response => this._handleErrors(response))
            .then( response => response.json() )
            .catch(err => {
                throw new Error(undefined);
            });
    }

    _handleErrors( response  ){
        if ( !response.ok ){
            if (response.status === 400){
                new TratadorErros().publicaErros(response.json().then(message =>  message ));
            }
            throw Error(response);
        }
        return response;
    }
}