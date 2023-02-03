import { useState, useEffect } from 'react'
import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Badge,
    useColorModeValue,
  } from '@chakra-ui/react';
import axios from 'axios';
  
  interface Props {
    user: {
        name: string,
        email: string
        avatar_url: string
        company: string
        language: string
        country: string
        city: string
    }
}

  const Profile: React.FC<Props>  = ({ user }) => {
    return (
      <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
              user?.avatar_url
            }
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} color={useColorModeValue('gray.900', 'white')} fontFamily={'body'}>
            {user?.name}
          </Heading>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            {user?.company}
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {String(user?.language).toUpperCase()}
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {String(user?.country).toUpperCase()}
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {String(user?.city).toUpperCase()}
            </Badge>
          </Stack>
        </Box>
      </Center>
    );
  }

export default Profile;