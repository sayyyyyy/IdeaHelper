import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { Button } from '@mantine/core';

export default function Home() {
  return (
    <>
    <Button variant="outline" color="teal" size="md">
      Settings
    </Button>
    </>
  )
}
