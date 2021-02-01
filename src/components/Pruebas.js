import React, {Component} from 'react';
import MiComponente from './MiComponente';

class Pruebas extends Component{

    contador = 0;

    state = {
        contador: 0
    };

    /*
    constructor(props){
        super(props);
        this.state ={
            contador: 0
        };
    }
    */

    sumar = () =>{
        //this.contador+=1;
        
        this.setState({
            contador: (this.state.contador+1)
        });
        
    }

    restar = () =>{
        //this.contador-=1;
        
        this.setState({
            contador: (this.state.contador-1)
        });
        
    }

    render(){
        
        return(
            <section id="content">
          
                <h2 className="subheader">Sección de Pruebas</h2>



                <MiComponente />


                <h2 className="subheader">Estado</h2>
                <p>
                    Contado: {this.state.contador}
                </p>
                <input type="button" value="Sumar" onClick={this.sumar}></input>
                <input type="button" value="Restar" onClick={this.restar}></input>
            </section>
        );
    }

}

export default Pruebas;