const fetchUser =async (cookie: string) =>{
    const result = await fetch('http://35.194.232.50:8000/auth/getuserdetails', {
        headers:{
            'cookie': cookie,
            credentials: 'include',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({cookie: cookie})
    })
    const json = await result.json();
    return json;
}
export default fetchUser;