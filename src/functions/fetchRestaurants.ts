const fetchRestaurants = async(n:number, option: string) =>{
    const val = JSON.stringify({'limit': n, 'option':option});
    const result = await fetch('http://35.194.232.50:8000/restaurant', {
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
export default fetchRestaurants;