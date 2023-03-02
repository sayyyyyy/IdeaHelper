// ライブラリインポート
import router from "next/router";
import { Button, Navbar } from "@mantine/core";

// 状態管理
import { useDispatch, useSelector } from "react-redux";
import { selectIdea } from "@/redux/ideaSlice";
import { createStyles} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    sidebar:{
        marginTop:-70,
        [`@media (max-width: 2000px)`]: {
            // display:"block",
        // marginTop:100
        },
        '@media (max-width:800px)': {
        // display: 'none',
        },
    },
}));


export const Sidebar = () => {
    const idea = useSelector(selectIdea);
    const { classes } = useStyles();
    
    return(
        <>
        <div className={classes.sidebar}> 
            <Navbar.Section  mt="md" >
                <img src='app_icon.png' />
            </Navbar.Section>
            <hr />
            {(() => {
                if (idea) {
                    return (
                        <Navbar.Section mt="md" className="border-b-2 p-3 text-md text-gray-600 font-bold">{idea}</Navbar.Section>
                    )
                }
            })()}
            <Navbar.Section  mt="md">
                <Button variant="light" color="yellow" mt="md" ml="md" radius="md" onClick={() => router.push("/")}>
                    ＋
                </Button>
            </Navbar.Section>
            </div>
        </>
    )
}