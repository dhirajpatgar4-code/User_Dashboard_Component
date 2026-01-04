import { toast } from 'react-toastify';
import { createOrder, getKeys } from '../services/paymentService.js';
import formatCurrencyINR from '../utils/format-currency.js';
import { useAuthStore } from '../store/auth-store.js';
import { useNavigate } from 'react-router-dom';
import api from '../services/apiClient.js';

const RazorpayTemporary = () => {
  // Get User data from zustand
  const fullName = useAuthStore((state) => state.fullName);
  const userEmail = useAuthStore((state) => state.clientEmail);
  const phone = useAuthStore((state) => state.clientPhone);

  const navigate = useNavigate();

  // handle payment
  const handlePayment = async () => {
    // phone number is a required field
    // if (!phone || phone.length == 0) {
    //   toast.info('Phone number is required!');
    //   navigate('/');
    //   return;
    // }
    try {
      const data = await getKeys();
      let amount = 500;
      amount = amount * 100;
      const orderId = await createOrder(amount);
      console.log('🚀 ~ handlePayment ~ orderId:', orderId);
      const razorpay_key = data?.data?.data;
      if (data.status !== 200) {
        toast.error('Server error. Please try later.');
      }
      const options = {
        key: razorpay_key,
        amount,
        currency: 'INR',
        name: 'Safe Harbour Pvt. Ltd.',
        description: 'Counselling service',
        image: `${import.meta.env.VITE_FRONTEND_URL}/public/logo.png`,
        order_id: orderId,
        handler: async function (response) {
          console.log(response);
          try {
            const res = await api.post('/api/payment-verification', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (res.status === 200) {
              toast.success('Payment successful!');
              navigate('/payment-success');
            }
          } catch (err) {
            console.log('🚀 ~ handlePayment ~ err:', err);
            toast.error('Payment verification failed');
          }
        },

        prefill: {
          name: fullName,
          email: userEmail,
          contact: '+919876543210',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };
      var razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log('🚀 ~ handlePayment ~ error:', error);
    }
  };
  return (
    <>
      <div className='flex items-center min-h-screen justify-center'>
        <h1>
          Amount: {formatCurrencyINR(500)}{' '}
          <button
            className='bg-green-400 p-3 rounded-full'
            onClick={handlePayment}
          >
            Pay now
          </button>{' '}
        </h1>
      </div>
    </>
  );
};

export default RazorpayTemporary;
