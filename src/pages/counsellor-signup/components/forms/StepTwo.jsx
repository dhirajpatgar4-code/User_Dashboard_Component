import InputField from "../ui/InputField";
import FormHeader from "../ui/FormHeader";
import { ButtonCallToAction } from "../../../../components";
import { useFormContext } from "react-hook-form";
import { TextareaField } from "../ui/TextareaField";

export function StepTwo({ nextStep, prevStep }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    nextStep();
  };

  return (
    <>
      <FormHeader
        title="Professional Details"
        step={2}
        nextStep={nextStep}
        prevStep={prevStep}
      />
      <div className="flex justify-between flex-col  h-[230px] sm:h-[295px]">
        <div className="grid grid-cols-2 gap-x-[30.5px] sm:gap-x-[60px] gap-y-[5px] sm:gap-y-[10px] ">
          <div className="flex flex-col gap-[5px] sm:gap-[10px]">
            <InputField
              type="text"
              placeholder="Counselling Type"
              {...register("counselling_type")}
              error={errors.counselling_type?.message}
            />

            <InputField
              type="text"
              placeholder="Specialties"
              {...register("specialties")}
              error={errors.specialties?.message}
            />

            <InputField
              type="number"
              placeholder="Years of Experience"
              {...register("years_experience", { valueAsNumber: true })}
              error={errors.years_experience?.message}
            />
          </div>
          <TextareaField
            placeholder="Bio"
            {...register("bio")}
            error={errors.bio?.message}
          />
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={handleNext} />
      </div>
    </>
  );
}
