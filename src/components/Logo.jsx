import {useState} from 'react';
import {Link} from "react-router-dom";
import {Box, Text} from "@chakra-ui/react";

const Logo = ({bg, color, fontSize, translateX}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (<Link to="/" style={{textDecoration: 'none'}}>
        <Text
            fontSize={`${fontSize}rem`}
            display={"flex"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Box color={color} fontWeight={500} letterSpacing={-1}>
                Bella🛒
            </Box>
            <Box
                transform={isHovered ? "translateX(0)" : `translateX(-${translateX}rem)`}
                transition="transform 0.3s linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%) 0.3s"
                bg={bg}
                fontWeight={400}
                letterSpacing={-0.5}
            >
                Mercato
            </Box>
        </Text>
    </Link>);
};

export default Logo;
