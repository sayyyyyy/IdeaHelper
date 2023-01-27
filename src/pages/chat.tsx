import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState,selectCount } from "../redux/counterSlice";
import { Textarea } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons';


export default function Top() {
    const dispatch = useDispatch();
    const selector = useSelector(selectCount);
    const { increment,decrement } = counterSlice.actions;

    const router = useRouter()
    const [text,setText] = useState("")
   
    
    return (
    <>
      <h1 className ="flex justify-center">地球温暖化</h1>
      <Avatar src="avatar.png" alt="it's me" />
      <Textarea
      placeholder="Your comment"
      label="Your comment"
      withAsterisk
    />
    </>
  )
}

