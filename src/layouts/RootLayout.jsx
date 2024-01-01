import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
    return (
        <div className="rootlayout">
            <Grid
                // templateColumns={"repeat(12, 1fr)"}
                // templateRows={"auto 8fr 1fr"}
                bg="gray.300"
                // h={"100vh"}
            >
                <GridItem gridColumn={"1 / -1"}>
                    <Navbar />
                </GridItem>
                <GridItem>
                    <Outlet />
                </GridItem>
                <GridItem gridColumn={"1 / -1"}>
                    <Footer />
                </GridItem>
            </Grid>
        </div>
    );
}
