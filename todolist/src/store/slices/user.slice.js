import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        addModal: false,
        addModal2: false,
        sortAsc: true,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        loadModal: (state) => {
            state.addModal = !state.addModal
        },
        loadModal2: (state) => {
            state.addModal2 = !state.addModal2
        },
        addData: (state, action) => {
            state.data.push(action.payload)
        },
        delete: (state, action) => {
            state.data = state.data.filter(user => user.id != action.payload);
        },

        updateUser: (state, action) => {
            state.data = state.data.map((user) => {
                if (user.id === action.payload.id) {
                    return { ...user, ...action.payload.data };
                }
                return user;
            });
        },
        toggleSortAsc: (state) => {
            state.sortAsc = !state.sortAsc;
        },


    }
})

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;