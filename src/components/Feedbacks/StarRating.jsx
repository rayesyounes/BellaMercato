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
    Popover, Badge, Stack
} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons';
import {postReviewAsync} from "../../features/reviews/reviewsActions";
import {useDispatch} from "react-redux";

const StarRating = ({product}) => {
    const Dispatch = useDispatch();
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
        Dispatch(postReviewAsync(product.id, selectedStars, comment));
        console.log('Submitted Rating:', selectedStars);
        console.log('Comment:', comment);
        setComment('');
        setIsOpen(false);
    };

    return (<Flex textAlign="center" alignItems="center" position="relative">
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} placement={"bottom-start"}>
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
                            <Text mb={2} p={2} borderRadius={5} alignItems={"center"}>Your Rating:
                                <Badge colorScheme="teal" size={"sm"} px={2} variant={"solid"} borderRadius={"xl"} fontSize={10} pt={1} ml={2}>
                                    <Flex alignItems={"center"}>
                                        <Icon as={StarIcon} mb={1.5} mr={1} w={2.5} h={2.5}/>
                                        <Text fontSize='sm' fontWeight='bold'>{selectedStars}</Text>
                                    </Flex>
                                </Badge>
                            </Text>

                            <Input
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Leave a comment..."
                            />
                        </Box>
                    </PopoverBody>
                    <PopoverFooter>
                        <Flex justify="flex-end">
                            <Button
                                colorScheme="teal"
                                onClick={handleSubmit}
                                isDisabled={selectedStars === 0 || comment.trim() === ''}
                                size="sm"
                                variant="solid"
                            >
                                Submit
                            </Button>
                        </Flex>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>

        </Popover>
    </Flex>);
};

export default StarRating;
