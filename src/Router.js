import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import MiComponente from './components/MiComponente';
import Error from './components/Error';
import Header from './components/Header';
import Home from './components/Home';
import Blog from './components/Blog';
import Peliculas from './components/Peliculas';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>

                <Header />
                

                {/*Configurar rutas y paginas (importar el react-router-dom)*/}


                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/home" component={Home}></Route>
                        <Route exact path="/blog" component={Blog}></Route>
                        
                        <Route exact path="/blog/articulo/:id" component={Article}></Route>
                        <Route exact path="/blog/crear" component={CreateArticle}></Route>
                        <Route exact path="/blog/editar/:id" component={EditArticle}></Route>

                        <Route exact path="/blog/busqueda/:search" component={Search}></Route>

                        <Route exact path="/redirect/:search" render={(props)=>{
                            var search = props.match.params.search;
                            return(<Redirect to={'/blog/busqueda/'+search}></Redirect>);
                        }}></Route>

                        <Route exact path="/formulario" component={Formulario}></Route>
                        <Route exact path="/peliculas" component={Peliculas}></Route>
                        <Route exact path="/ruta-componente" component={MiComponente}></Route>

                        <Route exact path="/pagina-1" render={() => (
                            <React.Fragment>
                                <section id="content">
                                    <h2 className="subheader">Pagina #1</h2>
                                    <p>Soy la pagina #1.</p>
                                </section>
                            </React.Fragment>

                        )} />

                        <Route exact path="/pruebas/:nombre/:apellidos?" render={(props) => {
                            let nombre = props.match.params.nombre;
                            let apellidos = props.match.params.apellidos;
                            return (
                                <React.Fragment>
                                    <section id="content">
                                        <h2 className="subheader">Pagina De pruebas</h2>
                                        <p>Soy la pag de pruebas con nombre: {nombre}  {apellidos}</p>
                                    </section>
                                </React.Fragment>
                            );
                        }} />

                        <Route component={Error}></Route>

                    </Switch>

                    <div className="clearfix"></div>


            </BrowserRouter>
        );
    }
}
export default Router;