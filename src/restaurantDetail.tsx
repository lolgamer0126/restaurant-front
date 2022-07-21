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
import { MdLocalShipping } from 'react-icons/md';
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
    name: 'Loading...',
    tags: '',
    photo: '',
    rating: 0,
    branch: 0,
    uniqueid: '',
    description: '',
    email: '',
    phone:''
  });
  const { id } = useParams();
  const cookie = getCookie('user');
  const toast = useToast()

  useEffect(()=>{
    fetchRestaurantDetails(id!).then(res=> {
        if(res.message=='error'){
            console.log('no such restaurant')
        }
        else{
            setRestaurant(res.restaurant);
        }
    } )
    console.log(restaurant.tags.split(',')[0])
  },[])
  const incrementRating = () =>{
    fetchInrementRating(restaurant.uniqueid, cookie).then(result=>{
      if(result.message == 'unauthenticated'){
        toast({
          title: 'Нэвтрээгүй байна',
          description: "Зөвхөн нэвтэрсэн хэргэлэгчид оноо өгөх эрхтэй",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      if(result.message == 'success') setRestaurant({...restaurant, rating: restaurant.rating+1 });
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
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
    </div>
  );
}