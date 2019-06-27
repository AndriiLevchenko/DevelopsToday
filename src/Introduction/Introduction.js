import React from 'react';
import './Introduction.css';

const Introduction = () => {
    return (
        <div align='center'>
            <div className='introduction'>
                    <div className='introduction__text'>
                        <h2>Блог о сучасних Frontend-технологіях</h2>
                    </div> 
                    <div className='web-technology'>
                        <div className='users__picture'>
                            <img src='logo/logoJS.png' alt='JS' />
                        </div>    
                        <div className='web-technology__text'>
                            <h5>JavaScript</h5>
                            <p>JavaScript — динамічна, обєктно-орієнтована прототипна мова програмування. 
                            Найчастіше використовується для створення сценаріїв веб-сторінок, що надає 
                            можливість на стороні клієнта  взаємодіяти з користувачем, керувати браузером, 
                            асинхронно обмінюватися даними з сервером, змінювати структуру та зовнішній вигляд веб-сторінки.</p>
                        </div>    
                    </div>
                    <div className='web-technology'>
                        <div className='users__picture'>
                            <img src='logo/logoReact.png' alt='React' />
                        </div>    
                        <div className='web-technology__text'>
                            <h5>React</h5>
                            <p>React (старі назви: React.js, ReactJS) — відкрита JavaScript бібліотека для створення інтерфейсів користувача, 
                            яка покликана вирішувати проблеми часткового оновлення вмісту веб-сторінки, з якими стикаються в розробці 
                            односторінкових застосунків. Розробляється Facebook, Instagram і спільнотою індивідуальних розробників.</p>                          
                        </div>    
                    </div>
                    <div className='web-technology'>
                        <div className='users__picture'>
                            <img src='logo/logoredux.png' alt='Redux' />
                        </div>
                        <div className='web-technology__text'>
                            <h5>Redux</h5>
                            <p>Redux - відкрита JavaScript бібліотека призначена для управління станом програми. 
                            Найчастіше використовується разом з React або Angular для побудови інтерфейсів користувача.</p>
                        </div>
                    </div>        
            </div>
        </div>
    )
}

export default Introduction;