import { Filter } from "../Filter/Filter";
import { ContactList } from "../ContactList/ContactList";
import ContactForm from "../ContactForm/ContactForm";
import { useContext } from "react";
import { Context } from "../ContactContext";

export default function ContactContainer() {
  const { contacts, filter } = useContext(Context);
  const normalizedFilter = filter.toLowerCase();

  const filtered = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter),
  );
  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm />

      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter />
        </>
      )}
      {contacts.length > 0 && filtered.length === 0 && <p>No todos found!</p>}
      <ContactList />
    </>
  );
}
