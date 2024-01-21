import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logoutAuth} from "../../features/auth/authAction.js";


export default function HeaderMenu({children}) {
    const {isAdmin} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const SignOut = () => {
        navigate("/");
        dispatch(logoutAuth());
    }

    return (<Menu>
            <MenuButton>
                {children}
            </MenuButton>
            <MenuList>
                <MenuGroup title='Menu'>
                    {!isAdmin && (
                        <>
                            <MenuItem>
                                <Link to="/profile">My Account</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/payment">Payments </Link>
                            </MenuItem>
                        </>
                    )}
                    {isAdmin && (
                        <MenuItem>
                            <Link to="/admin">Dashboard </Link>
                        </MenuItem>
                    )}
                    <MenuItem onClick={() => SignOut()}>Sign Out</MenuItem>
                </MenuGroup>
                <MenuDivider/>
            </MenuList>
        </Menu>
    )
}