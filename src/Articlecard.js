import React, {Component} from 'react';
import Button from './components/Button/Button';
import {withRouter} from 'react-router-dom';


class Articlecard extends Component {

    state={
        class:'smallArticlecard'
    }

    cardToggle(e){
        console.log('запустилась функция cardOpen', this.props.keykey);
        if(this.state.class==='smallArticlecard'){
            this.setState({class: 'bigArticlecard'});
        }else{
            this.setState({class: 'smallArticlecard'});
        }
    }

    render(){
        console.log(this.props);
    	return(
    		<div className={this.state.class} >
                <Button
                    className='article__button' 
                    onClick={this.cardToggle.bind(this)} 
                    //onClick={()=>this.props.history.push('/LatestPosts/' + this.props.keykey )}
                    value='Open/Close' 
                />
                <div className='users__picture'>
                    <img src={this.props.picture} alt='photogpaphy' />                                   
                </div>
                <div className='users__text'>
                    <h4>{this.props.name}</h4>   
                    <p className='p-position'>{this.props.position}</p>
                    <p className='p-email'>{this.props.email}</p>
                    <p className='p-telephone'>{this.props.telephone}</p>  
                    <p className='p-telephone'>{this.props.date}</p>         
                </div>    
            </div>
    	)
    }
}

export default withRouter(Articlecard);
