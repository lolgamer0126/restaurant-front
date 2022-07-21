import {useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  useColorMode,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, PhoneIcon, SearchIcon } from '@chakra-ui/icons';
import fetchUser from '../functions/fetchUser';
import getCookie from '../functions/getCookie';
import { Link as ReachLink } from "react-router-dom";
import { BiLogOut } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { Image } from '@chakra-ui/react'
import searchRestaurant from '../functions/searchRestaurant';
export default function Navbar() {
  interface restaurantInterface {
    name: string,
    tags: string,
    photo: string,
    rating: number,
    branch: number,
    uniqueid: string
  }
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenn, onOpen:onOpenn, onClose:onClosen } = useDisclosure();
  const [searchResult, setSearchResult] = useState<restaurantInterface[]>([]);
  const [search, setSearch] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['user']);

  const [user, setUser] = useState({
    username: '',
    email: '',
    photo: '',
    admin: ''
  });

  useEffect(()=>{
    const cookie = getCookie('user');
    fetchUser(cookie).then(result=>{
      setUser(result.user);
    })
  }, []);

  useEffect(()=>{
    if(search.length > 0){
      searchRestaurant(search).then(res=>{
        setSearchResult(res.restaurants);
        console.log(res)
      })
    }
  },[search])
  const color = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Mongolian Restaurants</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                as={ReachLink}
                to={'/'}>                
                Нүүр
              </Link>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                as={ReachLink}
                to={'/about'}>
                Бидний тухай
              </Link>
              {user.admin && 
            <Link
            px={2}
            py={1}
            color="yellow.800"
            rounded={'md'}
            _hover={{
              textDecoration: 'none',
              bg: color,
            }}
            as={ReachLink}
            to={'/create'}>
            Шинэ ресторан оруулах
          </Link>
          }
          <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <InputGroup paddingRight={8} onClick={onOpenn} >
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
              />
              <Input type='tel' placeholder='Ресторан хайх' />
            </InputGroup>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    user.photo ||
                    'https://api-private.atlassian.com/users/affb65c319b201401d32c57356444b17/avatar'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuDivider />
                {user.username && <Button onClick={()=>{
                  removeCookie('user');
                  window.location.reload();
                }} > <MenuItem>Гарах  <BiLogOut /> </MenuItem> </Button>}
                {!user.username && <Link href='http://localhost:8000/auth/google'> <Button  w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
          <Center>
            <h2>Нэвтрэх</h2>
          </Center>
        </Button></Link>}
                
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: color,
                }}
                as={ReachLink}
                to={'/'}>                
                Нүүр
              </Link>
              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: color,
                }}
                as={ReachLink}
                to={'/about'}>
                Бидний тухай
              </Link>
              {user.admin && 
            <Link
            px={2}
            py={1}
            color="yellow.800"
            rounded={'md'}
            _hover={{
              textDecoration: 'none',
              bg: color,
            }}
            as={ReachLink}
            to={'/create'}>
            Шинэ ресторан оруулах
          </Link>
          }
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Modal isOpen={isOpenn} onClose={onClosen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <InputGroup paddingRight={8} onClick={onOpenn} >
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
              />
              <Input type='tel' placeholder='Ресторан хайх' onChange={(e)=>{
                setSearch(e.target.value);
              }} />
            </InputGroup>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {searchResult.map((r, i) => {
              return (
                <div>
                  <Link as={ReachLink} to={'/restaurant/'+r.uniqueid}>
                  <h1>{r.name}</h1></Link>
                </div>
              )
            })
          }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
