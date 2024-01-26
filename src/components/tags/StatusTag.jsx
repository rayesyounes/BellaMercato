import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import {
    MdCheckCircle,
    MdCancel,
    MdHourglassEmpty,
    MdLocalShipping,
} from "react-icons/md";

function StatusTag({ status }) {
    const renderTagColor = (status) => {
        switch (status) {
            case "confirmed":
                return "blue";
            case "processing":
                return "yellow";
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
                return MdCheckCircle
            case "processing":
                return MdHourglassEmpty
            case "delivered":
                return MdLocalShipping
            case "cancelled":
                return MdCancel
            default:
                return null;
        }
    };

    return (
        <Tag
            size={"sm"}
            key={"sm"}
            variant="outline"
            colorScheme={renderTagColor(status)}
        >
            <TagLabel>{status}</TagLabel>
            
                <TagRightIcon as={renderTagIcon(status)} />
        </Tag>
    );
}

export default StatusTag;
