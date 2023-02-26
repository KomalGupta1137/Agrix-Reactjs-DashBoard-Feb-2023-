import authHeader from "./auth-header";

const BaseUrl=process.env.REACT_APP_SERVER_URL;


const getPublicContent = () =>{
    return fetch(`${BaseUrl}/api/test/all`,{
    // return fetch('http://localhost:8081/api/test/all',{
        method:'GET',
        headers:authHeader()
    })
}
const getAdminBoard = () =>{
    return fetch(`${BaseUrl}/api/test/admin`,{
    // return fetch('http://localhost:8081/api/test/admin',{
        method : 'GET',
        headers : authHeader()
        
    });
}

const UserService = {
    getPublicContent,
    getAdminBoard
}

export default UserService;