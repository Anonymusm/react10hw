export const Filter = ({ filterOnChange, filterValue }) => {
  return (
    <label>
  Search:
      <input
        type="text"
        onChange={filterOnChange}
        value={filterValue}
      />
    </label>
  );
};
