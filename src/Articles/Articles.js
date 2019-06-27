import React, {Component} from 'react';
import Articlecard from '../Articlecard';
import './Articles.css';
import axios from 'axios';
import Button from '../components/Button/Button';

class Articles extends Component{

        state={
            ArticlesOpen: 6,            // Количество статей на странице 6 или 3
            UsersAddNumber: 6,       // Добавляется статей на странице 6 или 3
            narrowScreenFlag: true,  // Узкий-широкий экран     
            isUsersButton: true ,    // Наличие-отсутствие кнопки Show more 
            userslist:[],           // Массив со всеми Articles
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
        showMoreArticles =()=> {              
            if(this.state.ArticlesOpen < this.state.userslist.length-this.state.UsersAddNumber){
                this.setState({ArticlesOpen: this.state.ArticlesOpen+this.state.UsersAddNumber});
            } else {
                this.setState({     ArticlesOpen:     this.state.userslist.length,
                                    isUsersButton: false                          
                }); 
            }     
        }  
                                         // Переход из Хедера по клику на карточку Superstar
        showSuperstar(){                   
            this.setState({    ArticlesOpen:     this.state.userslist.length,
                               isUsersButton: false               
            });      
        }  
                                         // Изменение State при узком экране
        narrowScreenChange(){
            this.setState({ArticlesOpen: 3, UsersAddNumber: 3, narrowScreenFlag: false});
        }

        toggleArticlecard(e){
            console.log(e);
            this.setState({class: 'bigArticlecard'})
        }

    render(){         
        const ArticlesArrayOpen=this.state.userslist.slice(this.state.userslist.length-this.state.ArticlesOpen).reverse();
        const UsersButton=this.state.isUsersButton&&
                            <Button onClick={this.showMoreArticles} className='buttonShowmore' value='Show more'  />  

        let cls=this.state.class;

        if (window.innerWidth <615){
            if(this.state.narrowScreenFlag ){ 
                this.narrowScreenChange()}}

        return(
            <div align='center'>
                <div className='users'>
                    <h2>Frontend розробка</h2>
                    <h5>Статті відсортовані по даті публікації</h5>  
                        {/* Формирование карточек Articlecard */}                
                        {
                            ArticlesArrayOpen.map(function(item, i){
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
                                            email={item.email} 
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
export default Articles;
