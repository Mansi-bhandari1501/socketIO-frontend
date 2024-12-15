import { createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserDetail, fetchUserDetail, fetchUsers, loginUser, registerUser  } from "./userAction";

const initalState = {
  loading: false,
  userInfo: {},
  userToken: null,
  userId:null,
  error: null,
  success: false,
  users:[],
  userDetails:[],
  fetchUsersDetails:[]
};

const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {
    logout: (state) => {
      return initalState;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {

      state.loading = false;
      state.success = true;
      state.userInfo = action.payload.data.user;
      state.userId = action.payload.data.user._id;
      state.userToken = action.payload.data.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchLoggedInUserDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoggedInUserDetail.fulfilled, (state, action) => {
      console.log('fetchLoggedInUserDetail: ', action);
      state.loading = false;
      state.success = true;
      state.userDetails = action.payload;
    });
    builder.addCase(fetchLoggedInUserDetail.rejected, (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null
      state.users = action.payload.user;
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(fetchUserDetail.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null
      state.fetchUsersDetails = action.payload;
    })
    builder.addCase(fetchUserDetail.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
});


export default userSlice.reducer;
export const { logout } = userSlice.actions;
