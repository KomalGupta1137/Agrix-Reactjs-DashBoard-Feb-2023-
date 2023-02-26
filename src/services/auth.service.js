const BaseUrl=process.env.REACT_APP_SERVER_URL;

const Login = (username,password)=>{
    let userObject = {
        'username' : username,
        'password' : password
    }

    return fetch(`${BaseUrl}/api/auth/signin`,{
    // return fetch('http://localhost:8081/api/auth/signin',{
        method:"POST",
        // headers:authHeader(),
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userObject)
    })
}

const Logout = () =>{
    localStorage.removeItem("user");
} 

const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    Login,
    Logout,
    getCurrentUser
}

export default AuthService;