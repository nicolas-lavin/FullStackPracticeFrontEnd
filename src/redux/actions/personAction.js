import { getAllPersons } from "../../services/personService";
import { fetchPeopleFail, fetchPeopleSuccess, fetchPeopleLoading, searchPeople } from "../slices/personSlice";

export const fetchAllPeople = () => async (dispatch) => {
    dispatch(fetchPeopleLoading());
    try {
        const res = await getAllPersons();
        res.data && dispatch(fetchPeopleSuccess(res.data));
    } catch (error) {
        dispatch(fetchPeopleFail(error.response.data.message));
    }
};

export const filterSearchPeople = (personRut) => (dispatch) => {
    dispatch(searchPeople(personRut));
};