import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { DropdownLarge } from "../../index";

const Dropdown = ({ links }) => {
  const [display, setDisplay] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);
  const navigateItems = (display, itemIndex) => {
    display === false ? setDisplay(true) : null;
    setItemIndex(itemIndex);
  };
  return (
    <div>
      <div
        data-aos="fade"
        className="sm:block text-purple-500 sm:w-[277px] sm:h-auto sm:p-[30px] border border-purple-500 rounded-[30px]"
      >
        <ul className="text-xl font-normal">
          {links.map((item, key) => (
            <li
              onClick={() => {
                navigateItems(display, key);
              }}
              key={key}
              className="flex justify-between hover:underline hover:cursor-pointer"
            >
              {`${item?.name}`}
              <div className="">
                <ChevronRight
                  className="mt-2 ml-2 hover:cursor-pointer"
                  size={16}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {display && (
        <>
          <div className="absolute left-2/2 top-2 ml-2">
            <DropdownLarge links={links[itemIndex].options} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
