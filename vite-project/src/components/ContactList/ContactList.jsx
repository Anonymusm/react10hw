import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContacts } from "../redux/operations";
import { useEffect } from "react";

export function ContactList() {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.contactsData.filter);
  const contacts = useSelector((state) => state.contactsData.contacts);

  const normalizedFilter = filter.toLowerCase();

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );

  useEffect(() => {
    dispatch(getContacts())
  }, [dispatch])

  return (
    <ul className="list">
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          <h3>
            {name}: {number}
          </h3>

          <button type="button" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}