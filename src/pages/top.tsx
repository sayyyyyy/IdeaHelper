import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })
import { AppShell,Stepper, Button, Group } from '@mantine/core';
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState, store,selectCount } from "./_app";
import Stepbar from '@/components/stepbar';
// import { decrease,increase } from '../redux/activeSlice';
// import { useSelector } from '../redux/store'

// import Sidebar from '../components/sidebar'

export default function Top() {
    const dispatch = useDispatch();
    const selector = useSelector(selectCount);
    const { increment,decrement } = counterSlice.actions;

    const router = useRouter()
    // const [active, setActive] = useState(0);
    // const nextStep = () => {
    //     setActive(selector)
    //     // router.push('/solve')
    // };
    // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const [text,setText] = useState("")
   
    
    return (
    <>

        <Stepbar />
        <h1 className ="flex justify-center">あなたが解決したい課題はなんですか？</h1>
        <div className="flex justify-center">
            <input className=" mt-3 shadow appearance-none border rounded h-14 w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={text} onChange={(event)=>setText(event.target.value)}/>
        </div>

        <Group position="center" mt="xl">
            <Button variant="default" onClick={() => {dispatch(increment());}}>
                Back
            </Button>
            <Button variant="outline" color="yellow" size="md" onClick={() => {dispatch(decrement());router.push('/chat')}}>
              解決策の提案
            </Button>
        </Group>
        {/* <h1>Count: {count}</h1>
      <button onClick={() => dispatch(decrease())}>Down</button>
      <button onClick={() => dispatch(increase())}>Up</button> */}
    {/* <Sidebar /> */}
    </>
  )
}

