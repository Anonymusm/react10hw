import { useContext } from "react";
import { Context } from "../ContactContext";

export function Filter() {
  const { filterChange, filter } = useContext(Context);

  return (
    <label>
      Search:
      <input type="text" onChange={filterChange} value={filter} />
    </label>
  );
}
