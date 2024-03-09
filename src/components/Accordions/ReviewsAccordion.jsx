import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Badge,
    Flex, Icon,
    Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {StarIcon} from "@chakra-ui/icons";
import React from "react";

const ReviewAccordion = ({ review, user, replies }) => {
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

    return (
        <Accordion defaultIndex={[0,1,2]} allowMultiple px={4}>
            <AccordionItem borderLeft="2px solid teal">
                <h2>
                    <AccordionButton
                        // _expanded={{ bg: "gray.100", color: "teal.800" }}
                    >
                        <Flex gap={4} alignItems="center" as="span" flex='1' textAlign='left'>
                            <Avatar size="sm" name={user.username} src={user.avatar} />
                            <Text>{user.username}</Text>
                        </Flex>
                        <Text fontSize="sm" color="gray.500">
                            Posted on {new Date(review.date).toDateString()}
                        </Text>
                        {/*<AccordionIcon*/}
                        {/*    _expanded={{ transform: "rotate(180deg)" }}*/}
                        {/*/>*/}
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Flex mt={2}>
                        <Badge colorScheme="teal" size={"sm"} px={2} variant={"solid"} borderRadius={"xl"}
                               fontSize={10} pt={0.5}>
                            <Flex alignItems={"center"}>
                                <Icon as={StarIcon} mb={0.5} mr={1} w={2} h={2}/>
                                <Text fontSize='xxs' fontWeight='bold'>{review.rating}</Text>
                            </Flex>
                        </Badge>
                    </Flex>
                    <Text mt={2}>{review.comment}</Text>
                    {/*{replies && renderReplies(replies)}*/}
                </AccordionPanel>
            </AccordionItem>

            </Accordion>
    );
};

export default ReviewAccordion;
