import {useEffect} from "react";
import {Flex, Text} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {getReviewsByProductIdAsync} from "../../features/reviews/reviewsActions";
import {getUsersAsync} from "../../features/users/usersAction.js";
import ReviewAccordion from "../Accordions/ReviewsAccordion.jsx";


const ReviewsCard = ({product}) => {
    const dispatch = useDispatch();
    const {users} = useSelector((state) => state.users);
    const {reviews} = useSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(getUsersAsync());
        dispatch(getReviewsByProductIdAsync(product.id));
    }, [dispatch, product.id]);

    return (

        <Flex
            flexDirection={"column"} width={"100%"} p={4} bg={"white"} borderRadius={"md"} boxShadow={"lg"}
            height={"70vh"} gap={4}>
            <Text
                bg="White" color="teal" fontSize={20} fontWeight="bold"> Customers Reviews :
            </Text>
            <Flex
                flexDirection={"column"}
                overflow={"overlay"} gap={4}
                borderRadius={"lg"}
                bg={"gray.100"}
                p={4}
            >

                {reviews.map((review, index) => {
                    const user = users.find((u) => parseInt(u.id) === parseInt(review.user_id));
                    return (<ReviewAccordion
                        key={index}
                        review={review}
                        user={user}
                        replies={review.replies}
                    />);
                })}
            </Flex>
        </Flex>);
};

export default ReviewsCard;
