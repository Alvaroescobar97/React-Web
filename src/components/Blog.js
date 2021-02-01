import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {

    render() {

        /*
        axios.get("http://localhost:3900/api/articles").then(res=>{
            this.setState({
                articles: res.data.articles,
                status: "success"
            });
            console.log(res.data);
        });
        */
        return (
            <React.Fragment>
                <Slider title="Blog" size="slider-small"/>
                <div className="center">
                    <section id="content">

                        <Articles />

                        {/** 
                         this.state.status === "success" &&
                            <div>
                                {this.state.articles.map((article)=>{
                                    return(<h1 key={article.id}>{article.title}</h1>);
                                })}
                            </div>
                         */   
                        
                        }
                    </section>
                </div>
                <Sidebar blog="true" />
            </React.Fragment>
        );
    }
}
export default Blog;