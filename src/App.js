import React, { Component } from 'react';

import './App.css';
import {Route, NavLink} from 'react-router-dom';
import Introduction from './Introduction/Introduction';
import LatestPosts from './LatestPosts/LatestPosts';
import Addarticle from './Addarticle/Addarticle';
import PostDetail from './PostDetail';




class App extends Component {  

        //открыто-закрыто мобильное меню навигации
        state={
            isOpenMobileMenu: false, 
            timeValue: 122222
        }

     
         


    render() {
       
    return (
        <div >
            <nav>
                <ul>
                    <li>
                        <NavLink to='/Introduction'>Introduction</NavLink>
                    </li>
                    <li>
                        <NavLink to='/LatestPosts'>Latest posts</NavLink>
                    </li>
                     <li>
                        <NavLink to='/CreatePost'>Create post</NavLink>
                    </li> 
                </ul>
            </nav>    

            <Route path='/Introduction' component={Introduction} />
            <Route path='/LatestPosts' exact component={LatestPosts} />
            <Route path='/CreatePost' component={Addarticle} />
            <Route path='/LatestPosts/:keykey' component={PostDetail} />
           
            
        </div>           
    );
    }
}
export default App;

