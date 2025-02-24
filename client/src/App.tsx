import { useEffect, useState } from "react";
import "./App.css";

type ItemType = {
  _id: string;
  name: string;
  description: string;
  location: string;
};

function App() {
  const [items, setItems] = useState<ItemType[] | null>(null);

  const fetchAllItems = async () => {
    fetch("http://localhost:4000/api/items/all")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setItems(result.allItems);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <>
      <h1>Hello World!</h1>
      <div>
        <h2>Items:</h2>
        {items &&
          items.map((item) => {
            return (
              <div>
                <p>{item.name}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
