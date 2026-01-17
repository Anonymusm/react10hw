import { useState, useContext } from "react";
import { Context } from "../ContactContext";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const { handleContactSubmit } = useContext(Context);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Тепер onSubmit буде працювати, бо ми отримали його з пропсів
    handleContactSubmit({
      name: name,
      number: number,
    });

    setName("");
    setNumber("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          className="name--input"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChangeNumber}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit">Add Contact</button>
    </form>
  );
}
