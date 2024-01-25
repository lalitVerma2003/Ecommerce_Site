import React, { useState, useEffect } from 'react'
import { Box, Input, Button, FormControl, FormLabel, useToast, InputGroup, InputRightElement, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { DataState } from '../../config/DataProvider';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

axios.defaults.withCredentials = true;
const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4)
    .max(20)
    .refine((value)=> /[A-Z]/.test(value),{
        message: 'Password must contain at least one uppercase letter'
    })
    .refine((value)=> /[a-z]/.test(value),{
      message: 'Password must contain at least one lowercase letter'
    })
    .refine((value)=> /\d/.test(value),{
      message: 'Password must contain at least one digit',
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
      message: 'Password must contain at least one special character',
    })
});

const Login = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const { setUser } = DataState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      navigate('/home');
    }
  })

  const loginUser = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }
      const { data } = await axios.post("http://localhost:3000/login", {
        email: formData.email,
        password: formData.password
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
        h={"auto"}
        p={5}
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
          <Input placeholder='enter email' type='text' m={1} w={"90%"} {...register("email")} />
          {errors.email && <Text m={2} color={"red"} >*{errors.email.message}</Text>}
        </FormControl>

        <FormControl>
          <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter password:</FormLabel>
          <InputGroup size='md' w={"90%"} >
            <Input
              type={show ? 'text' : 'password'}
              placeholder='enter password' {...register("password")}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && <Text m={2} color={"red"} >*{errors.password.message}</Text>}
        </FormControl>
        <Text>
          If do not have account{' '}
          <Link color='teal.500' href='http://localhost:5173/register'>
            sign in
          </Link>
        </Text>
        <Button m={6} onClick={handleSubmit(loginUser)} isDisabled={isSubmitting ? true : false} >{isSubmitting ? "Logging..." : "Login"}</Button>
        <Text>{errors.root && errors.root.message}</Text>
      </Box>
    </Box>
  )
}

export default Login;