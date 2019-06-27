import React from 'react';
import './Button.css';


const Button =  props => {
        return(
            <div  >     
                <button
                    disabled={props.disabled}
                    onClick={props.onClick}
                    className={props.className}
                > 
                    {props.value}
                </button>
              
              
            </div>
        ) 
}
export default Button;

