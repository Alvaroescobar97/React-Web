import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {


    render() {
        return (
            <React.Fragment>
                <Slider title="Bienvenido al Curso de React" btn="Ir al blog" size="slider-big" />
                <div className="center">
                    <section id="content">
                        <Articles home="true"/>
                    </section>
                </div>
                <Sidebar />
            </React.Fragment>
        );
    }
}
export default Home;