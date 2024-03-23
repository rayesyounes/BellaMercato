import {Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList,} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
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
                            <MenuItem as={Link} to="/history">Orders</MenuItem>
                            <MenuItem as={Link} to="/payments" isDisabled>Payments</MenuItem>
                            <MenuItem as={Link} to="/profile" isDisabled>Account</MenuItem>
                        </>
                    )}
                    {isAdmin && (
                        <MenuItem as={Link} to="/admin">Dashboard</MenuItem>
                    )}
                    <MenuItem onClick={() => SignOut()}>Sign Out</MenuItem>
                </MenuGroup>
                <MenuDivider/>
            </MenuList>
        </Menu>
    )
}