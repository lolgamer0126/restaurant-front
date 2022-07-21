const searchRestaurant = async(key:string) =>{
    const val = JSON.stringify({'key': key});
    const result = await fetch('http://localhost:8000/restaurant/search', {
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
export default searchRestaurant;