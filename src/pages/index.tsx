import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { Button,Stepper  } from '@mantine/core';
// import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <>
    <Stepper color="yellow" size="md" active={1}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 2" description="Verify email" />
    </Stepper>
    <h1 className ="flex justify-center">あなたが解決したい課題はなんですか？</h1>

    <Button variant="outline" color="yellow" size="md">
    解決策の提案
    </Button>
    {/* <Sidebar /> */}
    </>
  )
}
