import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { DropdownLarge } from '../../index';

const Dropdown = ({ links }) => {
  const [display, setDisplay] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);

  const navigateItems = (display, itemIndex) => {
    display === false ? setDisplay(true) : null;
    setItemIndex(itemIndex);
  };

  return (
    <div className='fixed'>
      <div
        data-aos='fade'
        className='sm:block bg-white/90 overflow-hidden text-black sm:w-[277px] sm:h-auto sm:p-[30px] border border-purple-500 rounded-[30px]'
      >
        <ul className='text-xl font-normal'>
          {links.map((item, key) => (
            <li
              onClick={() => {
                navigateItems(display, key);
              }}
              key={key}
              className={`flex justify-between hover:text-purple-900 hover:cursor-pointer py-2 px-2 rounded-3xl
                ${itemIndex === key ? 'bg-[#e0dbff] text-purple-500 font-semibold' : ''}
              `}
            >
              {`${item?.name}`}
              <div>
                <ChevronRight
                  className='mt-2 ml-2 hover:cursor-pointer'
                  size={16}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {display && (
        <>
          <div className='absolute left-2/2 top-2 ml-2'>
            <DropdownLarge links={links[itemIndex].options} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
