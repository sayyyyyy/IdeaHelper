import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Stepbar from '@/components/stepbar'
import { AppShell,Stepper, Button, Group, LoadingOverlay } from '@mantine/core';
// import { counterSlice, CounterState, store,selectCount, ideaSlice, selectIdea} from "./_app";
import { counterSlice } from "../redux/counterSlice";
import { selectIdeaList, setIdeaList } from "../redux/idealistSlice";
import { selectTitleList,addTitleList } from '@/redux/titleListSlice'
import { useRouter } from "next/router";

export default function Home() {
	const dispatch = useDispatch();
	const { increment,decrement } = counterSlice.actions;
	const [text,setText] = useState("")
	const router = useRouter()
	const ideaList = useSelector(selectIdeaList);
	const TitleList = useSelector(selectTitleList);

	const [isLoading, setLoading] = useState(false)

	async function generateIdea(event: any) {
		dispatch(addTitleList(text))
		let errorCount = 0
		setLoading(true)

		try {
			const response = await fetch("/api/generateIdea", {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({ problem : text }),
			});

			const data = await response.json();
			if (response.status !== 200) {
				console.log(data.error)
				return 
			}

			// 取得データの整形
			const formatIdeaList = data.result.replaceAll('\n', '').replaceAll('。', '').replaceAll('\\', '').split(',')
			const changeArray = []
			for (const formatIdea of formatIdeaList) {
				changeArray.push(JSON.parse(formatIdea).idea)
			}

			dispatch(setIdeaList(changeArray))
			dispatch(increment())

			// ローディング終了
			setLoading(false)
			router.push("/solve");
		} catch(error: any) {
			errorCount++
			generateIdea(event)

			console.error(error);
		}
	}

	const generateIdeaWithoutProblem = async (junre: string) => {
		let errorCount = 0
		setLoading(true)

		try {
			const response = await fetch("/api/generateIdeaWithoutProblem", {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({ junre : junre }),
			});

			const data = await response.json();
			if (response.status !== 200) {
				console.log(data.error)
				return 
			}

			// 取得データの整形
			const formatIdeaList = data.result.replaceAll('\n', '').replaceAll('。', '').replaceAll('\\', '').split(',')
			const changeArray = []
			for (const formatIdea of formatIdeaList) {
				changeArray.push(JSON.parse(formatIdea).idea)
			}

			dispatch(setIdeaList(changeArray))
			dispatch(increment())
			setLoading(false)
			router.push("/solve");
		} catch(error: any) {
			errorCount++
			generateIdea(junre)
			setLoading(false)
		}
	}

	return (
		<>
			{(() => {
				if (isLoading) {
					return (
						<LoadingOverlay
							loaderProps={{ size: 'md', color: 'yellow', variant: 'bars' }}
							overlayOpacity={0.6}
							overlayColor="#c5c5c5"
							visible
						/>
					)
				}
			})()}
			<Stepbar />
			<br />
			<h1 className ="flex justify-center mt-20 font-bold" >あなたが解決したい課題を教えてください</h1>
			<div className="flex justify-center mt-5">
				<input className=" mt-1 shadow appearance-none border rounded h-14 w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={text} onChange={(event)=>setText(event.target.value)}/>
			</div>

			<Group position="center" mt={100}>
				<Button onClick={generateIdea} variant="filled" color="yellow" size="md">
					解決策の提案
				</Button>
			</Group>
			<button onClick={() => {generateIdeaWithoutProblem('面白い')}}>面白い</button>
			<button onClick={() => {generateIdeaWithoutProblem('便利な')}}>便利</button>
			<button onClick={() => {generateIdeaWithoutProblem('使いやすい')}}>使いやすい</button>
		</>
	)
}
