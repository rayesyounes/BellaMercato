import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Navbar.jsx";
import Aside from "../components/Aside.jsx";

export default function RootLayout() {
    return (
        <div className="rootlayout" >
            <Grid templateColumns="repeat(6, 1fr)" templateRows={"auto 1fr"} bg="gray.300" h={"100vh"}>
                <GridItem gridColumn={"1 / -1"}>
                    <Navbar />
                </GridItem>
                <GridItem bg="purple.300" h={"max-height"} colSpan={1}>
                    <Aside />
                </GridItem>
                <GridItem h={"max-height"} colSpan={5}>
                    <Outlet />
                </GridItem>
            </Grid>
        </div>
    );
}
