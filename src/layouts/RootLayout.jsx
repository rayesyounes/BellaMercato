import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {Grid, GridItem} from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../features/categories/categoriesAction.js";
import {getBrands} from "../features/brands/brandsAction.js";

export default function RootLayout() {
    const dispatch = useDispatch();
    const {isAuthenticated, isAdmin, error} = useSelector(
        (state) => state.auth
    );
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getBrands());
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            if (isAdmin) {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        }
    }, [isAuthenticated, isAdmin, error, navigate]);

    return (
        <Grid bg="gray.100">
            {!isAdmin && (
                <GridItem className="sticky-header" gridColumn={"1 / -1"}>
                    <Header/>
                </GridItem>
            )}
            <GridItem>
                <Outlet/>
            </GridItem>
            {!isAdmin && (
                <GridItem gridColumn={"1 / -1"}>
                    <Footer/>
                </GridItem>
            )}
        </Grid>
    );
}
