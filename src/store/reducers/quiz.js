const  initialState={
			LatestPostsOpen: 6,            // Количество статей на странице 6 или 3
            UsersAddNumber: 6,       // Добавляется статей на странице 6 или 3
            narrowScreenFlag: true,  // Узкий-широкий экран     
            isUsersButton: true ,    // Наличие-отсутствие кнопки Show more 
            userslist:[],           // Массив со всеми LatestPosts
            class: 'smallArticlecard' //просмотр полного Articlecerd
}

export default function postReducer(state=initialState, action){
	switch(action.type){
		default: 
			return state
	}
}