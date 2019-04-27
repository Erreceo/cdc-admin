import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class SelectComponent extends Component{

    constructor() {
        super();
        this.state = {msgErro:''};
    }
    
    render(){
        return (
            <div className="pure-control-group">
                <label htmlFor="nome">{this.props.label}</label> 
                <select value={ this.props.autorId } name={this.props.name} onChange={ this.props.onChange }>
                    <option value="">{this.props.primeira_opcao}</option>
                    { 
                        this.props.autores.map(function(autor) {
                        return <option key={ autor.id } value={ autor.id }>
                                    { autor.nome }
                                </option>;
                        })
                    }
                </select>
                <span className='error'>{this.state.msgErro}</span>
            </div>
        )
    }

    componentDidMount(){
        PubSub.subscribe('erro-validacao', (topico, erro) => {
            
            if (erro.field === this.props.name)
            this.setState({msgErro: erro.defaultMessage})
        });
        PubSub.subscribe('limpa-erros', (topico) => this.setState({msgErro: ''}));
    }
}