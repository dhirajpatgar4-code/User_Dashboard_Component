import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import RightArrow from '../../assets/RightArrow.svg';
import { resetPassword } from '../../services/authService';

const passwordRules = [
  { label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: (v) => /[a-z]/.test(v) },
  { label: 'One number', test: (v) => /\d/.test(v) },
];

const getPasswordStrength = (password) => {
  if (!password) return { level: 'none', label: '', color: '' };

  const passedRules = passwordRules.filter((rule) =>
    rule.test(password),
  ).length;

  if (passedRules < 2)
    return { level: 'weak', label: 'Weak', color: 'text-red-500' };
  if (passedRules < 4)
    return { level: 'medium', label: 'Medium', color: 'text-yellow-500' };
  return { level: 'strong', label: 'Strong', color: 'text-green-500' };
};

export default function ResetPassword() {
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const passwordChecks = useMemo(
    () =>
      passwordRules.map((r) => ({ ...r, passed: r.test(formValues.password) })),
    [formValues.password],
  );

  const passwordStrength = useMemo(
    () => getPasswordStrength(formValues.password),
    [formValues.password],
  );

  const passwordError = useMemo(() => {
    if (!touched.password) return '';
    if (!formValues.password) return 'Password is required';
    const failed = passwordChecks.filter((r) => !r.passed);
    return failed.length > 0 ? 'Password does not meet requirements' : '';
  }, [formValues.password, passwordChecks, touched.password]);

  const confirmPasswordError = useMemo(() => {
    if (!touched.confirmPassword) return '';
    if (!formValues.confirmPassword) return 'Please confirm your password';
    if (formValues.password !== formValues.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  }, [
    formValues.password,
    formValues.confirmPassword,
    touched.confirmPassword,
  ]);

  const isFormValid =
    !passwordError &&
    !confirmPasswordError &&
    formValues.password &&
    formValues.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true });

    if (!isFormValid) {
      setError('Please fix the errors above');
      return;
    }

    const token = sessionStorage.getItem('resetToken');
    if (!token) {
      setError('Session expired. Please start over.');
      setTimeout(() => navigate('/forgot'), 2000);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const result = await resetPassword(token, formValues.password);
      if (result.success) {
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('maskedEmail');
        sessionStorage.removeItem('resetToken');

        navigate('/admin/login', {
          state: {
            message:
              'Password reset successfully! Please login with your new password.',
          },
        });
      } else {
        setError(
          result.message || 'Failed to reset password. Please try again.',
        );
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='relative min-h-screen bg-white flex flex-col items-center overflow-hidden'>
      {/* 🔵 FIXED ARC AT TOP */}
      <div className='lg:hidden w-full bg-[#8E76F2] h-[220px] rounded-b-[200px] flex flex-col justify-center items-center pt-6 px-6'>
        <h1 className='montserrat text-center text-3xl font-semibold text-white leading-tight'>
          Set a new Password
        </h1>
      </div>

      {/* DESKTOP BRAND */}
      <div className='hidden lg:flex items-center gap-2 text-base font-semibold text-[#8E76F2] absolute top-6 left-6'>
        <span className='montserrat'>Safe Harbour</span>
      </div>

      {/* MAIN CONTENT */}
      <div className='relative z-10 w-full max-w-[860px] flex flex-col items-center mt-16 lg:mt-40 px-6'>
        {/* MOBILE ICON BELOW ARC */}
        <div className='lg:hidden flex justify-center mt-4 mb-6'>
          <img src={Logo} alt='Safe Harbour logo' className='h-12 w-12' />
        </div>

        {/* DESKTOP HEADER WITH LOGO */}
        <div className='hidden lg:flex flex-col items-center mb-10'>
          <img src={Logo} alt='Safe Harbour logo' className='h-14 w-14 mb-4' />

          <h1 className='montserrat text-[56px] font-semibold text-[#8E76F2]'>
            Set a new Password
          </h1>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-[400px] lg:max-w-[500px] space-y-6'
          noValidate
        >
          {/* PASSWORD INPUT */}
          <div>
            <input
              id='password'
              name='password'
              type='password'
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='New Password'
              className={`w-full h-12 lg:h-[56px] rounded-lg border px-5 text-base outline-none transition-colors
                ${
                  passwordError
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-[#8E76F240] focus:ring-2 focus:ring-[#8E76F2]/20'
                }`}
            />

            {/* Password Strength */}
            {touched.password && formValues.password && (
              <div className='mt-2'>
                <span
                  className={`text-sm font-medium ${passwordStrength.color}`}
                >
                  Password strength: {passwordStrength.label}
                </span>

                {/* Password Rule List */}
                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-[#8A8A8A] mt-2'>
                  {passwordChecks.map((rule) => (
                    <li
                      key={rule.label}
                      className={`flex items-center gap-2 ${
                        rule.passed ? 'text-green-600' : 'text-[#8A8A8A]'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          rule.passed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                      {rule.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Error */}
            {touched.password && passwordError && (
              <p className='text-sm text-red-500 mt-2'>{passwordError}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={formValues.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Confirm Password'
              className={`w-full h-12 lg:h-[56px] rounded-lg border px-5 text-base outline-none transition-colors
                ${
                  confirmPasswordError
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-[#8E76F240] focus:ring-2 focus:ring-[#8E76F2]/20'
                }`}
            />

            {touched.confirmPassword && confirmPasswordError && (
              <p className='text-sm text-red-500 mt-2'>
                {confirmPasswordError}
              </p>
            )}

            {touched.confirmPassword &&
              !confirmPasswordError &&
              formValues.password === formValues.confirmPassword && (
                <p className='text-sm text-green-600 mt-2'>Passwords match</p>
              )}
          </div>

          {/* GENERAL ERROR */}
          {error && <p className='text-sm text-red-500 text-center'>{error}</p>}

          {/* CONTINUE BUTTON */}
          <div className='flex justify-center'>
            <button
              type='submit'
              disabled={!isFormValid || submitting}
              className='group flex items-center justify-center gap-3 rounded-full
                bg-gradient-to-r from-[#8E76F2] to-[#B28AF9] h-12 lg:h-[56px] 
                w-[200px] lg:w-[260px] text-white font-medium montserrat 
                shadow-lg disabled:opacity-60'
            >
              Continue
              <span className='grid h-8 w-8 place-items-center rounded-full bg-white text-[#8E76F2]'>
                <img src={RightArrow} className='h-4 w-4' />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
