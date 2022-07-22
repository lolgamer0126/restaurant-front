import getCookie from "./getCookie";


const deleteRestaurant=async(uniqueid:string)=>{
    const cookie = getCookie('user');
    const data = JSON.stringify({id: uniqueid, cookie:cookie});
    const result = await fetch('http://35.194.232.50:8000/restaurant/delete', {
      method:'post',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    });
    const res = await result.json();
    if(res.message == 'success'){
        window.location.reload();
    }
    if(res.message == 'unauthorized'){
        console.log('unauthorized');
    }
    if(res.message == 'error'){
        console.log('error occured');
    }
}
export default deleteRestaurant;