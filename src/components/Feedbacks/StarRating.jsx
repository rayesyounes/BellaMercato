import { useState } from 'react';
import { Flex, Icon, Text, Tooltip, Input, Box } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const StarRating = ({ product }) => {
    const [selectedStars, setSelectedStars] = useState(product.rating);
    const [comment, setComment] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleStarClick = (rating) => {
        setSelectedStars(rating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <Flex textAlign="center" alignItems="center" position="relative">
            {[...Array(5)].map((_, index) => {
                const rating = index + 1;
                return (
                    <Tooltip key={rating} label={`${rating} star`} placement="top">
                        <Icon
                            as={StarIcon}
                            w={7}
                            h={7}
                            color={rating <= selectedStars ? 'yellow.400' : 'gray.300'}
                            cursor="pointer"
                            onClick={() => handleStarClick(rating)}
                            onMouseEnter={() => setSelectedStars(rating)}
                            onMouseLeave={() => setSelectedStars(product.rating)}
                        />
                    </Tooltip>
                );
            })}
            {isHovered && (
                <Box position="absolute" top="100%" left="50%" zIndex={6} transform="translateX(-50%)">
                    <Flex flexDirection="column" alignItems="center" p={4} boxShadow="lg" bg="white" borderRadius="md">
                        <Text>Rate: {selectedStars} stars</Text>
                        <Input value={comment} onChange={handleCommentChange} placeholder="Leave a comment..." mt={2} />
                    </Flex>
                </Box>
            )}
        </Flex>
    );
};

export default StarRating;
