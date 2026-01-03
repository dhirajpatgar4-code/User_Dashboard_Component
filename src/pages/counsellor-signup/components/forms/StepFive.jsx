import { useFormContext } from "react-hook-form";
import { FileInput } from "../ui/FileInput";
import FormHeader from "../ui/FormHeader";
import { ButtonCallToAction } from "../../../../components";

export function StepFive({ prevStep }) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormHeader title="Documents" step={5} prevStep={prevStep} />

      <div className="flex justify-between flex-col  h-[230px] sm:h-[295px]">
        <div
          className={`grid grid-cols-2 gap-x-[15.5px] sm:gap-x-[60px] ${
            errors.profile_picture || errors.government_id || errors.licence
              ? "gap-y-[10px] sm:gap-y-[15px]"
              : " gap-y-[20px] sm:gap-y-[30px]"
          } `}
        >
          <div>
            <FileInput
              label="Profile Picture"
              fileType="JPG/PNG"
              name="profile_picture"
              setValue={setValue}
              error={errors.profile_picture?.message}
            />
            {errors.profile_picture && (
              <span className="text-[10px] text-red-400">
                {errors.profile_picture?.message}
              </span>
            )}
          </div>
          <div>
            <FileInput
              label="Additional Certificates"
              name="additional_documents"
              setValue={setValue}
              error={errors.additional_documents?.message}
            />
            {errors.additional_documents && (
              <span className="text-[10px] text-red-400">
                {errors.additional_documents?.message}
              </span>
            )}
          </div>

          <div>
            <FileInput
              label="Government ID"
              fileType="PDF/JPG/PNG"
              name="government_id"
              setValue={setValue}
              error={errors.government_id?.message}
            />
            {errors.government_id && (
              <span className="text-[10px] text-red-400">
                {errors.government_id?.message}
              </span>
            )}
          </div>
          <div>
            <FileInput
              label="Experience Letters"
              name="experince_letter"
              setValue={setValue}
              error={errors.experince_letter?.message}
            />
            {errors.experince_letter && (
              <span className="text-[10px] text-red-400">
                {errors.experince_letter?.message}
              </span>
            )}
          </div>
          <div>
            <FileInput
              label="Qualification Certificates"
              name="qualification_certificates"
              setValue={setValue}
              error={errors.qualification_certificates?.message}
            />
            {errors.qualification_certificates && (
              <span className="text-[10px] text-red-400">
                {errors.qualification_certificates?.message}
              </span>
            )}
          </div>
          <div>
            <FileInput
              label="Professional License/
            Registration Certificate"
              name="licence"
              setValue={setValue}
              error={errors.licence?.message}
            />
            {errors.licence && (
              <span className="text-[10px] text-red-400">
                {errors.licence?.message}
              </span>
            )}
          </div>
        </div>
        <p className="text-center  text-xs sm:text-sm mt-2 pb-1 sm:pb-4 cursor-default font-light  leading-[10px] text-black/54">
          By continuing, you agree to our{" "}
          <span className="text-[#8473E8] underline underline-offset-2  cursor-pointer">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-[#8473E8] underline underline-offset-2 cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>
      <div className="flex flex-col items-center gap-[28px] gap-2 mt-4">
        <ButtonCallToAction type="submit" content="Continue" />
      </div>
    </>
  );
}
