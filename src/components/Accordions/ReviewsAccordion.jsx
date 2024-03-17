import {Avatar, Badge, Box, Flex, Heading, Icon, Stat, StatLabel, Text,} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

const ReviewAccordion = ({review, user, replies}) => {
    // const { users } = useSelector((state) => state.users);
    // const renderReplies = (replies) => {
    //     return (
    //         <Accordion allowMultiple>
    //             {replies.map((reply, replyIndex) => {
    //                 const replyUser = users.find((u) => parseInt(u.id) === parseInt(reply.user_id));
    //                 return (
    //                     <AccordionItem
    //                         borderLeft="2px solid teal"
    //                         key={replyIndex}
    //                     >
    //                         <h2>
    //                             <AccordionButton
    //                                 // _expanded={{ bg: "gray.100", color: "teal.800" }}
    //                             >
    //                                 <Flex gap={4} alignItems="center" as="span" flex='1' textAlign='left'>
    //                                     <Avatar size="sm" name={replyUser.username} src={replyUser.avatar} />
    //                                     <Text>{replyUser.username}</Text>
    //                                 </Flex>
    //                                 <AccordionIcon
    //                                     _expanded={{ transform: "rotate(180deg)" }}
    //                                 />
    //                             </AccordionButton>
    //                         </h2>
    //                         <AccordionPanel pb={4}>
    //                             <Text fontSize="sm" color="gray.500">
    //                                 Posted on {new Date(reply.date).toDateString()}
    //                             </Text>
    //                             <Text mt={2}>{reply.comment}</Text>
    //                             {reply.replies && renderReplies(reply.replies)}
    //                         </AccordionPanel>
    //                     </AccordionItem>
    //                 );
    //             })}
    //         </Accordion>
    //     );
    // };

    // return (
    //     <Accordion defaultIndex={[0,1,2,3,4]} allowMultiple px={4}>
    //         <AccordionItem borderLeft="2px solid teal">
    //             <h2>
    //                 <AccordionButton
    //                     // _expanded={{ bg: "gray.100", color: "teal.800" }}
    //                 >
    //                     <Flex gap={4} alignItems="center" as="span" flex='1' textAlign='left'>
    //                         <Avatar size="sm" name={user.username} src={user.avatar} />
    //                         <Text>{user.username}</Text>
    //                     </Flex>
    //                     <Text fontSize="sm" color="gray.500">
    //                         Posted on {new Date(review.date).toDateString()}
    //                     </Text>
    //                     {/*<AccordionIcon*/}
    //                     {/*    _expanded={{ transform: "rotate(180deg)" }}*/}
    //                     {/*/>*/}
    //                 </AccordionButton>
    //             </h2>
    //             <AccordionPanel pb={4}>
    //                 <Flex mt={2}>
    //                     <Badge colorScheme="teal" size={"sm"} px={2} variant={"solid"} borderRadius={"xl"}
    //                            fontSize={10} pt={0.5}>
    //                         <Flex alignItems={"center"}>
    //                             <Icon as={StarIcon} mb={0.5} mr={1} w={2} h={2}/>
    //                             <Text fontSize='xxs' fontWeight='bold'>{review.rating}</Text>
    //                         </Flex>
    //                     </Badge>
    //                 </Flex>
    //                 <Text mt={2}>{review.comment}</Text>
    //                 {/*{replies && renderReplies(replies)}*/}
    //             </AccordionPanel>
    //         </AccordionItem>
    //
    //         </Accordion>
    // );


    return (
        <Box p={4} borderWidth="1px" bg={"white"} borderRadius="md" boxShadow="md">
            <Flex direction="column" gap={4}>
                <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="stretch">
                        <Avatar size="xs" name={user?.username} src={user?.avatar}/>
                        <Heading size="sm" ml={2}>{user?.username}</Heading>
                    </Flex>
                    <Box bg="gray.50" p={1} px={2} borderRadius="md">
                        <Text fontSize="sm">{new Date(review.date).toDateString()}</Text>
                    </Box>
                </Flex>
                <Flex
                    borderLeft={"2px solid teal"}
                    direction={"column"}
                    gap={2}
                >

                    <Stat ml={3}>
                        <StatLabel>
                            <Badge colorScheme="teal" size={"sm"} px={2} variant={"solid"} borderRadius={"xl"}
                                   fontSize={10} pt={0.5}>
                                <Flex alignItems={"center"}>
                                    <Icon as={StarIcon} mb={0.5} mr={1} w={2} h={2}/>
                                    <Text fontSize='xs' fontWeight='bold'>{review.rating}</Text>
                                </Flex>
                            </Badge>
                        </StatLabel>
                    </Stat>
                    <Box p={2} ml={3} bg="gray.100" borderRadius="md">
                        <Text>{review.comment}</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
}

export default ReviewAccordion;
