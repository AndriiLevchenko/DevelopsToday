import React, {Component} from 'react';
import Button from './components/Button/Button';


class PostDetail extends Component {

    //  cardToggle(e){
    //     console.log('запустилась функция cardOpen', this.props.keykey);
    //     if(this.state.class==='smallArticlecard'){
    //         this.setState({class: 'bigArticlecard'});
    //     }else{
    //         this.setState({class: 'smallArticlecard'});
    //     }
    // }

    render(){
       console.log(this.props);
    	return(
    		<div className='bigArticlecard' >
                <Button
                    className='article__button' 
                    //onClick={this.cardToggle.bind(this)} 
                    onClick={()=>this.props.history.push('/LatestPosts/')}
                    value='Open' 
                />
                <div className='users__picture'>
                    <img src={this.props.picture} alt='photogpaphy' />                                   
                </div>
                <div className='users__text'>
                    <h4>{this.props.name}</h4>   
                    <p className='p-position'>{this.props.match.params.keykey}</p>
                    <p className='p-email'>{this.props.match.params.keykey}</p>
                    <p className='p-telephone'>{this.props.match.params.keykey}</p>  
                    <p className='p-telephone'>{this.props.match.params.keykey}</p>         
                </div>    
            </div>
    	)
    }
}

export default PostDetail;
