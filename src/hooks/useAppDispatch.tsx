import { useDispatch } from "react-redux";

import { AppDispatch } from "../redux/store";

const useAppDispatch = () => {
    return useDispatch<AppDispatch>();
}

export default useAppDispatch;