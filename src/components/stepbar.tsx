// ライブラリインポート
import { Stepper } from '@mantine/core';

// 状態管理
import { useSelector } from "react-redux";
import { selectCount} from '../redux/counterSlice'
import { createStyles} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    stepbar:{
        marginTop:-10,
        [`@media (max-width: 2000px)`]: {
            // display:"block",
        // marginTop:100
        },
        '@media (max-width:800px)': {
        // display: 'none',
        },
    },
	
}));

const Stepbar = () => {
	// 状態管理
	const selector = useSelector(selectCount);
	const { classes } = useStyles();

	return (
		
		<>
			<div className={classes.stepbar}>
				<Stepper size="xs" iconSize={30} color="yellow" active={selector} onStepClick={selector} >
					<Stepper.Step label="課題" ></Stepper.Step>
					<Stepper.Step label="解決策の提案" ></Stepper.Step>
					<Stepper.Step label="ドキュメント化" ></Stepper.Step>
				</Stepper>
			</div>
		</>
	)
}       

export default Stepbar