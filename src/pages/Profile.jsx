import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../features/page/PageAction.js";
export default function Profile() {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.page);

    useEffect(() => {
        dispatch(setCurrentPage("profile"));
    }, [dispatch]);

    return (
        <div>
            <h1>Profile / Under construction
            </h1>
        </div>
    );
}
