import React from 'react';
import './Select.css';


const Select = props => {

        return(
            <div className='register__select'>
                            <select name='position' onChange={props.onChange}>
                                <option>  {props.articleTheme}</option>
                                <option value='JavaScript'>JavaScript</option>
                                <option value='React'>React</option>
                                <option value='Redux'>Redux</option>
                            </select>
                            <img src='imgs/arrow.png' alt='arrow' />
                        </div>  
        ) 
}
export default Select;