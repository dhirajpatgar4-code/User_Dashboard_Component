import RightArrow from '../../../assets/RightArrow.svg';
import { Dropdown } from '../../index';

const ButtonCallToAction = ({
  content = 'Get Started',
  textStyling = 'text-sm sm:text-xl',
  horizontalMargin = 'px-[10px] sm:mx-[30px]',
  handlClick,
  type = 'button',
}) => {
  return (
    <div id='get-started' className='place-content-center  '>
      <button
        type={type}
        className={`bg-purple-500 inline-flex items-center justify-center  text-white py-2.5 rounded-[25px] sm:rounded-[50px] sm:px-7.5 px-5.5  ${textStyling} hover:cursor-pointer hover:bg-purple-600`}
        onClick={handlClick}
      >
        <span className={`${horizontalMargin} font-semibold`}>{content}</span>
        <div className='rounded-full p-1.5 w-[25px] h-[25px]  sm:w-[35px] sm:h-[34px] bg-white place-content-center'>
          <img className='mx-auto ' src={RightArrow} alt='right-arrow-icon' />
        </div>
      </button>
    </div>
  );
};

export default ButtonCallToAction;
