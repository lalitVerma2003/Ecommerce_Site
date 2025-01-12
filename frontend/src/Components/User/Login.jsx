import React, { useState, useEffect } from 'react'
import { Box, Input, Button, FormControl, FormLabel, useToast, InputGroup, InputRightElement, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { login } from '../../store/userSlice/userSlice';
import { closeModal, openModal,  setUserToken } from '../../store/tokenSlice/tokenSlice';

axios.defaults.withCredentials = true;
const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4)
    .max(20)
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter'
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter'
    })
    .refine((value) => /\d/.test(value), {
      message: 'Password must contain at least one digit',
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
      message: 'Password must contain at least one special character',
    })
});

const Login = () => {
  const {loading,error}= useSelector(state => state.user);
  const [show,setShow]=useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      navigate("/");
    }
  })

  const loginUser = async (formData) => {
    await dispatch(login({ email: formData.email, password: formData.password }));
    await dispatch(setUserToken());
    if (error==null) {
      toast({
        title: 'Login Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: error,
        description: "Username or Password is incorrect",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleLoginGogle=async()=>{
    // It does not work yet , gives axios error.
    // const {data}=await axios.get("http://localhost:3000/auth/google/callback");
    // console.log(data);
    window.open("http://localhost:3000/auth/google/callback","_self");
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
        >LOGIN</Text>

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
        <Button m={6} onClick={handleSubmit(loginUser)} isDisabled={loading ? true : false} >{loading ? "Logging..." : "Login"}</Button>
        <Text>{errors.root && errors.root.message}</Text>
        <Button onClick={handleLoginGogle} >Sign by google</Button>
      </Box>
    </Box>
  )
}

export default Login;