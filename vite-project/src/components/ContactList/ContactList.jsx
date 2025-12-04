
export const ContactList = ({ onDelete, searchContactForMapping }) => {
    return (
       <ul className="list">
          {searchContactForMapping().map(({ id, name, number }) => (
            <li key={id}>
              <h3>
                {name}: {number}
              </h3>
              <button type="button" onClick={() => onDelete(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>  
    )
}
