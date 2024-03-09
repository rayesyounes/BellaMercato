import React, {useState} from 'react';
import {
    Flex,
    Icon,
    Tooltip,
    Input,
    Text,
    Box,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    Button,
    PopoverFooter,
    PopoverTrigger,
    Popover
} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons';

const StarRating = ({product}) => {
    const [selectedStars, setSelectedStars] = useState(product.rating);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [comment, setComment] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleStarClick = (rating) => {
        setSelectedStars(rating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Submitted Rating:', selectedStars);
        console.log('Comment:', comment);
        setIsOpen(false);
    };

    return (<Flex textAlign="center" alignItems="center" position="relative">
            <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <PopoverTrigger>
                    <Box>
                        {[...Array(5)].map((_, index) => {
                            const rating = index + 1;
                            return (<Tooltip key={rating} label={`${rating} star`} placement="top">
                                    <Icon
                                        as={StarIcon}
                                        w={7}
                                        h={7}
                                        color={rating <= (hoveredStars || selectedStars) ? 'teal.400' : 'gray.300'}
                                        cursor={'pointer'}
                                        onClick={() => {
                                            handleStarClick(rating);
                                            setIsOpen(true);
                                        }}
                                        onMouseEnter={() => setHoveredStars(rating)}
                                        onMouseLeave={() => setHoveredStars(0)}
                                    />
                                </Tooltip>);
                        })}
                    </Box>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow/>
                        <PopoverHeader>Leave a Review</PopoverHeader>
                        <PopoverCloseButton/>
                        <PopoverBody>
                            <Box>
                                <Text mb={2}>You rated: {selectedStars} star(s)</Text>
                                <Input
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Leave a comment..."
                                />
                            </Box>
                        </PopoverBody>
                        <PopoverFooter>
                            <Button colorScheme="blue" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </PopoverFooter>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Flex>);
};

export default StarRating;
