import React from 'react';
import './Input.css';

function isInvalid({valid, touched, shouldValidate}){
    return !valid && touched && shouldValidate
}

const Input =  props => {
    const inputType = props.type || 'email';
    const cls=['register__input input'];
    const htmlFor= `${inputType}-${Math.random()}`

    if(isInvalid(props)){
        cls.push('invalid');
    }
        return(
            <div  className={cls.join(' ')}  >
                <p>{props.name}</p>
                <input
                    type={inputType}
                    id={props.id || htmlFor}
                    value={props.value}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.onChange}
                    valid={props.valid}
                    touched={props.touched}   
                /> 
                <br/>
                {
                    isInvalid(props) ? <span>{props.errorMessage || 'Fill the form'}</span> : null
                }
            </div>
        ) 
}
export default Input;

