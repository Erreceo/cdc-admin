import PubSub from 'pubsub-js';

export default class TratadorErros {
    publicaErros(erros){
        erros.then(err => {
            for ( let i = 0; i < err.errors.length; i++ ) {
                let erro = err.errors[i];
                PubSub.publish('erro-validacao', erro);
            }
        });
    }    
}