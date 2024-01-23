import { useState } from "react";
import axios from 'axios';
import { DataState } from '../../config/DataProvider';
import { Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { InputGroup } from '@chakra-ui/react';
import { InputRightElement } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";


function Register() {
    const [username, setUsername] = useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");
    const [email,setEmail]=useState("");
    const [show,setShow]=useState(false);

    const toast=useToast();
    const navigate=useNavigate();
    const {user,setUser}=DataState();

    const handleForm = async () => {
        // console.log("Registering...");
        try{
            const config={
                headers:{
                    "Content-type":"application/json"
                }
            }
            const {data}=await axios.post("http://localhost:3000/register",{
                username,password,email,role
            },config);
            console.log("Register",data);
            localStorage.setItem("userInfo",JSON.stringify(data));
            setUser(data);
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            navigate('/home');
        }
        catch(err){
            toast({
                title: 'Error Occured',
                description: "Fill the form correctfully",
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
        h={"650px"}
        border={"2px solid red"}
        borderRadius={10}
    >
      <Text
        fontSize={"5xl"}
        fontFamily={"Work sans"}
        m={4}
        p={1}
      >REGISTER</Text>

        <FormControl>
        <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter name:</FormLabel>
      <Input placeholder='enter name' value={username} type='text' m={1} w={"90%"} onChange={(e)=> setUsername(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter Email:</FormLabel>
      <Input placeholder='enter email' value={email} type='text' m={1} w={"90%"} onChange={(e)=> setEmail(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter password:</FormLabel>
      <InputGroup size='md'  w={"90%"} value={password}>
      <Input
        type={show ? 'text' : 'password'}
        placeholder='enter password' onChange={(e)=> setPassword(e.target.value)}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={()=> setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    </FormControl>

    <FormControl>
        <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter role:</FormLabel>
      <Input placeholder='enter role' value={role} type='text' m={1} w={"90%"} onChange={(e)=> setRole(e.target.value)} />
      </FormControl>

    <Button m={8} onClick={handleForm} >Register</Button>
    </Box>
    </Box>
    );
}

export default Register;