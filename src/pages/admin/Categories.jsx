import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../../features/page/PageAction.js";

export default function Categories() {
    const dispatch = useDispatch();
    const {currentPage} = useSelector((state) => state.page);

    useEffect(() => {
        dispatch(setCurrentPage("categories"));
    }, [dispatch]);

    return (
        <div>
            <h1>Categories / Under construction
            </h1>
        </div>
    );
}
