import axios from 'axios'
import React, { useState } from 'react'
import { DataState } from '../../config/DataProvider';
import { Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { InputGroup } from '@chakra-ui/react';
import { InputRightElement } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

axios.defaults.withCredentials=true;

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const { user, setUser } = DataState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    // if (user) {
    //   navigate('/home');
    // }
  })

  const loginUser = async () => {
    try {
    const config = {
      headers: {
        "Content-type": "application/json",
      }
    }
    const { data } = await axios.post("http://localhost:3000/login", {
      email: email,
      password: password
    }, config);
    console.log("Login:", data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
    navigate("/home");
    toast({
      title: 'Login Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    }
    catch (err) {
      toast({
        title: 'Error Occured',
        description: "Username or Password is incorrect",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      height={"100vh"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        w={"50%"}
        h={"450px"}
        border={"2px solid red"}
        borderRadius={10}
      >
        <Text
          fontSize={"5xl"}
          fontFamily={"Work sans"}
          m={4}
          p={1}
        >Login</Text>

        <FormControl>
          <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter Email:</FormLabel>
          <Input placeholder='enter email' value={email} type='text' m={1} w={"90%"} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter password:</FormLabel>
          <InputGroup size='md' w={"90%"} value={password}>
            <Input
              type={show ? 'text' : 'password'}
              placeholder='enter password' onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Text>
          If not have account{' '}
          <Link color='teal.500' href='http://localhost:5173/register'>
            sign in
          </Link>
        </Text>
        <Button m={6} onClick={loginUser} >Login</Button>
      </Box>
    </Box>
  )
}

export default Login;
