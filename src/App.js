import React, { Component } from 'react';


import Introduction from './Introduction/Introduction';
import Articles from './Articles/Articles';
import Addarticle from './Addarticle/Addarticle';




class App extends Component {  

        //открыто-закрыто мобильное меню навигации
        state={
            isOpenMobileMenu: false, 
            timeValue: 122222
        }

        //изменяет состояние для открывания/закрывания мобильного меню навигации
        appearMobileMenu =()=>{ 
            this.setState({isOpenMobileMenu: !this.state.isOpenMobileMenu});
        }
       


    render() {
       
    return (
        <div>
           
            <Introduction/>    

            <Articles ref='child'/>
               
            <Addarticle/>    
            
        </div>           
    );
    }
}
export default App;

