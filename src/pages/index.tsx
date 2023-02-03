// ライブラリインポート
import { Inter } from '@next/font/google'
import { useState } from 'react'
import { Button, Group, LoadingOverlay } from '@mantine/core';
import { useRouter } from "next/router";

// 環境変数
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../redux/counterSlice";
import { selectIdeaList, setIdeaList } from "../redux/idealistSlice";
import { selectTitleList,addTitleList } from '@/redux/titleListSlice'

// コンポーネントインポート
import Stepbar from '@/components/stepbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const dispatch = useDispatch();
	const { increment,decrement } = counterSlice.actions;
	const ideaList = useSelector(selectIdeaList);
	const TitleList = useSelector(selectTitleList);

	const [text,setText] = useState("")
	const [isLoading, setLoading] = useState(false)

	const router = useRouter()
	

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
				console.error(data.error)
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
			// 毎回正しい形式でレスポンスが返ってくる訳ではないので、再起している
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
			// 毎回正しい形式でレスポンスが返ってくる訳ではないので、再起している
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
				<input autoComplete='off' className=" mt-1 shadow appearance-none border rounded h-14 w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={text} onChange={(event)=>setText(event.target.value)}/>
			</div>

			<Group position="center" mt={100}>
				<Button onClick={generateIdea} variant="filled" color="yellow" size="md">
					解決策の提案
				</Button>
			</Group>
			
			<h2 className='flex justify-center mt-24 font-bold text-3xl'>課題なしで生成</h2>
			<div className='flex justify-center mt-4'>
				<Button className='m-4' color="yellow" radius="lg" size="lg" onClick={() => {generateIdeaWithoutProblem('面白い')}}>
					面白い
				</Button>
				<Button className='m-4' color="yellow" radius="lg" size="lg" onClick={() => {generateIdeaWithoutProblem('便利')}}>
					便利
				</Button>
				<Button className='m-4' color="yellow" radius="lg" size="lg" onClick={() => {generateIdeaWithoutProblem('使いやすい')}}>
					使いやすい
				</Button>
			</div>
		</>
	)
}
