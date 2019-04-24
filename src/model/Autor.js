export default class Autor{
    constructor(_nome, _email, _senha){
        this.nome = _nome;
        this.email = _email;
        this.senha = _senha;

        Object.freeze(this);
    }

    get nome(){
        return this.nome;
    }

    get email(){
        return this.email;
    }

    get senha(){
        return this.senha;
    }

    set nome(_nome){
        this.nome = _nome;
    }

    set email(_email){
        this.email = _email;
    }

    set senha(_senha){
        this.senha = _senha;
    }
}