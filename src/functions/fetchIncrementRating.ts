const fetchInrementRating = async (uniqueid:string, cookie:string) =>{
    const val = JSON.stringify({'uniqueid': uniqueid, 'cookie':cookie});
    const result = await fetch('http://35.194.232.50:8000/restaurant/increment', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: val
    });
    const res = await result.json();
    return res;
}
export default fetchInrementRating;