import {Skeleton, Stack} from "@chakra-ui/react";

export default function TableSkeleton({nbRows = 6}) {
    return (<Stack p={4}>
        {[...Array(nbRows)].map((e, i) => (<Skeleton key={i} height="40px"
                                                     startColor={"gray.100"}
                                                     endColor={"gray.300"}
                                                     borderRadius={4}
        />))}
    </Stack>);
}