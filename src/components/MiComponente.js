import React, {Component} from 'react';

class MiComponente extends Component{

    render(){
        let receta = {
            nombre:'Pizza',
            ingredientes: ['Tomate', 'Queso','Masa','Jamon'],
            calorias: 400
        };
        return(
            <div>
                <h2 className="subheader">Mi Componente</h2>

                <h1>{'Receta: '+receta.nombre}</h1>
                <h2>{'Calorias: '+ receta.calorias}</h2>
                <ol>
                    {
                        receta.ingredientes.map(
                            (ingrediente,i)=>{
                                console.log(ingrediente);
                                return (<li key={i}>{ingrediente}</li>)
                            }
                        )
                    }
                </ol>
                <hr/>
            </div>
        );
    }

}

export default MiComponente;