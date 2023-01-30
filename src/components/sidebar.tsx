import { selectIdea } from "@/redux/ideaSlice";
import { Button, Navbar } from "@mantine/core";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";


export const Sidebar = () => {
    const dispatch = useDispatch();
    const idea = useSelector(selectIdea);
    
    return(
        <>
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
        </>
    )
}