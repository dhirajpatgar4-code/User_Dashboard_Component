import { z } from "zod";

/* ----------------------------------
   STEP 1 — BASIC DETAILS
---------------------------------- */
export const stepOneSchema = z.object({
  fullname: z.string().min(2, "Full name required"),
  dob: z
    .string()
    .min(1, "Date of Birth is required")
    .refine((val) => new Date(val) <= new Date(), "DOB cannot be future"),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Only digits allowed"),
  gender: z.string().min(1, "Gender required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
  languages: z.string().min(1, "Language required"),
  timezone: z.string().min(1, "Timezone required"),
});

/* ----------------------------------
   STEP 2 — PROFESSIONAL DETAILS
---------------------------------- */
export const stepTwoSchema = z.object({
  counselling_type: z.string().min(1, "Required"),
  specialties: z.string().min(1, "Required"),
  years_experience: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0)
    .max(50),
  bio: z.string().min(10, "Minimum 10 characters"),
});

/* ----------------------------------
   STEP 3 — AVAILABILITY & PRICING
---------------------------------- */
export const stepThreeSchema = z.object({
  availability: z.string().min(1, "Availability is required"),
  hourly_rate: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),
});
/* ----------------------------------
   STEP 4 — SESSION PREFERENCES
---------------------------------- */
export const stepFourSchema = z.object({
  session_type: z.string().min(1, "Session type is required"),
});

/* ----------------------------------
   STEP 5 — DOCUMENTS
---------------------------------- */

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const requiredFile = (label) =>
  z
    .instanceof(File, { message: `${label} is required` })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    });

const optionalFile = z
  .union([z.instanceof(File), z.undefined()])
  .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
    message: "Max file size is 5MB",
  });

export const stepFiveSchema = z.object({
  profile_picture: requiredFile("Profile picture").refine(
    (file) => ["image/jpeg", "image/png"].includes(file.type),
    { message: "Only JPG or PNG allowed" }
  ),
  additional_documents: optionalFile,
  government_id: requiredFile("Government ID"),
  experince_letter: optionalFile,
  qualification_certificates: optionalFile,
  licence: requiredFile("License"),
});

// export const stepFiveSchema = z.object({
//   profile_picture: z.instanceof(File, {
//     message: "Profile picture is required",
//   }),
//   additional_documents: z.any().optional(),
//   government_id: z.instanceof(File, {
//     message: "Government ID is required",
//   }),
//   experince_letter: z.any().optional(),
//   qualification_certificates: z.any().optional(),
//   licence: z.instanceof(File, {
//     message: "License is required",
//   }),
// });

/* ----------------------------------
   FINAL — FULL SCHEMA (OPTIONAL)
---------------------------------- */
export const counsellorSignupSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema)
  .merge(stepFiveSchema);
