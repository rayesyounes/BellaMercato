import {Outlet} from "react-router-dom";
import {Grid, GridItem} from "@chakra-ui/react";
import AdminPanel from "../components/panels/AdminPanel.jsx";

function AdminLayout() {
    return (
        <>
            <Grid templateColumns='auto 1fr' bg="gray.100" h='100vh'>
                <GridItem>
                    <AdminPanel/>
                </GridItem>
                <GridItem>

                    <Outlet/>
                </GridItem>
            </Grid>
        </>
    );
}

export default AdminLayout;
