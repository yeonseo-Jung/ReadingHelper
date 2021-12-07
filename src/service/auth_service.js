const login = (username, password) => {
    console.log('login', username);
    return new Promise(function(resolve, reject){
        const data = {username: username, email:"soopy"};
        resolve(data);
    });
}
const register = (username, password) => {
    console.log('register', username);
}
const logout = () => {
    console.log('logout');

}
export default {register,login, logout};