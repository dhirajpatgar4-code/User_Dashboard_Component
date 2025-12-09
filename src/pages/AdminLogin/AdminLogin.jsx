import { useMemo, useState } from "react";
import RightArrow from "../../assets/RightArrow.svg";
import LoginHero from "../../assets/login 1.png";
import Logo from "../../assets/Logo.png";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRules = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /\d/.test(v) },
  { label: "One special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export default function AdminLogin() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitting, setSubmitting] = useState(false);

  const passwordChecks = useMemo(
    () => passwordRules.map((r) => ({ ...r, passed: r.test(formValues.password) })),
    [formValues.password]
  );

  const emailError = useMemo(() => {
    if (!formValues.email) return "Email is required";
    if (!emailRegex.test(formValues.email)) return "Enter a valid email";
    return "";
  }, [formValues.email]);

  const passwordError = useMemo(() => {
    if (!formValues.password) return "Password is required";
    const failed = passwordChecks.filter((r) => !r.passed);
    return failed.length > 0 ? "Password does not meet requirements" : "";
  }, [formValues.password, passwordChecks]);

  const isFormValid = !emailError && !passwordError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isFormValid) return;
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 600);
  };

  return (
    <div className="relative h-screen bg-white flex flex-col lg:flex-row overflow-hidden">

      {/* MOBILE PURPLE ARC */}
      <div
        className="absolute left-1/2 top-[-140px] z-0 h-[280px] w-full max-w-[420px]
        -translate-x-1/2 rounded-b-[220px] bg-purple-500 lg:hidden"
      />

      {/* LEFT SIDE */}
      <div className="relative z-10 w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-6 flex flex-col">

        {/* DESKTOP BRAND */}
        <div className="hidden lg:flex items-center gap-2 text-base font-semibold text-purple-500 mb-8">
          <span className="montserrat">Safe Harbour</span>
        </div>

        {/* MOBILE TITLE IN PURPLE ARC */}
        <div className="lg:hidden flex flex-col items-center absolute top-[45px] left-1/2 -translate-x-1/2 z-20 w-full">
          <h1 className="montserrat text-center text-4xl font-semibold text-white">
            Welcome
          </h1>
        </div>

        {/* CENTER CONTENT (FORM AREA) */}
        <div className="flex flex-1 items-center justify-center w-full lg:ml-[27%] pt-[140px] lg:pt-0">
          <div className="w-full max-w-[563px] flex flex-col items-center">
            
            {/* MOBILE ICON BELOW ARC */}
            <div className="lg:hidden flex justify-center mb-4">
              <img src={Logo} alt="brand icon" className="h-10 w-10" />
            </div>

            {/* DESKTOP TITLE + ICON */}
            <div className="hidden lg:flex flex-col items-center gap-3 mb-6">
              <img src={Logo} className="h-10 w-10" />
              <h1 className="montserrat text-[52px] font-semibold text-purple-500">
                Welcome
              </h1>
            </div>

            {/* FORM */}
            <form className="w-full space-y-4" onSubmit={handleSubmit} noValidate>

              {/* EMAIL FIELD */}
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-xl border border-purple-300 px-4 py-3 text-lg
                  text-purple-600 outline-none focus:ring-2 focus:ring-purple-200"
                />
                {touched.email && emailError && (
                  <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-xl border border-purple-300 px-4 py-3 text-lg
                  text-purple-600 outline-none focus:ring-2 focus:ring-purple-200"
                />

                <div className="flex justify-between mt-1">
                  {touched.password && passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                  <a className="text-sm text-neutral-600 hover:text-purple-500" href="#">
                    Forgot Password?
                  </a>
                </div>

                {touched.password && passwordError && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-red-500 mt-2">
                    {passwordChecks
                      .filter((r) => !r.passed)
                      .map((r) => (
                        <li key={r.label} className="flex items-center gap-2">
                          <span className="h-2 w-2 bg-red-500 rounded-full" />
                          {r.label}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              {/* BUTTON */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={!isFormValid || submitting}
                  className="group flex items-center gap-3 rounded-full bg-purple-500
                  px-10 py-3 text-lg font-semibold text-white hover:bg-purple-600 disabled:opacity-60"
                >
                  Continue
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white
                    text-purple-500 group-hover:translate-x-0.5 transition">
                    <img src={RightArrow} alt="" className="h-4 w-4" />
                  </span>
                </button>
              </div>

              {/* TERMS */}
              <p className="text-center text-xs text-neutral-500 mt-4">
                By continuing, you agree to our{" "}
                <a className="underline hover:text-purple-500">Terms</a> and{" "}
                <a className="underline hover:text-purple-500">Privacy Policy</a>
              </p>

              <p className="text-center text-xs text-neutral-600 mt-1">
                Don’t Have an account?{" "}
                <a className="underline hover:text-purple-500">Signup</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden lg:flex justify-end items-center w-1/2 h-screen bg-white overflow-hidden">
        <img
          src={LoginHero}
          alt="Medical professional assisting"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}
