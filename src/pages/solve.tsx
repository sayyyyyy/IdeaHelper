import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { Button } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { counterSlice, CounterState, store,selectCount } from "./_app";

export default function solve() {
  const dispatch = useDispatch();
  const selector = useSelector(selectCount);
  const { increment } = counterSlice.actions;

  return (
    <>
      <Button variant="outline" color="teal" size="md">
        Settings
      </Button>

      <p>selector.value</p>
      <p>{selector}</p>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Click
      </button>
    </>
  )
}


