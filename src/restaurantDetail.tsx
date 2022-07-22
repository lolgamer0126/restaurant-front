import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Tag,
  TagLabel,
  HStack,
} from '@chakra-ui/react';
import Navbar from './components/Navbar'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import fetchRestaurantDetails from './functions/fetchRestaurantDetails';
import useTitle from './functions/changeTitle';
import {GiHighFive} from 'react-icons/gi'
import fetchInrementRating from './functions/fetchIncrementRating';
import getCookie from './functions/getCookie';
import { useToast } from '@chakra-ui/react'

export default function Restaurant() {
const [restaurant, setRestaurant] = useState({
  name: '',
  tags: '',
  photo: '',
  rating: 0,
  branch: 0,
  uniqueid: '',
  description: '',
  email: '',
  phone:'',
  location: ''
});
const { id } = useParams();
const cookie = getCookie('user');
const toast = useToast()

useEffect(()=>{
  fetchRestaurantDetails(id!).then(res=> {
      if(res.message==='error'){
          console.log('no such restaurant')
      }
      else{
          console.log(res.restaurant)
          setRestaurant(res.restaurant);
      }
  } )
},[])
const incrementRating = () =>{
  fetchInrementRating(restaurant.uniqueid, cookie).then(result=>{
    if(result.message === 'unauthenticated'){
      toast({
        title: 'Нэвтрээгүй байна',
        description: "Зөвхөн нэвтэрсэн хэргэлэгчид оноо өгөх эрхтэй",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if(result.message === 'success') setRestaurant({...restaurant, rating: restaurant.rating+1 });
  })
}
useTitle(restaurant.name)
return (
  <div>
  <Navbar />
  <Container maxW={'7xl'}>
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}>
      <Flex>
        <Image
          rounded={'md'}
          alt={'product image'}
          src={
            restaurant.photo
          }
          fit={'cover'}
          align={'center'}
          w={'100%'}
          h={{ base: '100%', sm: '400px', lg: '500px' }}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            {restaurant.name}

          </Heading>
          <Text
            color={useColorModeValue('green.900', 'green.1000')}
            fontWeight={300}
            fontSize={'2xl'}>
            Нээлттэй
          </Text>

        </Box>
        

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
          }>
            <Button onClick={()=>incrementRating()} leftIcon={<GiHighFive/>} variant={'outline'} colorScheme='blue'>{restaurant.rating}</Button>
          <VStack spacing={{ base: 4, sm: 6 }}>
            <Text fontSize={'lg'}>
              {restaurant.description}
            </Text>
          </VStack>
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('yellow.500', 'yellow.300')}
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Төрөл
            </Text>

            <SimpleGrid row={{ base: 1, md: 2 }} spacing={10}>
              <List spacing={2} >
              <HStack spacing={4}>

              {restaurant.tags.split(',').map(tag=>{
                return <Tag
                size={'sm'}
                key={tag}
                borderRadius='full'
                variant='solid'
                colorScheme='green'
                
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
              })}
              </HStack>
              </List>
            </SimpleGrid>
          </Box>
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color={useColorModeValue('yellow.500', 'yellow.300')}
              fontWeight={'500'}
              textTransform={'uppercase'}
              mb={'4'}>
              Холбоо барих
            </Text>

            <List spacing={2}>
              <ListItem>
                <Text as={'span'} fontWeight={'bold'}>
                  Мэйл:
                </Text>{' '}
                {restaurant.email}
              </ListItem>
              <ListItem>
                <Text as={'span'} fontWeight={'bold'}>
                  Утас:
                </Text>{' '}
                {restaurant.phone}
              </ListItem>
            </List>
          </Box>
          {restaurant.location.length > 10 && 
          <iframe src= {restaurant.location}
          width="600" 
          height="450" 
          style={{border: 0}} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"></iframe>
          }
          { restaurant.location.length <= 10 &&

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10702.752266378366!2d106.88154599731443!3d47.8843662999613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693004b8c2d65%3A0x3f35d837777255e0!2z0KHQv9C-0YDRgiDQt9Cw0LDQuw!5e0!3m2!1smn!2smn!4v1658454223348!5m2!1smn!2smn" 
            width="600" 
            height="450" 
            style={{border: 0}} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"></iframe>
          }
        </Stack>
      </Stack>
    </SimpleGrid>
  </Container>
  </div>
);
}