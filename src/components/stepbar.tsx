// ライブラリインポート
import { Stepper } from '@mantine/core';

// 状態管理
import { useSelector } from "react-redux";
import { selectCount} from '../redux/counterSlice'

const Stepbar = () => {
	// 状態管理
	const selector = useSelector(selectCount);

	return (
		<>
			<div className="mt-5">
				<Stepper color="yellow" active={selector} onStepClick={selector} breakpoint="sm">
					<Stepper.Step label="課題"></Stepper.Step>
					<Stepper.Step label="解決策の提案" ></Stepper.Step>
					<Stepper.Step label="ドキュメント化" ></Stepper.Step>
				</Stepper>
			</div>
		</>
	)
}       

export default Stepbar