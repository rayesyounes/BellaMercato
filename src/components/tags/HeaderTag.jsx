import {Avatar, Tag, TagLabel} from "@chakra-ui/react";
import avatar from "../../assets/avatars/avatar.jpg";

function HeaderTag ({user}){
    return (
        <Tag size='lg' colorScheme='cyan' borderRadius='full'>
            <Avatar
                src={avatar}
                size='xs'
                name='Segun Adebayo'
                ml={-1}
                mr={2}
            />
            <TagLabel>{user.username}</TagLabel>
        </Tag>
    )
}

export default HeaderTag;