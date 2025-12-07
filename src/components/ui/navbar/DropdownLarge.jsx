import { ChevronRight } from "lucide-react";
import { ButtonCallToAction } from "../../index";
const DropdownLarge = ({ links }) => {
  return (
    <div
      data-aos="fade"
      className="sm:block text-purple-500 sm:w-[389px] sm:h-auto sm:p-[30px] border border-purple-500 rounded-[30px]"
    >
      <ul className="text-xl font-normal">
        {links.map((item ,key) => (
          <li data-aos="fade" key={key} className="flex justify-between hover:underline hover:cursor-pointer">
            {`${item}`}
            {/* <div className="cursor-pointer">
              <ChevronRight className="mt-2 ml-2" size={16} />
            </div> */}
          </li>
        ))}
      </ul>
      <ButtonCallToAction
        content="View All"
        textStyling="text-xl text-nowrap mt-5"
        horizontalMargin="mx-[80px]"
      />
    </div>
  );
};

export default DropdownLarge;
