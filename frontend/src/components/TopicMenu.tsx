import { useState } from "react";

function TopicMenu() {
  let items = ["New York", "San Fransisco", "Haaren", "Tilburg"];
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h3 className="text-light">Topics</h3>
      {items.length === 0 && <p>No items found.</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TopicMenu;
