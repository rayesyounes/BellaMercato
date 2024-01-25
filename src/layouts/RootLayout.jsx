import {Outlet, useNavigate} from "react-router-dom";
import {Grid, GridItem, Box} from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export default function RootLayout() {
    const {isAuthenticated, isAdmin, error} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            if (isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [isAuthenticated, isAdmin, error, navigate]);

    return (<>
        <Grid bg="gray.100">
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
