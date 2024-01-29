import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../features/page/PageAction.js";

export default function Sales() {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.page);

    useEffect(() => {
        dispatch(setCurrentPage("sales"));
    }, [dispatch]);
    
    return (
        <div>
            <h1>Sales</h1>
        </div>
    );
}
