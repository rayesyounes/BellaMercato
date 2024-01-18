import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";


export default function HeaderMenu({children}) {
    return (<Menu>
            <MenuButton>
                {children}
            </MenuButton>
            <MenuList>
                <MenuGroup title='Profile'>
                    <MenuItem >
                        <Link to="/profile">My Account</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/payment">Payments </Link>
                    </MenuItem>
                </MenuGroup>
                <MenuDivider/>
                <MenuGroup title='Help'>
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}