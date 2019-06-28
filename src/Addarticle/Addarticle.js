import React, {Component} from 'react';
import './Addarticle.css';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';
import config from '../firebase-config';
import Input from '../components/Input/Input';
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
                 
                         //Запись в State фотографии из формы Input
        handleChangeFile =event=> {
            const selectedFile=event.target.files[0];
            this.setState({selectedFile});
         
          
            console.log('file:  ', selectedFile.name !== "Додай фото до статті");     //проверка валидации
        }

                                //Формирование нового User и внесения в список articlesList.json на сервере 
        fileUploadHandler =(e) =>{
            e.preventDefault();

            //Получение даты
            function formatDate(date) {

                  var dd = date.getDate();
                  if (dd < 10) dd = '0' + dd;

                  var mm = date.getMonth() + 1;
                  if (mm < 10) mm = '0' + mm;

                  var yy = date.getFullYear() % 100;
                  if (yy < 10) yy = '0' + yy;

                  return dd + '.' + mm + '.20' + yy;
                }

                var d = new Date(2014, 0, 30); // 30 Янв 2014
                alert( formatDate(d) ); // '30.01.14'

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
                        //Получение даты

                        const d =  new Date();
                        console.log(d.getFullYear());
                        const newArticleDate=formatDate(d);
                        this.setState({newArticleDate });
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
                <h2>Add an article </h2>
        
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
                        <div >

                            <textarea
                                value={this.state.validationState.inputText.newArticleNameText}
                                placeholder= ' Введи текст статті'
                                name='    Article text' 
                                onChange={event => this.handleChangeNameEmailPhone(event, 'inputText')}
                                rows='9'>
                            </textarea>
                        </div>    

                

                                {/*  Render File Upload */}
                        <InputFile
                            onChange={this.handleChangeFile}
                            selectedFile={this.state.selectedFile}
                        />  
                        <Button  className="register__button" 
                                 onClick={this.fileUploadHandler} 
                                 disabled={!this.state.isFormValid} 
                                 value="Add" 
                        />
                      
                    </form>     
                </div>
            </div>
        )
    }
}

export default Addarticle;