import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState({});
  const API_URL = "https://randomuser.me/api";
  useEffect(() => {
    fetch(API_URL).then((res) => {
      res.json().then((data) => setUsers(data.results[0]));
    });

    // const fetchData = async ()=>{
    //   const data = await fetch(API_URL);
    //   const users= await data.json();
    //   console.log(users);
    //   setUsers(users.results[0])

    // }
    // fetchData();
  }, []);
  return (
    <div>
      {users.email}
      {counter}
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}

export default App;
