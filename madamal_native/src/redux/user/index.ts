import { StoreUser } from '@/models/user';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { userStub } from '@/constants/userStub';

// Define a type for the slice state
interface UserState {
  userData: StoreUser;
}

// Define the initial state using that type
const initialState: UserState = {
  userData: userStub,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<StoreUser>>) => {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
      };
    },
    logout: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { updateUser, logout } = userSlice.actions;

export const selectUser = (state: RootState): StoreUser => state.user.userData;

export const selectUserId = createSelector(
  selectUser,
  (user: StoreUser): string => user.userId,
);

export const selectIsUserLoggedIn = createSelector(
  selectUserId,
  (userId: string): boolean => !!userId,
);
export const selectUserName = createSelector(
  selectUser,
  (user: StoreUser): string => user.fullName,
);

export default userSlice.reducer;
