import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {
    MdCheckCircle,
    MdCancel,
    MdHourglassEmpty,
    MdLocalShipping,
} from "react-icons/md";

import {useDispatch} from "react-redux";
import {updateOrderAsync} from "../../features/orders/ordersAction";
import {FaPlane} from "react-icons/fa";

function ActionsMenu({item}) {
    const dispatch = useDispatch();
    console.log(item);

    const renderTagColor = (status) => {
        switch (status) {
            case "confirmed":
                return "blue";
            case "processing":
                return "orange";
            case "shipped":
                return "purple";
            case "delivered":
                return "green";
            case "cancelled":
                return "red";
            default:
                return "gray";
        }
    };

    const renderTagIcon = (status) => {
        switch (status) {
            case "confirmed":
                return <MdCheckCircle/>;
            case "processing":
                return <MdHourglassEmpty/>;
            case "delivered":
                return <MdLocalShipping/>;
            case "cancelled":
                return <MdCancel/>;
            case "shipped":
                return <FaPlane/>;
            default:
                return null;
        }
    };

    const handelClick = (status) => {
        const order = {...item, status: status};
        dispatch(updateOrderAsync(item.id, order));
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                size={"xs"}
                border={"2px solid"}
                fontWeight={"bold"}
                colorScheme={renderTagColor(item.status)}
                rightIcon={renderTagIcon(item.status)}
                variant={"outline"}
            >
                {item.status}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => handelClick("delivered")}>
                    Delivered
                </MenuItem>
                <MenuItem onClick={() => handelClick("confirmed")}>
                    Confirmed
                </MenuItem>
                <MenuItem onClick={() => handelClick("cancelled")}>
                    Cancelled
                </MenuItem>
                <MenuItem onClick={() => handelClick("processing")}>
                    Processing
                </MenuItem>
                <MenuItem onClick={() => handelClick("shipped")}>
                    Shipped
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default ActionsMenu;
