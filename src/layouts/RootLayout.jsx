import {Outlet} from "react-router-dom";
import {Grid, GridItem, Box} from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useSelector} from "react-redux";

export default function RootLayout() {
    const {isAdmin} = useSelector((state) => state.auth);
    return (<>
        <Grid bg="gray.300">
            {!isAdmin && (<GridItem gridColumn={"1 / -1"}>
                <Header/>
            </GridItem>)}
            <GridItem>
                <Outlet/>
            </GridItem>
            {!isAdmin && (<GridItem gridColumn={"1 / -1"}>
                <Footer/>
            </GridItem>)}
        </Grid>
    </>);
}
