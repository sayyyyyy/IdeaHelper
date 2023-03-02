// ライブラリインポート
import { Inter } from '@next/font/google'
import { Button, Group, Card,Text, Center,Header } from '@mantine/core';
import { useRouter } from "next/router";

// コンポーネントインポート
import Stepbar from '@/components/stepbar'

// 状態管理
import { useDispatch, useSelector } from "react-redux";
import { counterSlice, selectCount } from "../redux/counterSlice";
import { setIdea } from '@/redux/ideaSlice'
import { selectIdeaList } from "../redux/idealistSlice";
import { createStyles} from '@mantine/core';

const inter = Inter({ subsets: ['latin'] })
const useStyles = createStyles((theme) => ({
	header: {
		backgroundColor: theme.fn.variant({ variant: 'filled', color: "yellow" }).background,
		borderBottom: 0,
		height: 100,
		maxHeight: 100,
		marginLeft:-16,
		marginRight:-16,
		[`@media (max-width:2000px)`]: {
		  	display: 'none',
		},
		'@media (max-width:800px)': {
		  	display:"block",
		  	// marginLeft:16,
		  	// marginRight:16
		},
	  },
	cards:{
		[`@media (max-width: 2000px)`]: {
			// width: 280,
			// marginTop:'100px',
			// marginRight:'50px',
			// display:'flex'
			justifyContent:"center",
			display:'flex',
			marginTop:50,
		},
		'@media (max-width:800px)': {
			display: 'block',
			justifyContent:"center",
			alignItems:"center",
			textAlign:"center",
			width: "80%",
  			margin: "auto",	
		},
	},
	card:{
		[`@media (max-width: 2000px)`]: {
			// width: 280,
			marginTop:40,
			marginLeft:10,
			marginRight:10,

			// marginRight:'50px',
			// display:'flex'
		},
		'@media (max-width:800px)': {
		},
	},
	cardContainer:{
		[`@media (max-width: 2000px)`]: {
			width:300,
			height:200
		},
		[`@media (max-width: 1200px)`]: {
			width:240,
			height:200
		},
		'@media (max-width:1000px)': {
			// display: 'none',
			width: 180,
    		height: 250
		},
		'@media (max-width:800px)': {
		// display: 'none',
			width:'100%',
			height:200
		},
	},
	button:{
		width:"100%"
	},
}));

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

	const { classes } = useStyles();

	return (
		<>
		<Header height={56} className={classes.header} mb={120}></Header>
		<Stepbar />

		<div className={classes.cards} >
			{ideaList.map((idea:string ,index:number) =>{
				return(
					<>
					<div className={classes.card}key={index}>
						<div>
							<Card shadow="sm" p="lg" radius="md" withBorder className={classes.cardContainer}>
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
								<Button onClick={() => moveDucument(idea)} variant="filled" mt="md" color="yellow" size="md" className={classes.button}>
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


