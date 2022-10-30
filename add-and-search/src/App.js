import { useRef, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const itemRef = useRef();
  const filterdItems = items.filter((item) => item.includes(search));
  const handleAdd = (e) => {
    e.preventDefault();
    const value = itemRef.current.value;
    if (value === "") return;
    setItems((prev) => [...prev, value]);
    itemRef.current.value = "";
  };
  return (
    <div className="App">
      <label> Search: </label>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <br />
      <br />
      <form onSubmit={handleAdd}>
        <label>Add item: </label>
        <input type="text" ref={itemRef} />
        <button type="submit">ADD</button>
      </form>
      <h3> Items: </h3>
      <ul>
        {filterdItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
