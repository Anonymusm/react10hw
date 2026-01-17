import { useState, useEffect, useRef, createContext } from "react";
import { nanoid } from "nanoid";

export const Context = createContext();

export default function ContactContext({ children }) {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const refDeleted = useRef(0);

  const handleContactSubmit = ({ name, number }) => {
    // some === Перевірка на дубль імені
    const isExist = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prev) => [...prev, newContact]);
  };

  function handleDelete (deleteById) {
    setContacts((prev) => {
      return prev.filter((contact) => contact.id !== deleteById);
    });
    refDeleted.current = deleteById;
    console.log(`Deleted id: ${refDeleted.current}`);
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  const searchedContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
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
    <Context.Provider
      value={{
        handleDelete,
        handleContactSubmit,
        searchedContact,
        filterChange,
        contacts,
        filter
      }}
    >
      {children}
    </Context.Provider>
  );
}
