import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { Button } from '@mantine/core';
import { useState } from 'react'

export default function Home() {
  const [response, setResponse] = useState([])

  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      const response = await fetch("/api/callOpenAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem : '温暖化' }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResponse(data.result)
      console.log(JSON.parse(data.result))
      setResponse(JSON.parse(data.result))
    } catch(error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
    <Button onClick={onSubmit} variant="outline" color="teal" size="md">
      Settings
    </Button>
    {/* {response.map((test) => {
      return (
          <p>{test}</p>
      );
    })} */}
    </>
  )
}
