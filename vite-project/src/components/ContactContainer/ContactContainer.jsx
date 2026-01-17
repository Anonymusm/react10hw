import { Filter } from "../Filter/Filter";
import { ContactList } from "../ContactList/ContactList";
import ContactForm from "../ContactForm/ContactForm";

export default function ContactContainer() {
  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
}
