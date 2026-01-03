import { useFormContext } from "react-hook-form";
import FormHeader from "../ui/FormHeader";
import CustomDropdown from "../ui/SelectInput";
import { ButtonCallToAction } from "../../../../components";

export function StepFour({ nextStep, prevStep }) {
  const {
    setValue,
    watch,

    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    nextStep();
  };

  return (
    <>
      <FormHeader
        title="Session Preferences"
        step={4}
        nextStep={nextStep}
        prevStep={prevStep}
      />

      <div className="flex justify-between flex-col  h-[230px] sm:h-[295px]">
        <div className="grid  gap-y-[5px] sm:gap-y-[10px]">
          <CustomDropdown
            placeholder="Session Type"
            options={["Video Session", "Voice Session", "Chat Session"]}
            value={watch("session_type")}
            onChange={(val) => {
              setValue("session_type", val, { shouldValidate: false });
            }}
            width="w-[70%] mx-auto"
            error={errors.session_type?.message}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={handleNext} />
      </div>
    </>
  );
}
