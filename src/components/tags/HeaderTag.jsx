import {Avatar, Tag, TagLabel} from "@chakra-ui/react";
import MaleSvg from "../../assets/avatars/Male.svg";
import FemaleSvg from "../../assets/avatars/Female.svg";

function HeaderTag({user}) {

    return (
        <Tag size='lg' colorScheme='gray' borderRadius='full'>
            <Avatar
                src={user.avatar ? user.avatar : user.gender === "m" ? MaleSvg : FemaleSvg}
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