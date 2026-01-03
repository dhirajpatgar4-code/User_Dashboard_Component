import { logout } from '../services/authServiceNew';

const Logout = () => {
  return (
    <div className='flex justify-center items-center place-content-center'>
      <button
        className='flex cursor-pointer justify-center p-2 mt-2 items-center border border-black'
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
