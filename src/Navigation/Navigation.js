import React, {Component} from 'react';
import Links from '../fixturesLinks';
import './Navigation.css';


class Navigation extends Component{
		renderLinks(){
			//Итерируется массив Links 5 или 6 элементов в зависимости от props
			return Links.slice(0, this.props.numberMenu).map((Link, index) => {
				return(
					<li key={index}>
						<a href={Link.anchor}>
							{Link.linked}
						</a>	
					</li>	
				)
			})
		}
		render(){
			return(		
	                <ul>
	                	{this.renderLinks()}                  
	                </ul>         
			)	
		}
}
export default Navigation;