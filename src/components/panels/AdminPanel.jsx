import {useEffect, useState} from "react";
import { Flex, List, ListItem, Icon, Button, Tooltip, Image, Text, Divider } from "@chakra-ui/react";
import StoreSvg from "../../assets/Shopping.svg"
import { useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import {
    RiDashboardLine,
    RiFileListLine,
    RiShoppingBagLine,
    RiUserLine,
    RiExpandRightLine,

} from "react-icons/ri";

const iconMap = {
    dashboard: RiDashboardLine,
    users: RiUserLine,
    orders: RiFileListLine,
    products: RiShoppingBagLine,
};

const SidebarLink = ({to, icon, children, isSelected, onClick, minimized}) => {
    const linkStyle = {
        textDecoration: "none",
        color: "white",
    };

    const listItemStyle = {
        p: 2,
        mb: 3,
        color: isSelected ? "teal.800" : "white",
        bg: isSelected ? "white" : "inherit",
        borderRadius: "md",
        cursor: "pointer",
    };

    const textUnderlineStyle = {
        borderBottom: isSelected ? "2px solid teal" : "2px solid white",
        _hover: {
            borderBottom: "2px solid teal",
            transition: "ease-in-out 0.3s",
        }
    };

    return (
        <ListItem>
            <NavLink to={to} style={linkStyle} onClick={onClick}>
                <Flex alignItems="center" {...listItemStyle}>
                    <Icon as={icon} fontSize={20} mr={2}/>
                    <span style={{fontSize: "xl", ...textUnderlineStyle}}>
                        {minimized ? "" : children}
                    </span>
                </Flex>
            </NavLink>
        </ListItem>
    );
};

export default function AdminPanel() {
    const { currentPage } = useSelector((state) => state.page);
    const [selectedItem, setSelectedItem] = useState();
    const [minimized, setMinimized] = useState(false);

    useEffect(() => {
        setSelectedItem(currentPage);
    }, [currentPage]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleToggleMinimize = () => {
        setMinimized(!minimized);
    };

    const menuItems = [
        {path: "/admin/dashboard", name: "Dashboard", key: "dashboard"},
        {path: "/admin/users", name: "Users", key: "users"},
        {path: "/admin/orders", name: "Orders", key: "orders"},
        {path: "/admin/products", name: "Products", key: "products"},
    ];

    return (
        <Flex
            direction="column"
            h="100%"
            p={4}
            borderRight="1px"
            borderColor="black"

            bgGradient='linear(to-t, teal.800, teal.600)'
            width={minimized ? "70px" : "240px"} // Adjust the width based on the toggle state
            transition="width 0.3s ease"
        >

            <Flex direction="row" justifyContent={"center"} align="center" mb={4}>
                <Image src={StoreSvg} alt="Store"  boxSize="35px" borderRadius="full" />
                {
                    minimized ? "" : <Text color="white" fontWeight={"bold"} fontSize="xl" ml={2} mt={2}>
                        RAYSTORE
                    </Text>
                }
            </Flex>

            <Divider
                orientation="horizontal"
                borderColor="white"
                opacity={0.5}
                mb={4}
            />


            <List spacing={3} flex={1}>
                {menuItems.map((item) => (
                    <SidebarLink
                        key={item.key}
                        to={item.path}
                        icon={iconMap[item.key]}
                        isSelected={selectedItem === item.key}
                        minimized={minimized}
                        onClick={() => handleItemClick(item.key)}
                    >
                        {item.name}
                    </SidebarLink>
                ))}
            </List>
            <Tooltip label={minimized ? "Expand" : "Minimize"} placement="right" hasArrow>
                <Button onClick={handleToggleMinimize} colorScheme="teal" size="sm" mt={4}>
                    {minimized ? <Icon as={RiExpandRightLine}/> : "Minimize"}
                </Button>
            </Tooltip>
        </Flex>
    );
}
