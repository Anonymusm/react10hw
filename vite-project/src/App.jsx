import "./App.css";
import { nanoid } from "nanoid";
import { Filter } from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";
import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const handleSubmit = ({ name, number }) => {
    // some === Перевірка на дубль імені
    const isExist = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts`);
      return; // ❗ Зупиняємо функцію, щоб не додавати контакт
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prev) => [...prev, newContact]);
  };

  const handleDelete = (deleteById) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== deleteById));
  };

  const filterChange = (event) => {
    setFilter(event.target.value)
  };

  const searchedContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter filterOnChange={filterChange} filterValue={filter} />
      <ContactList
        onDelete={handleDelete}
        searchContactForMapping={searchedContact}
      />
    </>
  );
}
