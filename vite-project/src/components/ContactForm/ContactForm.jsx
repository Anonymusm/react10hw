import { Component } from "react";

export class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeNumber = (event) => {
    this.setState({ number: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit({
      name: this.state.name,
      number: this.state.number,
    });

    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            className="name--input"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChangeNumber}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit">Add Contact</button>
      </form>
    );
  }
}
