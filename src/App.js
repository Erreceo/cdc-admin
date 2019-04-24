import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import InputCustomizado from './components/InputCustomizado';
import InputSubmit from './components/InputSubmit'

class App extends Component {

  constructor (){
    super();
    this.state = {lista:[], nome:"", email: "", senha:""};
    this.setEmail = this.setEmail.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.enviaForm = this.enviaForm.bind(this);
  }

  componentDidMount(){
    const that = this;  

    //let url = "https://cdc-react.herokuapp.com/api/autores";
    let url = 'http://localhost:8080/api/autores';

    fetch(url)
      .then( response => response.text() )
      .then(jsonData => that.setState({ lista: JSON.parse(jsonData) }));

  }

  enviaForm( evento ){
    evento.preventDefault();
    
    console.log('envia Form');


    fetch('http://localhost:8080/api/autores', {
      method : 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha})
    }).then( response => response.text())
      .then(response => this.setState({lista: JSON.parse(response)}))
    .catch(err => console.log(err));
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
                  {/* <div className="pure-control-group">
                    <label htmlFor="nome">Nome</label> 
                    <input id="nome" type="text" name="nome"   value={this.state.nome} onChange={this.setNome}/>                  
                  </div> */}
                  {/* <div className="pure-control-group">
                    <label htmlFor="email">Email</label> 
                    <input id="email" type="email" name="email"   value={this.state.email} onChange={this.setEmail}/>                  
                  </div> */}
                  {/* <div className="pure-control-group">
                    <label htmlFor="senha">Senha</label> 
                    <input id="senha" type="password" name="senha"  value={this.state.senha} onChange={this.setSenha}/>                                      
                  </div> */}
                  {/* <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                  </div> */}
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
