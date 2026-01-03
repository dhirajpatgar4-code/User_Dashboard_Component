import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import "react-datepicker/dist/react-datepicker.css";
import { FormProvider, useForm } from 'react-hook-form';
import { StepOne } from './components/forms/StepOne';
import { StepTwo } from './components/forms/StepTwo';
import { StepThree } from './components/forms/StepThree';
import { ThankYOu } from './components/forms/ThankYou';
import { StepFive } from './components/forms/StepFive';
import { StepFour } from './components/forms/StepFour';
import { counsellorSignupSchema } from './schema/counsellor.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CounsellorSignup() {
  const methods = useForm({
    resolver: zodResolver(counsellorSignupSchema),
    shouldUnregister: false,
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      phone_number: '',
      dob: '',
      gender: '',
      languages: '',
      timezone: '',
      counselling_type: '',
      specialties: '',
      years_experience: '',
      bio: '',
      availability: '',
      hourly_rate: '',
      session_type: '',
    },
  });

  const { handleSubmit, trigger } = methods;
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const stepFields = {
    1: [
      'fullname',
      'dob',
      'phone_number',
      'gender',
      'email',
      'languages',
      'password',
      'timezone',
    ],
    2: ['counselling_type', 'specialties', 'years_experience', 'bio'],
    3: ['availability', 'hourly_rate'],
    4: ['session_type'],
    5: [
      'profile_picture',
      'licence',
      'government_id',
      'additional_documents',
      'experince_letter',
      'qualification_certificates',
    ],
  };

  const nextStep = async () => {
    const fields = stepFields[step];
    const isValid = await trigger(fields);
    if (!isValid) return;

    setStep((prev) => Math.min(prev + 1));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data) => {
    const result = counsellorSignupSchema.safeParse(data);

    if (!result.success) {
      console.error('FINAL VALIDATION FAILED', result.error.format());
      alert('Something went wrong. Please review your details.');
      return;
    }

    console.log('FINAL FORM DATA:', data);
    setSubmitted(true);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const res = await fetch('http://localhost:5000/api/counsellor/signup', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.msg);

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className='flex   overflow-hidden  h-screen  sm:items-center relative '>
      {/* Desktop Safe Harbour */}
      <div
        className='hidden md:block m-[60px] absolute'
        style={{
          top: '0px',
          left: '5px',

          fontFamily: 'Montserrat',
          fontWeight: '700',
          fontSize: '22px',
          lineHeight: '100%',
          color: '#8473E8',
        }}
      >
        Safe Harbour
      </div>
      {!submitted ? (
        <>
          <div className='flex-1 flex flex-col overflow-hidden mt-0'>
            {/* Mobile Header */}
            <div className='md:hidden w-full relative'>
              <div className='w-full h-[200px] bg-[#8473E8] rounded-b-[500px] flex justify-center items-center'>
                <h1 className='text-white text-3xl font-semibold'>Welcome</h1>
              </div>
            </div>

            <div>
              {/* LOGO */}
              <div className='w-full flex justify-center md:pt-4 pt-[25px]'>
                <img
                  src='/logo.png'
                  alt='logo'
                  className='md:h-12 md:w-12 h-[25px] w-[26px]'
                />
              </div>

              {/* Desktop Welcome */}
              <h1 className='hidden md:block text-center text-[#8473E8] text-3xl font-semibold mt-3'>
                Welcome
              </h1>
            </div>

            {/* Form section */}
            <div className='md:px-[80px] xl:px-[158px] px-[41px]'>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {step === 1 && <StepOne nextStep={nextStep} />}
                  {step === 2 && (
                    <StepTwo nextStep={nextStep} prevStep={prevStep} />
                  )}
                  {step === 3 && (
                    <StepThree nextStep={nextStep} prevStep={prevStep} />
                  )}
                  {step === 4 && (
                    <StepFour nextStep={nextStep} prevStep={prevStep} />
                  )}
                  {step === 5 && <StepFive prevStep={prevStep} />}
                </form>
              </FormProvider>
              <p className='text-center text-gray-600 text-xs sm:text-sm  mt-2 sm:mt-1  md:mt-3 cursor-default font-light pb-1 leading-[10px] text-black/54'>
                <span className='text-[#8473E8] cursor-pointer underline   underline-offset-2'>
                  <Link to='/'>Back</Link>
                </span>{' '}
                to Landing Page
              </p>
            </div>
          </div>
          <div className='hidden lg:block max-w-[540px] w-[40vw]  overflow-hidden '>
            <video
              src='/signup-doctor.mp4'
              autoPlay
              loop
              muted
              className='h-full w-full object-cover'
            />
          </div>{' '}
        </>
      ) : (
        <ThankYOu />
      )}
    </div>
  );
}
