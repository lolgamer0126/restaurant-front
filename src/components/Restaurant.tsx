import React, { useState } from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Button,
  Stack,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { Link as ReachLink } from "react-router-dom";
import { MdBuild } from 'react-icons/md';
import { IconButton } from '@chakra-ui/react'
import {FaTrashAlt} from 'react-icons/fa'
import deleteRestaurant from '../functions/deleteRestaurant';
interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}
interface body{
    name: string,
    tags: Array<string>;
    img: string,
    rating: number,
    branch: number,
    uniqueid: string,
    admin: boolean
}
const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

const RestaurantList: React.FC<body> = (props) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)

  return (
    <div>
    <Container maxW={'7xl'} p="12">
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}
            as={ReachLink}
            to={'/restaurant/'+props.uniqueid}>
              <Image
                borderRadius="lg"
                boxSize='200px'
                src={props.img}
                alt="some good alt text"
                objectFit="contain"

              />
            </Link>
           
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <BlogTags tags={props.tags} />
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}
            as={ReachLink}
            to={'/restaurant/'+props.uniqueid}>
              {props.name}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            Салбарын тоо: {props.branch}
        
          </Text>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            Оноо: {props.rating}
                
          </Text>
          {props.admin &&
          <Stack direction='row' spacing={4}>

          <Link as={ReachLink}
            to={'/edit/'+props.uniqueid}
            > <Button leftIcon={<MdBuild />} colorScheme='pink' variant='solid'>
          Засах
        </Button></Link>
        <Button onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
         leftIcon={<FaTrashAlt />} colorScheme='red' variant='solid'>
          Устгах
        </Button>
          </Stack> 
          }
        </Box>
      </Box>
      
    </Container>
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Устгахдаа итгэлтэй байна уу?</ModalHeader>
          <ModalCloseButton />
            <Button onClick={(e)=>{
              onClose();
              deleteRestaurant(props.uniqueid);
              }} leftIcon={<FaTrashAlt />} colorScheme='red' variant='solid'>Устгах</Button>
        </ModalContent>
      </Modal>
  </div>
  );
};

export default RestaurantList;