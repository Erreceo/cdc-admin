import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import InputCustomizado from './components/InputCustomizado';
import InputSubmit from './components/InputSubmit';
import HttpService from './service/HttpService';
import Autor from './model/Autor';

class App extends Component {

  constructor (){
    super();
    this.state = {lista:[], nome:"", email: "", senha:""};
    this.setEmail = this.setEmail.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.enviaForm = this.enviaForm.bind(this);
    //this.url = 'http://localhost:8080/api/autores';
    this.url = "https://cdc-react.herokuapp.com/api/autores";
    this.service = new HttpService();
  }

  componentDidMount(){
    this.service.get( this.url ) 
      .then( jsonData => this.setState({ lista: jsonData }) );
  }

  enviaForm( evento ){
    evento.preventDefault();
    this.service.post(this.url, {nome:this.state.nome, email:this.state.email, senha:this.state.senha})
          .then(jsonData => this.setState({lista: jsonData}));
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
 
  render() {
    return (
      <div id="layout">
        {/* Menu toggle */}
        <a href="#menu" id="menuLink" className="menu-link">
          {/* Hamburger icon */}
          <span />
        </a>
        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>
            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>
        <div id="main">
          <div className="header">
            <h1>Cadastro de autores</h1>
          </div>
          <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned"  onSubmit={this.enviaForm} method="post">
                  <InputCustomizado label="Nome" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}/>
                  <InputCustomizado label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                  <InputCustomizado label="Senha" id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}/>
                  <InputSubmit type="submit" label="Gravar"/>
                </form>             
              </div>  
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
                          this.state.lista.map((autor)=>{
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
            </div>
        </div>
      </div>
    );
  }
}

export default App;
