import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const Logo = ({ children }) => {
    return (
        <Link to="/">
            <Text fontSize="1.5rem">
                {children}
            </Text>
        </Link>
    );
};

export default Logo;
