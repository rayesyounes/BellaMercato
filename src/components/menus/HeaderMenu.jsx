import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logoutAuth} from "../../features/auth/authAction.js";


export default function HeaderMenu({children}) {
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
                <MenuGroup title='Profile'>
                    <MenuItem>
                        <Link to="/profile">My Account</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/payment">Payments </Link>
                    </MenuItem>
                </MenuGroup>
                <MenuDivider/>
                <MenuGroup title='Sign out'>
                    <MenuItem  onClick={() => SignOut()}>Sign Out</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}