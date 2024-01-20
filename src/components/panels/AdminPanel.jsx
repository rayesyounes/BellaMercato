import {Text, Flex, Icon, List, ListItem} from "@chakra-ui/react";
import {
    RiDashboardLine,
    RiFileListLine,
    RiShoppingBagLine,
    RiUserLine,
} from "react-icons/ri";
import {NavLink} from "react-router-dom";


const SidebarLink = ({ to, icon, children }) => (
    <ListItem>
        <NavLink
            to={to}
        >
            <Text as="span" fontSize="xl" display="flex" alignItems={"center"}>

            <Icon as={icon} fontSize={20} mr={2} />
                {children}
            </Text>
        </NavLink>
    </ListItem>
);


export default function AdminPanel() {
    return (
        <Flex
            direction="column"
            h="100%"
            p={4}
            borderRight="1px"
            borderColor="gray.200"
            overflowY="auto"
        >
            <List spacing={3} flex={1}>
                <SidebarLink to="/admin/dashboard" icon={RiDashboardLine}>
                    Dashboard
                </SidebarLink>
                <SidebarLink to="/admin/users" icon={RiUserLine}>
                    Users
                </SidebarLink>
                <SidebarLink to="/admin/orders" icon={RiFileListLine}>
                    Orders
                </SidebarLink>
                <SidebarLink to="/admin/products" icon={RiShoppingBagLine}>
                    Products
                </SidebarLink>
            </List>
        </Flex>
    );
}
