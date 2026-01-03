import { useFormContext } from 'react-hook-form';
import InputField from '../ui/InputField';
import FormHeader from '../ui/FormHeader';
import CustomDropdown from '../ui/SelectInput';
import { ButtonCallToAction } from '../../../../components';
import { Link } from 'react-router-dom';

export function StepOne({ nextStep }) {
  const {
    register,
    setValue,
    watch,

    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    nextStep();
  };

  return (
    <>
      <FormHeader nextStep={nextStep} />
      <div className='flex justify-between flex-col h-[230px] sm:h-[295px]'>
        <div className='grid grid-cols-2 gap-x-[30.5px] sm:gap-x-[60px] gap-y-[5px] sm:gap-y-[10px]'>
          <InputField
            placeholder='Full Name'
            {...register('fullname')}
            error={errors.fullname?.message}
          />

          <InputField
            type='date'
            placeholder='DOB'
            {...register('dob')}
            error={errors.dob?.message}
            max={new Date().toISOString().split('T')[0]} // prevent future dates
            className='px-3 py-2 border border-[#8473E8] rounded-lg
             focus:ring-2 focus:ring-[#8473E8]
             text-[12px] text-black/70 cursor-pointer'
          />

          <InputField
            type='tel'
            placeholder='Phone'
            {...register('phone_number')}
            error={errors.phone_number?.message}
          />

          <CustomDropdown
            placeholder='Gender'
            options={['Male', 'Female', 'Prefer Not To Say']}
            value={watch('gender')}
            onChange={(val) =>
              setValue('gender', val, { shouldValidate: true })
            }
            error={errors.gender?.message}
          />

          <InputField
            type='email'
            placeholder='Email'
            {...register('email')}
            error={errors.email?.message}
          />

          <CustomDropdown
            placeholder='Language'
            options={['English', 'Hindi']}
            value={watch('languages')}
            onChange={(val) =>
              setValue('languages', val, { shouldValidate: true })
            }
            error={errors.languages?.message}
          />

          <InputField
            type='password'
            placeholder='Password'
            {...register('password')}
            error={errors.password?.message}
          />

          <CustomDropdown
            placeholder='Time Zone'
            options={['GMT +5:30']}
            value={watch('timezone')}
            onChange={(val) =>
              setValue('timezone', val, { shouldValidate: true })
            }
            error={errors.timezone?.message}
          />
        </div>
        <p className='text-center  text-xs sm:text-sm mt-2 pb-1 sm:pb-2 cursor-default font-light  leading-[10px] text-black/54'>
          Already have an account?{' '}
          <span className='text-[#8473E8] cursor-pointer underline underline-offset-2'>
            <Link to='/'>Login</Link>
          </span>
        </p>
      </div>
      <div className='flex flex-col items-center mt-4'>
        <ButtonCallToAction content='Continue' handlClick={handleNext} />
      </div>
    </>
  );
}
