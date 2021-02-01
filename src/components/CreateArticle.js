import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import Swal from 'sweetalert2';

class CreateArticle extends Component{

    titleRef = React.createRef();
    contentRef = React.createRef();

    url = Global.url;

    state ={
        article:{},
        status:null,
        selectedFile: null
    }

    constructor(props) {
        super(props);
        // Se carga el objeto para validar el formulario
        // En el curso utiliza el componentWillMount
        this.validator = new SimpleReactValidator();
    }

    changeState= ()=>{

        this.setState({
            article:{
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
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
            axios.post(this.url+'save', this.state.article).then(res=>{
                if(res.data.article){

                    this.setState({
                        article: res.data.article,
                        status: 'waiting'
                    });

                    Swal.fire(  'Articulo creado!!',  'El articulo se ha creado correctamente',  'success');

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
        console.log(this.state);
    }

    render(){
        if(this.state.status === "success"){
            return(<Redirect to='/blog'></Redirect>);
        }

        return(
            <div className="center">
                <section id="content">
                    <h2 className="subheader">Crear Articulo</h2>

                    <form className="mid-form" onSubmit={this.saveArticle}>

                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState}/> 
                            {this.validator.message('title',this.state.article.title, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea type="text" name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                            {this.validator.message('content',this.state.article.content, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange}/> 
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success"/> 
                    </form>

                </section>
                <Sidebar></Sidebar>
            </div>
        );
    }
}

export default CreateArticle;