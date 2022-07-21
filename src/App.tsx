import Navbar from './components/Navbar'
import RestaurantList from './components/Restaurant';
import fetchRestaurants from './functions/fetchRestaurants';
import { useEffect, useState, useRef } from 'react';
import useTitle from './functions/changeTitle';
import fetchUser from './functions/fetchUser'
import getCookie from './functions/getCookie';
import { ColorModeScript, Select } from '@chakra-ui/react';
import theme from './theme';
const Home = () => {

  interface restaurantInterface {
    name: string,
    tags: string,
    photo: string,
    rating: number,
    branch: number,
    uniqueid: string
  }
  const [admin, setAdmin] = useState(false)
  const [restaurants, setRestaurants] = useState<restaurantInterface[]>([]);
  const [option, setOption] = useState('rating');
  useEffect(()=>{
    const cookie = getCookie('user');
    fetchUser(cookie).then(result=>{
      setAdmin(result.user.admin);
    })
  },[]);
  useEffect(()=>{
    fetchRestaurants(5, option).then(res=>setRestaurants(res.restaurants));
  },[option])
  useTitle('Нүүр')
  return (
    <div>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Navbar/>
      <Select placeholder='Эрэмблэлт сонгох' size='lg' onChange={(e)=>setOption(e.target.value)}>
        <option value='chronologically'>Сүүлд нэмэгдсэнээр</option>
        <option value='rating'>Үнэлгээгээр</option>

      </Select>

      {restaurants.map((r, i) => {
        return <RestaurantList key={i} name={r.name} tags = {r.tags.split(',')} img = {r.photo} rating = {r.rating} branch = {r.branch} uniqueid={r.uniqueid} admin={admin}/>
      })
      }
  </div>
  );
};

export default Home;