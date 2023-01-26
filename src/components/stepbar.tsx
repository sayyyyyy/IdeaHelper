import { Stepper, Button, Group } from '@mantine/core';
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { counterSlice, CounterState, store,selectCount } from "../pages/_app";
import {counterSlice, CounterState, selectCount} from '../redux/counterSlice'
const Stepbar = () => {
        // const [active, setActive] = useState(1);
        // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
        // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
        const dispatch = useDispatch();
        const selector = useSelector(selectCount);
        const { increment,decrement } = counterSlice.actions;

        return (
            <>
              <Stepper color="yellow" active={selector} onStepClick={selector} breakpoint="sm">
                  <Stepper.Step label="First step" description="Create an account">
                    Step 1 content: Create an account
                  </Stepper.Step>
                  <Stepper.Step label="Second step" description="Verify email">
                    Step 2 content: Verify email
                  </Stepper.Step>
                  <Stepper.Step label="Final step" description="Get full access">
                    Step 3 content: Get full access
                  </Stepper.Step>
                  <Stepper.Completed>
                    Completed, click back button to get to previous step
                  </Stepper.Completed>
              </Stepper>
              </>
            )
}       

export default Stepbar