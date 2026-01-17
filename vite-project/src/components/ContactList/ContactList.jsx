import { useContext } from "react";
import { Context } from "../ContactContext";

export function ContactList() {
     const { handleDelete, searchedContact } = useContext(Context);

    return (
       <ul className="list">
          {searchedContact().map(({ id, name, number }) => (
            <li key={id}>
              <h3>
                {name}: {number}
              </h3>
              <button type="button" onClick={() => handleDelete(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>  
    )
}
