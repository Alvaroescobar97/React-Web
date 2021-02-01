import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/es';

import Global from '../Global';

class Articles extends Component {

    url = Global.url;

    state ={
        articles: [],
        status: null
    }

    componentDidMount(){
        var home = this.props.home;
        var search = this.props.search;
        if(home ==='true'){
            this.getLastArticles();
        }else if(search && search!==null && search!==undefined){
            this.searchArticles(search);
        }else{
            this.getArticles();
        }
    }

    searchArticles=(search)=>{
        axios.get(this.url+"search/"+search).then(res=>{

                this.setState({
                    articles: res.data.articles,
                    status: "success"
                });

        }).catch(err=>{
            this.setState({
                articles: [],
                status: "success"
            });
        });
    }

    getLastArticles=()=>{
        axios.get(this.url+"articles/last").then(res=>{
            this.setState({
                articles: res.data.articles,
                status: "success"
            });
            console.log(this.state);
        });
    }

    getArticles=()=>{
        axios.get(this.url+"articles").then(res=>{
            this.setState({
                articles: res.data.articles,
                status: "success"
            });
            console.log(this.state);
        });
    }

    render() {
        if(this.state.articles.length >=1){

            let listArticles = this.state.articles.map((article,i)=>{
                return (
                    <article className="article-item" id="article-template" key={i}>
                        <div className="image-wrap">

                            {article.image != null? 
                            (<img src={this.url+"get-image/"+article.image} alt={article.title}/>)
                            :(<img src='https://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png' alt={article.title}/>)}

                        </div>
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>

                        <Link to={'blog/articulo/'+article._id}>Leer Más</Link>

                        <div className="clearfix"></div>

                    </article>
                );
            });

            return(
                <div id="articles">
                    <h2 className="subheader">Listado de Articulos</h2>
                    {listArticles}
                </div>
            );
        }else if(this.state.articles.length === 0 && this.state.status === "success"){
            return(
                <div id="articles">
                    <h2 className="subheader">Listado de Articulos</h2>
                    <p>NO hay articulos para mostrar</p>
                </div>
            );
        }else{
            return(
                <div id="articles">
                    <div className="loading">
                        <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
                        <p>Esto podría tardar un rato</p>
                    </div>
                </div>
            );
        }
        
    }
}
export default Articles;