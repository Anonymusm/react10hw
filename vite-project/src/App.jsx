import "./App.css";
import { nanoid } from "nanoid";
import { Component } from "react";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { Filter } from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

 handleSubmit = ({ name, number }) => {
  // some === Перевірка на дубль імені
  const isExist = this.state.contacts.some(
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

  this.setState((prevState) => ({
    contacts: [...prevState.contacts, newContact],
  }));
};

  handleDelete = (deleteById) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== deleteById
      ),
    }));
  };

  filterChange = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  searchedContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter
          filterOnChange={this.filterChange}
          filterValue={this.state.filter}
        />
        <ContactList
          onDelete={this.handleDelete}
          searchContactForMapping={this.searchedContact}
        />
      </>
    );
  }
}

export default App;
