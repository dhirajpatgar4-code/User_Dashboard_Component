import InputField from "../ui/InputField";
import FormHeader from "../ui/FormHeader";
import { ButtonCallToAction } from "../../../../components";
import { useFormContext } from "react-hook-form";

export function StepThree({ nextStep, prevStep }) {
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
        title="Availability & Pricing"
        step={3}
        nextStep={nextStep}
        prevStep={prevStep}
      />
      <div className="flex justify-between flex-col  h-[230px] sm:h-[295px]">
        <div className="grid  gap-y-[5px] sm:gap-y-[10px]">
          <InputField
            type="text"
            placeholder="Availability"
            width="w-[70%] mx-auto"
            {...register("availability")}
            error={errors.availability?.message}
          />

          <InputField
            type="number"
            placeholder="Pricing"
            width="w-[70%] mx-auto"
            {...register("hourly_rate", { valueAsNumber: true })}
            error={errors.hourly_rate?.message}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={handleNext} />
      </div>
    </>
  );
}
