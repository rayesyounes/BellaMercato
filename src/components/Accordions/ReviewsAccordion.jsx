import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Badge,
    Flex,
    Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

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
                        <Badge colorScheme="green" mr={2}>
                            {review.rating} Stars
                        </Badge>
                    </Flex>
                    <Text mt={2}>{review.comment}</Text>
                    {/*{replies && renderReplies(replies)}*/}
                </AccordionPanel>
            </AccordionItem>
    );
};

export default ReviewAccordion;
