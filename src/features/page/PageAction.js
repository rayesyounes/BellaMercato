import {setPage} from "./pageSlice";

export const setCurrentPage = (pageName) => async (dispatch) => {
    dispatch(setPage(pageName));
}

export default setCurrentPage;
