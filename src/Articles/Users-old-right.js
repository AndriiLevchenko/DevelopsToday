import React, {Component} from 'react';
import userslist from '../userslist';
import Userscard from '../Userscard';
import './Users.css';
import ScrollableAnchor from 'react-scrollable-anchor';
import axios from 'axios';

class Users extends Component{

        state={
            UsersOpen: 6,            // Количество карточек на странице 6 или 3
            UsersAddNumber: 6,       // Добавляется карточек на странице 6 или 3
            narrowScreenFlag: true,  // Узкий-широкий экран     
            isUsersButton: true      // Наличие-отсутствие кнопки Show more 

        }
                                     //Добавление по 6 карточек пользователей на страницу по клику
    componentDidMount(){
            axios.get('https://abzagency.firebaseio.com/userslist.json').then(response =>{
                this.setState({usersArray: response});
                    console.log(this.state.usersArray);
                this.setState({userslist: Object.values(this.state.usersArray.data)});
                    console.log(this.state.usersArray.data);
                     console.log(this.state.userslist);

            });
        }    

        

    showMoreUsers =()=> {              
        if(this.state.UsersOpen < userslist.length-this.state.UsersAddNumber){
            this.setState({UsersOpen: this.state.UsersOpen+this.state.UsersAddNumber});
        } else {
            this.setState({    UsersOpen: userslist.length,
                               isUsersButton: false               }); 
        }     
    }  
                                     // Переход из Хедера по клику на карточку Superstar
    showSuperstar(){                   
        this.setState({    UsersOpen: userslist.length,
                               isUsersButton: false               });      
    }  
    narrowScreenChange(){
        console.log(this.state.UsersOpen);
        this.setState({UsersOpen: 3, UsersAddNumber: 3, narrowScreenFlag: false});
        console.log(this.state.narrowScreenFlag);
    }

    render(){         
         const UsersArrayOpen=userslist.slice(userslist.length-this.state.UsersOpen).reverse();
         const UsersButton=this.state.isUsersButton&&<button onClick={this.showMoreUsers} className='buttonShowmore'>Show more</button>  
       
        if (window.innerWidth <615){
            if(this.state.narrowScreenFlag ){ 
                this.narrowScreenChange()}}

    return (
        <div align='center'>
            <div className='users'>
                <h2>Our cheerful users</h2>
                <h5>Attention! Sorting users by registration date</h5>  
                    {/* Формирование карточек Userscsrd */}                
                    {
                        UsersArrayOpen.map(function(item, i){
                            return( 
                                <React.Fragment key={i} >
                    {/* Добавление якоря к карточке Superstar для перехода их Хедера*/}
                                    {(i===userslist.length-1)&& <ScrollableAnchor id={'anchorsuperstar'}>
                                                                    <div className='floatleft'></div>
                                                                </ScrollableAnchor>}
                                    <Userscard 
                                        picture={item.picture} 
                                        name={item.name} 
                                        position={item.position}
                                        email={item.email} 
                                        telephone={item.telephone}/>                           
                                </React.Fragment> 
                            );        
                        }
                        )
                    }                 
                    <div className='clearfix'></div>
                {UsersButton}
            </div>
        </div>
)
}
}
export default Users;
