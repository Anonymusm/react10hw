import { createSelector } from "@reduxjs/toolkit";

const selectContacts = (state) => state.contactsData.contacts;
const selectFilter = (state) => state.contactsData.filter;

export const selectFiltered = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);
