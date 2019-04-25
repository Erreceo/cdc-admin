import React, { Component } from 'react';
import HttpService from '../service/HttpService';
import InputCustomizado from './InputCustomizado';
import InputSubmit from './InputSubmit';
import PubSub from 'pubsub-js';


class FormularioAutor extends Component{

    constructor (){
        super();
        this.state = {nome:"", email: "", senha:""};
        this.setEmail = this.setEmail.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
        //this.url = 'http://localhost:8080/api/autores';
        this.url = "https://cdc-react.herokuapp.com/api/autores";
        this.service = new HttpService();
    }

    render(){
        return (<div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned"  onSubmit={this.enviaForm} method="post">
          <InputCustomizado label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}/>
          <InputCustomizado label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
          <InputCustomizado label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}/>
          <InputSubmit type="submit" label="Gravar"/>
        </form>             
      </div>)
    }

    enviaForm( evento ){
        evento.preventDefault();
        PubSub.publish('limpa-erros');
        this.service.post(this.url, {nome:this.state.nome, email:this.state.email, senha:this.state.senha})
                .then(jsonData => {
                    if ( jsonData ) 
                        PubSub.publish('atualiza-lista-autores', jsonData);
                        this.setState({nome:'', email:'', senha:''});
                    })
                .catch(error => console.log(error))
                
      }
    
      setNome(event){
        this.setState({nome:event.target.value});
      }
    
      setEmail(event){
        this.setState({email:event.target.value});
      }
    
      setSenha(event){
        this.setState({senha:event.target.value});
      }

}

class TabelaAutores extends Component {


    render(){
        return (
         
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          
                        this.props.lista.reverse()
                          .map((autor)=>{
                            return (
                              <tr key={autor.id}>
                                <td>
                                  {autor.nome}
                                </td>
                                <td>
                                  {autor.email}
                                </td>
                              </tr>
                            )
                          })
                      }
                  </tbody>
                </table> 
              </div>

        )
    }
}

export default class AutorBox extends Component {

    constructor (){
        super();
        this.state = {lista:[]};
        this.service = new HttpService();
        this.service = this.service;
        this.url = "https://cdc-react.herokuapp.com/api/autores";
        //this.url = 'http://localhost:8080/api/autores';
    }
    
    componentDidMount(){
        const that = this;

        this.service.get( this.url ) 
          .then( jsonData => that.setState({ lista: jsonData }) );

          PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => this.setState({lista:novaLista}));
    }
    
    render() {

        return (
            <div>
              <div className="header">
                <h1>Cadastro de Autor</h1>
              </div>
              <div className="content" id="content">
                <FormularioAutor/>
                <TabelaAutores lista={this.state.lista}/>    
              </div>  
            </div>
        );
    }

}