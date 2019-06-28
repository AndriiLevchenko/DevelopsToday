import React, {Component} from 'react';
import Articlecard from '../Articlecard';
import './LatestPosts.css';
import axios from 'axios';
import Button from '../components/Button/Button';
import {connect} from 'react-redux';

class LatestPosts extends Component{

        state={
            LatestPostsOpen: 6,            // Количество статей на странице 6 или 3
            UsersAddNumber: 6,       // Добавляется статей на странице 6 или 3
            narrowScreenFlag: true,  // Узкий-широкий экран     
            isUsersButton: true ,    // Наличие-отсутствие кнопки Show more 
            userslist:[],           // Массив со всеми LatestPosts
            class: 'smallArticlecard' //просмотр полного Articlecerd
        }
                                     //Получение userslist.json с сервера
        componentDidMount(){
            axios.get('https://abzagency.firebaseio.com/userslist.json').then(response =>{
               
                this.setState({usersArray: response});
                const userslist=Object.values(response.data);
                this.setState({userslist});
                console.log(this.state.userslist);
                   console.log(response);
            });
        }    
                                         //Добавление по 6 карточек пользователей на страницу по клику
        showMoreLatestPosts =()=> {              
            if(this.state.LatestPostsOpen < this.state.userslist.length-this.state.UsersAddNumber){
                this.setState({LatestPostsOpen: this.state.LatestPostsOpen+this.state.UsersAddNumber});
            } else {
                this.setState({     LatestPostsOpen:     this.state.userslist.length,
                                    isUsersButton: false                          
                }); 
            }     
        }  
                                         // Переход из Хедера по клику на карточку Superstar
        showSuperstar(){                   
            this.setState({    LatestPostsOpen:     this.state.userslist.length,
                               isUsersButton: false               
            });      
        }  
                                         // Изменение State при узком экране
        narrowScreenChange(){
            this.setState({LatestPostsOpen: 3, UsersAddNumber: 3, narrowScreenFlag: false});
        }

        toggleArticlecard(e){
            console.log(e);
            this.setState({class: 'bigArticlecard'})
        }

    render(){         
        const LatestPostsArrayOpen=this.state.userslist.slice(this.state.userslist.length-this.state.LatestPostsOpen).reverse();
        const UsersButton=this.state.isUsersButton&&
                            <Button onClick={this.showMoreLatestPosts} className='buttonShowmore' value='Show more'  />  

        let cls=this.state.class;
     
      

        if (window.innerWidth <615){
            if(this.state.narrowScreenFlag ){ 
                this.narrowScreenChange()}}

        return(
            <div align='center'>
                <div className='users'>
                    <h2>Latest Posts</h2>
                    <h5>Статті відсортовані по даті публікації</h5>  
                        {/* Формирование карточек Articlecard */}                
                        {
                            LatestPostsArrayOpen.map(function(item, i){
                                console.log(item.listid);
                                //console.log(this.state.classs);
                                return( 
                                    <React.Fragment key={i} >
                                        {/* Добавление якоря к карточке Superstar для перехода их Хедера*/}
                                        
                                        <Articlecard 
                                            class={cls}
                                            key={item.listid}
                                            keykey={item.listid}
                                            picture={item.picture} 
                                            name={item.name} 
                                            position={item.position}
                                            date={item.date} 
                                            telephone={item.telephone}
                                            onClick={item.onClick}
                                        />                           
                                    </React.Fragment> 
                                );        
                            })
                        }                 
                        <div className='clearfix'></div>
                    {UsersButton}
                </div>
            </div>
        )
    }
}
export default LatestPosts;
