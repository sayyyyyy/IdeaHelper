import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { Button } from '@mantine/core';
import { useState } from 'react'

export default function Home() {
  const [ideaList, setIdeaList] = useState([])

  async function onSubmit(event: any) {
    let errorCount = 0
    event.preventDefault();
    try {
      const response = await fetch("/api/generateIdea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem : '温暖化' }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        console.log(data.error)
        return 
      }

      console.log(data.result)

      // 取得データの整形
      const formatIdeaList = data.result.replaceAll('\n', '').replaceAll('。', '').replaceAll('\\', '').split(',')
      const changeArray = []

      for (const formatIdea of formatIdeaList) {
        changeArray.push(JSON.parse(formatIdea).idea)
      }
      
      setIdeaList(changeArray)
      console.log(ideaList)
    } catch(error: any) {
      errorCount++
      onSubmit(event)

      console.error(error);
    }
  }

  return (
    <>
      <Button onClick={onSubmit} variant="outline" color="teal" size="md">
        Settings
      </Button>
      {
        ideaList.map((idea) =>
          <p key={idea}>{idea}</p>
        )
      }
    </>
  )
}
