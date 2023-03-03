// ライブラリインポート
import { useState } from 'react';
import { useRouter } from "next/router";
import { createStyles,Textarea, Avatar, Button, ScrollArea, Group, Text, Paper ,Center, LoadingOverlay,Header} from '@mantine/core';
import { FileText } from 'tabler-icons-react';

// 環境変数
import { useDispatch, useSelector } from "react-redux";
import { counterSlice, selectCount } from "../redux/counterSlice";
import { selectIdea } from '@/redux/ideaSlice';
import { setChatList, selectChatList } from '@/redux/chatListSlice';

const useStyles = createStyles((theme) => ({
	none: {
		display:"none",
		backgroundColor: theme.fn.variant({ variant: 'filled', color: "yellow" }).background,
		borderBottom: 0,
		height: 100,
		maxHeight: 100,
		marginLeft:-16,
		marginRight:-16,
	},
	chatHeaderBackground:{
		position:"fixed" ,
		backgroundColor:"#FFFFFF",
		width:"100%",
		height:120 ,
		zIndex:1 ,
		marginTop:-20,
		'@media (max-width:800px)': {
			height:60 ,
		},
	},
	chatHeader:{
		backgroundColor:"#FCC419",
		width:"100%",
		display:"flex",
		height:80,
		position:"fixed",
		zIndex:2,
		marginTop:-50,
		paddingLeft:5,
		[`@media (max-width:2000px)`]: {
			// display: 'none',
			width:"89%",
		},
		[`@media (max-width:1800px)`]: {
			// display: 'none',
			width:"88%",
		},
		[`@media (max-width:1600px)`]: {
			// display: 'none',
			width:"86%",
			fontSize:"14px"
		},
		[`@media (max-width:1400px)`]: {
			// display: 'none',
			width:"84%",
			fontSize:"12px"
		},
		[`@media (max-width:1200px)`]: {
			// display: 'none',
			width:"82%",
			fontSize:"12px"
		},
		'@media (max-width:1000px)': {
			width:"80%",
			fontSize:"10px"
		},
		'@media (max-width:800px)': {
			width:"100%",
			fontSize:"8px",
			marginTop: "-80px"
		},
		'@media (max-width:400px)': {
			fontSize:"3px"
			
		},
	},
	backButton:{
		marginLeft: 20,
		position:"absolute", 
		left: 0,
		width: "64px",
	},
	documentButton:{
		backgroundColor:"#FCC419",
		color:"white" ,
		position:"absolute", 
		right: 0,
		marginRight: 30
	},
	chatHeaderTitle:{
		color:"white",
		fontWeight:"bold",
		textAlign:"center",
		width:"70%",
		paddingTop:"20px",
		paddingBottom:"20px",
		// overflow-x-scroll
		'@media (max-width:1500px)': {
			width:"70%"
		},
		'@media (max-width:1000px)': {
			width:"70%"
		},
		'@media (max-width:800px)': {
			width:"70%"
		},
		'@media (max-width:600px)': {
			width:"55%"
		},
		'@media (max-width:400px)': {
			width:"40%"
		},
	},
	scrollArea:{
		marginTop:"50px",
		height:"70%",
		'@media (max-width:800px)': {
			marginTop:"100px"
		},
	}
}))

export default function Top() {
	// 環境変数
    const dispatch = useDispatch();
    const selector = useSelector(selectCount);
    const { increment } = counterSlice.actions;
    const idea = useSelector(selectIdea);
    const chatList = useSelector(selectChatList)

    const [message,setMessage] = useState("")
    const [isLoading, setLoading] = useState(false)

	const router = useRouter()
	const { classes } = useStyles();

    const moveBack=()=>{
      	router.push("/solve")
    }

	const moveDucumet=()=>{
		dispatch(increment());
		router.push("/document");
	}

	async function sendChat(event: any) {
		const question = message

		event.preventDefault();
		setLoading(true)
		try {
			const response = await fetch("/api/sendChat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ idea: idea, question : question }),
			});

			const data = await response.json();
			if (response.status !== 200) {
			console.log(data.error)
			return
			}

			dispatch(setChatList([...chatList, {'sender': 'user', 'data': question}, {'sender': 'openai', 'data': data.result}]))
			setMessage('')
			setLoading(false)
		} catch(error: any) {
			setLoading(false)
			console.error(error);
		}
	}
   
    return (
    <>
	<Header height={56} className={classes.none} mb={120}> </Header>
	{/* タイトル */}
	<div className={classes.chatHeaderBackground}>
		<header className={classes.chatHeader}>
			<Center style={{width:"100%"}}>
				<Button variant="light" color="yellow" size="md" onClick={moveBack}  className={classes.backButton}> ＜ </Button>
				<h1 className={classes.chatHeaderTitle}>{idea}</h1>
				<button onClick={moveDucumet} className={classes.documentButton}>
					<FileText
						size={52}
						strokeWidth={2}
					/>
				</button>
			</Center>
		</header>
    </div>
      
	{/* チャット部分 */}
	<ScrollArea className={classes.scrollArea}>
	{
		chatList.map((chat: {sender: string, data: string}) =>
			{if (chat.sender == 'user') {
				return (
					<>
					<div key={chat.data} className={classes.scrollArea}>
						<Group style={{ marginTop: 50 ,marginBottom:50,display:'flex',justifyContent: "flex-end",color:"pink"}}>
						<div style={{ width: 400,backgroundColor:"yellow"}} >
							<Paper shadow="xs" p="md" color="yellow">
								<Text >
								{chat.data}
								</Text>
							</Paper>
						</div>
						</Group>
					</div>
					</>
				)
			} else {
				return (
					<>
					<div key={chat.sender}>
						<Group style={{ marginTop: 50}}>
						<Avatar radius="xl" />
						<div style={{ width: 400}} >
							<Paper shadow="xs" p="md" color="yellow">
								<Text color="yellow">
								{chat.data}
								</Text>
							</Paper>
						</div>
						</Group>
					
					</div>
					</>
				)
			}}
		)
	}
	</ScrollArea>

	{/* メッセージ入力 */}
	<Center style={{display:'flex' ,bottom: "0",position:"fixed",marginBottom:10, backgroundColor:"white",justifyContent:"center",width:"100%",marginLeft:"-10%"}}>
		<Textarea
		placeholder="メッセージを記入してください"
		withAsterisk
		style={{ width:'50%',marginRight:20}}
		value={message}
		onChange={(event) => setMessage(event.currentTarget.value)}
		/>
		<Button variant="light" color="yellow.7" size="md" onClick={sendChat} disabled={isLoading} style={{backgroundColor:"#FAB005",color:"white"}}>
			{(() => {
				if (isLoading) {
					return (
						<LoadingOverlay
						loaderProps={{ size: 'md', color: 'yellow', variant: 'oval' }}
						visible
						/>
					)
				} else {
					return '送信'
				}
			})()}
		</Button>
	</Center>
    </>
  )
}
