import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Sidebar from './Sidebar';
import Slider from './Slider';

class Peliculas extends Component {

    state = {};

    cambiarTitulo = () => {
        var { peliculas } = this.state;
        peliculas[3].titulo = "Jonh Wick 3"
        this.setState({
            peliculas
        });
    }

    favorita = (pelicula, indice) => {
        console.log("Fav");
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        });
    }

    componentWillMount() {
        this.setState({
            peliculas: [
                { titulo: "Spiderman 4", image: 'https://media.revistagq.com/photos/5d5d19b10ef2260008f5cdb7/master/pass/mejor%20spider-man%20pelicula%20sony%20marvel.jpg' },
                { titulo: "Avengers", image: 'https://cnet1.cbsistatic.com/img/l-xJp5JmvfZUGTVlfJ7O-wVVRTI=/940x0/2019/03/14/70b49c1d-0d3b-4b75-9225-b898b83cdc9a/avengers-endgame-poster-og-social-crop.jpg' },
                { titulo: "Soul", image: 'https://shopdisneyeu.scene7.com/is/image/DisneyStoreES/34843_Q121_Soul_tb?$tb$' },
                { titulo: "Jonh Wick", image: 'https://media.gq.com.mx/photos/5ce19f41d09b9ac33d16885a/16:9/w_1920,c_limit/john%20wick%203.jpg' }
            ],
            nombre: 'Alvaro Escobar',
            favorita: {}
        });
    }



    render() {
        return (
            <React.Fragment>
                <Slider title="Peliculas" size="slider-small" />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Peliculas</h2>
                        <p>Seleccion de favoritas de: {this.state.nombre}</p>

                        {/*this.state.favorita.titulo &&
                            <p style={{ background: 'green', color: 'white', padding: '10px' }} ><strong>La pelicula favorita es: {this.state.favorita.titulo}</strong></p>

                        */}

                        <button onClick={this.cambiarTitulo}>Cambiar titulo</button>
                        <div id="articles">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula key={i} pelicula={pelicula} indice={i} marcarFavorita={this.favorita} />
                                    );
                                })
                            }
                        </div>

                    </div>
                </div>
                <Sidebar />
            </React.Fragment>

        );
    }
}
export default Peliculas;