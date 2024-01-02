import { Outlet } from "react-router-dom";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
    return (
        <div className="rootlayout">
            <Box >
                <Grid
                    // templateColumns={"repeat(12, 1fr)"}
                    // templateRows={"auto 8fr 1fr"}
                    bg="gray.300"
                    // h={"100vh"}
                >
                    <GridItem gridColumn={"1 / -1"}>
                        <Header />
                    </GridItem>
                    <GridItem>
                        <Outlet />
                    </GridItem>
                    <GridItem gridColumn={"1 / -1"}>
                        <Footer />
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
}
