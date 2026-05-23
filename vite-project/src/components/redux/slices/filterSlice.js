import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { addContact, deleteContact, getContacts } from "../operations";

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
  filter: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterChange: (state, action) => {
      state.filter = action.payload.target.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload,
        );
      })
      .addCase(addContact.fulfilled, (state, action) => {
        const isExist = state.contacts.some(
          (contact) =>
            contact.name.toLowerCase() === action.payload.name.toLowerCase(),
        );

        if (isExist) {
          alert(`${action.payload.name} is already in contacts`);
          return;
        }

        state.contacts.push(action.payload);
      })
      .addMatcher(
        isPending(getContacts, deleteContact, addContact),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isRejected(getContacts, deleteContact, addContact),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      .addMatcher(
        isFulfilled(getContacts, deleteContact, addContact),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
