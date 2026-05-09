import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  filter: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    add: (state, action) => {
      const isExist = state.contacts.some(
        (contact) =>
          contact.name.toLowerCase() === action.payload.name.toLowerCase()
      );

      if (isExist) {
        alert(`${action.payload.name} is already in contacts`);
        return;
      }

      const newContact = {
        id: nanoid(),
        name: action.payload.name,
        number: action.payload.number,
      };

      state.contacts.push(newContact);
    },

    deleteById: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },

    filterChange: (state, action) => {
      state.filter = action.payload.target.value;
    },
  },
});

export const { add, deleteById, filterChange } = filterSlice.actions;
export default filterSlice.reducer;