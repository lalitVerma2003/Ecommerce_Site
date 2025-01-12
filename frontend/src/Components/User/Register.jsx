import { useEffect, useState } from "react";
import { Box, Input, Button, FormControl, FormLabel, useToast, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { registered } from "../../store/userSlice/userSlice";

const schema = z.object({
  username: z.string().min(5).max(15),
  email: z.string().email(),
  role: z.string().min(2),
  password: z
    .string()
    .min(6)
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

function Register() {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  const {user}=useSelector(state=> state.user);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(user)
      navigate("/");
  });

  const handleForm = async (formData) => {
    const { username, password, email, role } = formData;
    dispatch(registered({username, password, email, role}));
  }

  const registerGuestUser=async()=>{
    const random=Math.floor(Math.random()*100000);
    const email=`guest${random}@gmail.com`;
    const password=`Guest@${random}`;
    const username=`guest${random}`;
    dispatch(registered({username, password, email}));
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
          <Input placeholder='enter name' type='text' m={1} w={"90%"} {...register("username")} />
        </FormControl>
        {errors.username && <Text m={2} color={"red"} >*{errors.username.message}</Text>}

        <FormControl>
          <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter Email:</FormLabel>
          <Input placeholder='enter email' type='text' m={1} w={"90%"} {...register("email")} />
        </FormControl>
        {errors.email && <Text m={2} color={"red"} >*{errors.email.message}</Text>}

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
        </FormControl>
        {errors.password && <Text m={2} color={"red"} >*{errors.password.message}</Text>}

        <FormControl>
          <FormLabel fontSize={"xl"} fontFamily={"Work sans"} m={3}  >Enter role:</FormLabel>
          <Input placeholder='enter role' type='text' m={1} w={"90%"} {...register("role")} />
        </FormControl>
        {errors.role && <Text m={2} color={"red"} >*{errors.role.message}</Text>}

        <Button mt={8} onClick={handleSubmit(handleForm)} isDisabled={isSubmitting?true:false} >{isSubmitting?"Registering...":"Register"}</Button>
        <Button m={2} onClick={registerGuestUser} isDisabled={isSubmitting ? true : false} >{isSubmitting ? "Logging..." : "Login as a guest"}</Button>
      </Box>
    </Box>
  );
}

export default Register;