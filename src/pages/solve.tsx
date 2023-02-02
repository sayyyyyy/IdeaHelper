// ライブラリインポート
import { Inter } from '@next/font/google'
import { Button, Group, Card,Text, Center } from '@mantine/core';
import { useRouter } from "next/router";

// コンポーネントインポート
import Stepbar from '@/components/stepbar'

// 状態管理
import { useDispatch, useSelector } from "react-redux";
import { counterSlice, selectCount } from "../redux/counterSlice";
import { setIdea } from '@/redux/ideaSlice'
import { selectIdeaList } from "../redux/idealistSlice";

const inter = Inter({ subsets: ['latin'] })

export default function Solve() {
	// 状態管理
	const dispatch = useDispatch();
	const { increment, decrement } = counterSlice.actions;
	const ideaList = useSelector(selectIdeaList);
	
	const router = useRouter()

	const moveDucument = (idea: string)=>{
		dispatch(setIdea(idea))
		dispatch(increment());
		router.push("/document");
	}

	const moveChat = (idea: string) => {
		dispatch(setIdea(idea))
		router.push("/chat")
	}

	return (
		<>
		<Stepbar />

		
		<div style={{ justifyContent:"center",display:'flex',marginTop:20}} >
			{ideaList.map((idea:string ,index:number) =>{
				return(
					<>
					<div style={{ width: 280,marginTop:'100px',marginRight:'50px',display:'flex'}} key={index}>
						<div>
							<Card shadow="sm" p="lg" radius="md" withBorder style={{width:300,height:200}}>
								<Group position="center" mt="md" mb="xs" >
									<Text weight={500}>{idea}</Text>
								</Group>  
								<Center >     
									<Button variant="light" color="yellow" mt="md" radius="md" onClick={() => moveChat(idea)} style={{position:"absolute", bottom: 0,width:"70%",marginBottom:20}}>
									もっと深ぼる
									</Button>
								</Center>
							</Card>
							<Center >
								<Button onClick={() => moveDucument(idea)} variant="filled" mt="md" color="yellow" size="md" style={{width:200}}>
									ドキュメント化
								</Button>
							</Center>
						</div>
					</div>
					</>
				)}
			)}
		</div>

		<Group position="center" mt="80px">
			<Button variant="default" onClick={() => {dispatch(decrement());router.push("/");}}>
			戻る
			</Button>
		</Group>
		</>
	)
}


