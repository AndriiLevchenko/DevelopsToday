import React, {Component} from 'react';
import './Addarticle.css';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';
import config from '../firebase-config';
import Input from '../components/Input/Input';
import Select from '../components/Select/Select';
import InputFile from '../components/InputFile/InputFile';
import Button from '../components/Button/Button';

firebase.initializeApp (config);
const storage=firebase.storage();

class Addarticle extends Component{
        state={
            articleName: '',
            articlesArray: '',
            articlesList: '',

            newArticleTheme:' ',
            newArticleName: ' ',
            newArticleText: ' ' ,
            newArticleDate: ' ' ,
            selectedFile: {name: ' Upload Article photo'},
            avatar: '',
            progress: 0,
            url:'', 

            validationState: {
                inputAuthor: {
                    newArticleNameText: ' ',
                    name: 'Автор статті'
                },
                inputName: {
                    newArticleNameText: ' ',
                    name: 'Назва статті'
                },
                inputText: {
                    newArticleNameText: '   ' ,
                    name: 'Текст статті'
                }
            },
            isFormValid: 'false'
        }
                                 //Получение articlesList.json с сервера
        componentDidMount(){
            axios.get('https://abzagency.firebaseio.com/userslist.json').then(response =>{
                this.setState({articlesArray: response, articlesList: Object.values(response)});
            });
        }
                                //Получение введенных данных из формы с валидацией
        validateControl(value, validation){
           
            let isValid = 'true';
           
            return isValid;
        }

        handleChangeNameEmailPhone = (event, controlName) =>{

            console.log(`${controlName}:`, event.target.value, event, controlName);
             console.log('event',  event);
              console.log('controlName',  controlName);
               console.log('event.target.value', event.target.value);
            const formControls = {...this.state.validationState};
            const control = {...formControls[controlName]};
                 control.newArticleNameText = event.target.value;

                    //Запись в State введенных в Input-ы данных Name, Email, Phone и их валидация
                if(control.name === 'Автор статті'){ this.setState({newArticleName: control.newArticleNameText})};
                     
                if(control.name === 'Назва статті'){ this.setState({newArticleTheme: control.newArticleNameText})};
                
                if(control.name === 'Текст статті'){ this.setState({newArticleText: control.newArticleNameText})};
                  console.log(event.target);

         

            control.touched = 'true';
            control.valid = this.validateControl(control.newArticleNameText, control.validation);
            formControls[controlName] = control;

           
            let isNameEmailPhoneValid = 'true';
            Object.keys(formControls).forEach(name =>{
                isNameEmailPhoneValid=formControls[name].valid && isNameEmailPhoneValid;
                console.log(formControls[name].placeholder, isNameEmailPhoneValid)
            });
           
            this.setState({validationState: formControls});
              console.log(this.state.newArticleTheme, isNameEmailPhoneValid);
           
          
            console.log('position:  ', this.state.newArticleTheme !== '  Select your position');
             console.log('file:  ', this.state.selectedFile.name !== " Upload your photo");
             console.log('окончательно NameEnailPhone:  ', this.state.isFormValid);
              console.log(this.state.newArticleName);
                console.log(this.state.newUsersEmail);
                console.log(this.state.newArticleText);

          
        }
                     //Запись в State Position выбранного из формы Select и его валидация
        handleChangeSelect = event =>{
            console.log(event.target.value);
            const newArticleDate =  new Date();
            console.log(newArticleDate.getFullYear());
            this.setState({newArticleDate });
              
            
              
                console.log(this.state.newArticleTheme);
              
                           
                               console.log('position:  ', newArticleDate  );
        }

                         //Запись в State фотографии из формы Input
        handleChangeFile =event=> {
            const selectedFile=event.target.files[0];
            this.setState({selectedFile});
         
          
            console.log('file:  ', selectedFile.name !== "Додай фото до статті");     //проверка валидации
        }

                                //Формирование нового User и внесения в список articlesList.json на сервере 
        fileUploadHandler =(e) =>{
            e.preventDefault();

            // Upload file
            const {selectedFile}=this.state;    
            const uploadTask=storage.ref(`avatars/${selectedFile.name}`).put(selectedFile);
            uploadTask.on('state_changed', 
                (snapshot) =>{
                    const progress=Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100);
                    this.setState({progress});
                }, 
                (error) =>{console.log(error)}, 
                () =>{
                    storage.ref('avatars').child(selectedFile.name).getDownloadURL().then(url =>{
                        this.setState({url});
                                            //Формирование нового User
                        const newUser={
                            "listid":Object.values(this.state.articlesArray.data).length + 1,
                            "picture":this.state.url,          
                            "name":this.state.newArticleName,
                            "position":this.state.newArticleTheme,
                            "date":this.state.newArticleDate,
                            "telephone":this.state.newArticleText
                        }
                        console.log(newUser);
                                            //Добавление нового User
                        axios.post('https://abzagency.firebaseio.com/userslist.json', newUser).then(response => {
                           console.log( response );
                           alert('Стаття додана');
                        } 
                        ).catch(error => console.log(error));
                    });
                } 
            );     
        }
      

    render(){
        return (
           <div className='register'>
                <h2>Написати статтю </h2>
        
                <div className='register__form'>
                    <form>
                       
                         <Input
                            type='text'
                            value={this.state.validationState.inputAuthor.newArticleNameText}
                            placeholder= '    Author'
                            name='    Author'
                            onChange={event => this.handleChangeNameEmailPhone(event, 'inputAuthor')}
                        />
                         <Input   
                            type='text'
                            value={this.state.validationState.inputName.newArticleNameText}
                            placeholder= '   Post short description'
                            name= ' Post short description'
                            onChange={event => this.handleChangeNameEmailPhone(event, 'inputName')}
                        />
                        <Input
                            type='text'
                            value={this.state.validationState.inputText.newArticleNameText}
                            placeholder= '    Введи текст статті'
                            name='    Article text' 
                            onChange={event => this.handleChangeNameEmailPhone(event, 'inputText')}
                        />

                                {/*  Render Select Theme */}
                        <Select 
                            articleTheme={this.state.newArticleTheme}
                            onChange={event => this.handleChangeSelect(event)}
                        /> 

                                {/*  Render File Upload */}
                        <InputFile
                            onChange={this.handleChangeFile}
                            selectedFile={this.state.selectedFile}
                        />  
                        <Button  className="register__button" 
                                 onClick={this.fileUploadHandler} 
                                 disabled={!this.state.isFormValid} 
                                 value="Додати" 
                        />
                      
                    </form>     
                </div>
            </div>
        )
    }
}

export default Addarticle;