import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../features/page/PageAction.js";
import {motion} from "framer-motion";
import {Box, Container} from "@chakra-ui/react";

export default function Sales() {
    const dispatch = useDispatch();
    const MotionBox = motion(Box);

    useEffect(() => {
        dispatch(setCurrentPage("sales"));
    }, [dispatch]);

    return (
        <Container maxW="container.xxl" px={"5%"} my={4}>
            <MotionBox
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.9}}
            >

                <h1>Sales / Under construction</h1>

            </MotionBox>
        </Container>
    );
}
