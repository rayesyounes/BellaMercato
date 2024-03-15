import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/page/PageAction.js";
export default function Brands() {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.page);

    useEffect(() => {
        dispatch(setCurrentPage("brands"));
    }, [dispatch]);

    return (
        <div>
            <h1>Brands / Under construction
            </h1>
        </div>
    );
}
