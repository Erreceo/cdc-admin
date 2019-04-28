import React, { Component } from 'react';
import HttpService from '../service/HttpService';
import InputCustomizado from './InputCustomizado';
import InputSubmit from './InputSubmit';
import PubSub from 'pubsub-js';
import SelectComponent from './SelectComponent';


class FormularioLivro extends Component{

    constructor(){
        super();
        this.state = {titulo: '', preco: '', autorId: '', autores: []};
    
        //this.url = 'http://localhost:8080/api/livros';
        this.url = "https://cdc-react.herokuapp.com/api/livros";
        //this.url_autores = 'http://localhost:8080/api/autores';
        this.url_autores = 'https://cdc-react.herokuapp.com/api/autores';
        this.service = new HttpService();
        this.enviaForm = this.enviaForm.bind(this);
    }
    
    salvaAlteracao(nomeImput, event){
      this.setState({[nomeImput]: event.target.value});
    }

    /**
     * autorId
     * name
     * onchange
     * primeira_opcao
     * lista_autores
     */

    componentDidMount(){
        const that = this;

        this.service.get( this.url_autores ) 
          .then( jsonData => that.setState({ autores: jsonData }) );

    }

    render(){
        return (<div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned"  onSubmit={this.enviaForm} method="post">
          <InputCustomizado label="Titulo" id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this, 'titulo')}/>
          <InputCustomizado label="Pre&ccedil;o" id="preco" type="number" step="any" name="preco" value={this.state.preco} onChange={this.salvaAlteracao.bind(this, 'preco')}/>
          <SelectComponent label="Autor" autorId={this.state.autorId} name="autorId" primeira_opcao="Selecione" autores={this.state.autores} onChange={this.salvaAlteracao.bind(this, 'autorId')} />
          <InputSubmit type="submit" label="Gravar"/>
        </form>             
      </div>)
    }

    enviaForm(event){
        event.preventDefault();
        PubSub.publish('limpa-erros');
        this.service.post(this.url, {titulo:this.state.titulo, preco:this.state.preco, autorId:this.state.autorId})
                .then(jsonData => {
                    if ( jsonData ) 
                        PubSub.publish('atualiza-lista-livros', jsonData);
                        this.setState({titulo:'', preco:'', autorId:''});
                    })
                .catch(error => console.log(error))

    }   

}

class TabelaLivros extends Component{
    render(){
        return (
         
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Titulo</th>
                      <th>Valor</th>
                      <th>Autor</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          
                        this.props.listaLivros.reverse()
                          .map((livro)=>{
                            return (
                              <tr key={livro.id}>
                                <td>
                                  {livro.titulo}
                                </td>
                                <td>
                                  {livro.preco}
                                </td>
                                <td>
                                  {livro.autor.nome}
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

export default class LivroBox extends Component{

    constructor() {
        super();
        this.state = {listaLivros: []};
        this.service = new HttpService();
        this.url = "https://cdc-react.herokuapp.com/api/livros";
        //this.url = 'http://localhost:8080/api/livros';
    }
    componentDidMount(){
        const that = this;

        this.service.get( this.url ) 
          .then( jsonData => this.setState({listaLivros: jsonData}));

        PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) => that.setState({listaLivros:novaLista}));
    }

        
    render() {

        return (
            <div>
              <div className="header">
                <h1>Cadastro de Livros</h1>
              </div>
              <div className="content" id="content">
                <FormularioLivro/>
                <TabelaLivros listaLivros={this.state.listaLivros}/>    
              </div>  
            </div>
        );
    }
    
}    
