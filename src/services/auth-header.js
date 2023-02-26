export default function authHeader(){
    const user=JSON.parse(localStorage.getItem('user'));
    // console.log(user)
    if (user && user.accessToken){
        return { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'x-access-token': user.accessToken
        };
        //return {'x-access-token':user.accessToken};

    }
    else{
        return {};
    }
}

export function getProfileName(){
    const user=JSON.parse(localStorage.getItem('user'));
    // console.log(user)
    if (user && user.accessToken){
        return user.email
    }
    else{
        return '';
    }
}