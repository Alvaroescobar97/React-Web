import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';


class Search extends Component {

    render() {
        var busqueda = this.props.match.params.search;
        return (
            <React.Fragment>
                <Slider title={"Busqueda: "+busqueda} size="slider-small"/>
                <div className="center">
                    <section id="content">
                        <Articles search={busqueda} />
                    </section>
                </div>
                <Sidebar blog="true" />
            </React.Fragment>
        );
    }
}
export default Search;