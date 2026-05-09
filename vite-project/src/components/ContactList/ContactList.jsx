import { useDispatch, useSelector } from "react-redux";
import { deleteById } from "../redux/slices/filterSlice";

export function ContactList() {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.contactsData.filter);
  const contacts = useSelector((state) => state.contactsData.contacts);

  const normalizedFilter = filter.toLowerCase();

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <ul className="list">
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          <h3>
            {name}: {number}
          </h3>

          <button type="button" onClick={() => dispatch(deleteById(id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}