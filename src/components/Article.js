import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';

class Article extends Component{

    url = Global.url;

    state={
        article: false,
        status: null
    }

    componentDidMount(){
        this.getArticle();
    }

    getArticle=()=>{
        var id = this.props.match.params.id;

        axios.get(this.url+'article/'+id).then(res=>{
            this.setState({
                article: res.data.article,
                status: 'success'
            });
        }).catch(err=>{
            this.setState({
                articles: false,
                status: "success"
            });
        });
    }

    deleteArticle=(id)=>{

        Swal.fire({
            title: 'Estas seguro?',
            text: "Borraras un articulo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(this.url+'article/'+id).then(res=>{

                    this.setState({
                        article: res.data.article,
                        status: 'deleted'
                    });
                
                   
                });
            }
          })
                  
    }

    render(){
        
        if(this.state.status ==='deleted'){
            return(<Redirect to="/blog"></Redirect>);
        }
        var article = this.state.article;
        
        return(
            <div className="center">
                <section id="content">

                    {this.state.article &&
                    
                        <article className="article-item article-detail">
                            <div className="image-wrap">

                                {
                                    article.image != null? 
                                    (<img src={this.url+"get-image/"+article.image} alt={article.title}/>)
                                    :(<img src='https://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png' alt={article.title}/>)
                                }

                            </div>
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>{article.content}</p>

                            <div className="buttons">
                                <Link to={"/blog/editar/"+article._id} className="btn btn-warning" >Editar</Link>
                                <button to="/blog" className="btn btn-danger" onClick={()=>{this.deleteArticle(article._id)}}>Eliminar</button>
                            </div>

                            <div className="clearfix"></div>

                        </article>
                    }
                    {!this.state.article && this.state.status==="success"&&
                        <div>
                            <h1 className="subheader">NO se encontró el articulo</h1>
                            <p>El articulo no existe</p>
                        </div>

                    }
                   {!this.state.status == null &&
                       <div id="article">
                            <div className="loading">
                                <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
                                <p>Esto podría tardar un rato</p>
                            </div>
                        </div>

                    }

                </section>

                <Sidebar />

                <div className="clearfix"></div>
            </div>
        );
    }
}
export default Article;