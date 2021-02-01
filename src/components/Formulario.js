import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    apellidosRef = React.createRef();
    hombreRef = React.createRef();
    mujerRef = React.createRef();
    otroRef = React.createRef();

    state ={
        user: {}
    }

    recibirFormulario=(e)=>{
        e.preventDefault();

        var genero = this.otroRef.current.value;

        if(this.hombreRef.current.checked){
            genero = this.hombreRef.current.value;
        }else if(this.mujerRef.current.checked){
            genero = this.mujerRef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        };
        this.setState({user:user});
        //console.log(user);
    }

    render() {
        if(this.state.user.nombre){
            var user = this.state.user;
        }
        return (
            <React.Fragment>
                <Slider title="Formulario" size="slider-small"/>
                <div className="center">
                    <section id="content">

                        <h2 className="subheader">Formulario</h2>

                        {/**Mostrar datos formulario */}
                        {
                            this.state.user.nombre && (
                                <div>
                                    <p>Nombre: <strong>{user.nombre}</strong></p>
                                    <p>Apellidos: <strong>{user.apellidos}</strong></p>
                                    <p>Biografia: <strong>{user.bio}</strong></p>
                                    <p>Genero: <strong>{user.genero}</strong></p>
                                </div>
                            )
                        }

                        
                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>
                            <div className="form-group radiobuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.hombreRef}/> Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.mujerRef}/> Mujer
                                <input type="radio" name="genero" value="otro" ref={this.otroRef}/> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success"/>
                        </form>

                    </section>
                </div>
                <Sidebar/>
            </React.Fragment>
        );
    }
}
export default Formulario;