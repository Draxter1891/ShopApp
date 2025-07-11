import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    fname: string;
    lname: string;
    email: string;
    photoURL: string;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    fname: '',
    lname: '',
    email: '',
    photoURL: ''
    , isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // successfull user signin
        setUser: (state, action: PayloadAction<{
            fname: string;
            lname: string;
            email: string;
            photoURL: string;
        }>) => {
            state.fname = action.payload.fname;
            state.lname = action.payload.lname;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.isLoggedIn = true;
        },
        // logout user
        clearUser: (state) => {
            state.fname = '';
            state.lname = '';
            state.email = '';
            state.photoURL = 'no image url found';
            state.isLoggedIn = false;
        }
    }
})

//Actions for dispatch and useSelector
export const { setUser, clearUser } = userSlice.actions;

//Reducer for store
export default userSlice.reducer;