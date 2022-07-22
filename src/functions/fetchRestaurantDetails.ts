const fetchRestaurantDetails = async(id:string) =>{
    const result = await fetch(`http://35.194.232.50:8000/restaurant/${id}`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const res = await result.json();
    return res;
}
export default fetchRestaurantDetails;