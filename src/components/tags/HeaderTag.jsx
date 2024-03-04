import {Avatar, Tag, TagLabel} from "@chakra-ui/react";

function HeaderTag ({user}){
    return (
        <Tag size='lg' colorScheme='cyan' borderRadius='full'>
            <Avatar
                src={user.avatar ? user.avatar : null}
                size='xs'
                name={user.last_name + ' ' + user.first_name}
                ml={-1}
                mr={2}
            />
            <TagLabel>{user.username}</TagLabel>
        </Tag>
    )
}

export default HeaderTag;