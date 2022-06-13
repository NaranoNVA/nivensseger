export default function reducer(state, action){
    switch(action.type){
        case "UPDATE_USER":
            const changeUser = action.payload;
            return {
                usuario: {
                    id: changeUser.id,
                    name: changeUser.name,
                    username: changeUser.username,
                    email: changeUser.email
                }
            };
        default: 
            return state;
    }
}