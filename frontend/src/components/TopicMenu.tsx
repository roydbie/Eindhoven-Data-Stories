import { useState } from "react";

function TopicMenu() {
  let items = [
    {
      title: "Nature and Environment",
      src: "https://i.pinimg.com/originals/2f/6e/53/2f6e5390f6e129f0066177069de59073.jpg",
    },
    {
      title: "Infrastructure",
      src: "https://b.thumbs.redditmedia.com/H-L9a6ph27Z80wbhuoKtgesPW36rzZ7LmhT1jtRMTMU.png",
    },
    {
      title: "Management",
      src: "https://werkenbij.sheerenloo.nl/assets/uploads/3-Werken-bij/Afbeeldingen/_256x256_crop_center-center_none/Original_019-BG.jpg",
    },
    {
      title: "Culture and Recreation",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRHA9jZNnHCap7p7Ugf3SkFsCP-BxJrJ3mjQ&usqp=CAU",
    },
    {
      title: "Traffic",
      src: "https://live.staticflickr.com/65535/50969440398_6e15a349a0_o.png",
    },
    {
      title: "Housing",
      src: "https://media.nu.nl/m/yhsxatqaotk6_sqr256.jpg/appeltjesgroen-huis-in-den-helder-moet-overgeschilderd-worden.jpg",
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1 className="text-light ms-4">Topics</h1>
      {items.length === 0 && <p>No items found.</p>}
      <ul className="list-group mt-3" id="topicmenu">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item.title}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="image">
              <img
                src={item.src}
                alt="not found"
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
              />
            </div>
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TopicMenu;
