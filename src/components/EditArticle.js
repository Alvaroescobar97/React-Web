import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import Swal from 'sweetalert2';

class EditArticle extends Component{

    titleRef = React.createRef();
    contentRef = React.createRef();

    articleId=null;

    url = Global.url;

    state ={
        article:{},
        status:null,
        selectedFile: null
    }

    constructor(props) {
        super(props);
        this.articleId = this.props.match.params.id;
        this.validator = new SimpleReactValidator();

    }
    componentDidMount(){
        this.getArticle(this.articleId);

    }
    getArticle=(id)=>{
        axios.get(this.url+'article/'+ id).then(res=>{
            this.setState({
                article: res.data.article
            });
        });
    }

    changeState= ()=>{

        this.setState({
            article:{
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle=(e)=>{
        e.preventDefault();

        //Rellenar state con el formulario
        this.changeState();

        if(this.validator.allValid()){
            //Hacer una peticion post para guardar el articulo
            axios.put(this.url+'article/'+this.articleId, this.state.article).then(res=>{
                if(res.data.article){

                    this.setState({
                        article: res.data.article,
                        status: 'waiting'
                    });

                    Swal.fire(  'Articulo Editado!!',  'El articulo se ha editado correctamente',  'success');

                    //Subir la imagen
                    if(this.state.selectedFile!==null){
                        //sacar el id del articulo guardado
                        var articleId = this.state.article._id;

                        //Crear form data y añadir fichero
                        const formData = new FormData();

                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );

                        //Peticion ajax
                        axios.post(this.url+'upload-image/'+articleId,formData).then(res=>{
                            if(res.data.article){
                                this.setState({
                                    article: res.data.article,
                                    status: 'success'
                                });
                            }else{
                                this.setState({
                                    article: res.data.article,
                                    status: 'failed'
                                });
                            }
                        });

                    }else{
                        this.setState({
                            status: 'success'
                        });
                    }

                }else{

                    this.setState({
                        status: 'failed'
                    });

                }
            });
        }else{

            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
        
    }

    fileChange=(event)=>{
        this.setState({
            selectedFile: event.target.files[0]
        });
        
    }

    render(){
        console.log(this.state.article);
        if(this.state.status === "success"){
            return(<Redirect to='/blog'></Redirect>);
        }

        return(
            <div className="center">
                <section id="content">
                    <h2 className="subheader">Editar Articulo</h2>

                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>

                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} onChange={this.changeState}/> 
                                {this.validator.message('title',this.state.article.title, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea type="text" name="content" defaultValue={this.state.article.content}  ref={this.contentRef} onChange={this.changeState}></textarea>
                                {this.validator.message('content',this.state.article.content, 'required')}
                            </div>

                            <div className="form-group">
                                <div className="image-wrap">

                                    {
                                        this.state.article.image !== null? 
                                        (<img src={this.url+"get-image/"+this.state.article.image} alt={this.state.article.title}/>)
                                        :(<img src='https://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png' alt={this.state.article.title}/>)
                                    }

                                </div>
                                <input type="file" name="file0" onChange={this.fileChange}/> 
                            </div>

                            <input type="submit" value="Guardar" className="btn btn-success"/> 
                        </form>
                    }
                    {!this.state.article.title &&

                            <div className="form-group">
                                <p>
                                Loading...
                                </p>
                            </div>

                    }

                </section>
                <Sidebar></Sidebar>
            </div>
        );
    }
}

export default EditArticle;