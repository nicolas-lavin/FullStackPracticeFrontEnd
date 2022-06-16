import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    people: [],
    isLoading: false,
    error: "",
    searchPeopleList: [],
};

const peopleListSlice = createSlice({
    name: "peopleList",
    initialState,
    reducers: {
        fetchPeopleLoading: (state) => {
            state.isLoading = true;
        },
        fetchPeopleSuccess: (state, {payload}) => {
            state.people = payload;
            state.searchPeopleList = payload;
            state.isLoading = false;
        },
        fetchPeopleFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        searchPeople: (state, { payload }) => {
            state.searchPeopleList = state.people.filter((row) => {
                if(!payload) return row;
                return row.rut.toLowerCase().includes(payload.toLowerCase());
            });
        },
    }
});

const { reducer, actions } =  peopleListSlice;

export const {
    fetchPeopleLoading,
    fetchPeopleSuccess,
    fetchPeopleFail,
    searchPeople
} = actions;

export default reducer;