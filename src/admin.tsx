import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from 'react';
  
  export default function Admin() {
    const [name, setName] = useState('');
    const [passwd, setPasswd] = useState('')
    const data = JSON.stringify({name: name, password:passwd});
    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        const result = await fetch('http://localhost:8000/auth/admin', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })
        const res = await result.json();
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Админ</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Зөвхөн админ хаягууд нэвтрэх хэсэг ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Нэвтрэх нэр</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="asd">
                <FormLabel>Нууц үг</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                </Stack>
                <Button
                  bg={'blue.400'}
                  onClick={(e)=>{handleSubmit(e)}}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Нэвтрэх
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }