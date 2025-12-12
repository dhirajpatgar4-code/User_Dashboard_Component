import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import RightArrow from "../../assets/RightArrow.svg";
import { forgotPassword } from "../../services/authService";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched && error) {
      setError(emailRegex.test(value) ? "" : "Please enter a valid email");
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!email) {
      setError("Please enter a valid email");
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!email) {
      setError("Please enter a valid email");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        // Store email for OTP page (masked)
        const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, (_, start, middle, end) => {
          return start + "*".repeat(Math.min(middle.length, 10)) + end;
        });
        sessionStorage.setItem("resetEmail", email);
        sessionStorage.setItem("maskedEmail", maskedEmail);
        navigate("/verify-otp");
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* MOBILE PURPLE ARC HEADER */}
      <div className="absolute top-0 left-0 right-0 h-[240px] bg-purple-500 rounded-b-[50%] lg:hidden overflow-hidden" />

      {/* DESKTOP BRAND */}
      <div className="hidden lg:flex items-center gap-2 text-base font-semibold text-purple-500 absolute top-6 left-6">
        <span className="montserrat">Safe Harbour</span>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-[860px] flex flex-col items-center pt-[140px] lg:pt-0">
        {/* MOBILE TITLE IN PURPLE ARC */}
        <div className="lg:hidden flex flex-col items-center absolute top-[60px] left-1/2 -translate-x-1/2 z-20 w-full">
          <h1 className="montserrat text-center text-4xl font-semibold text-white mb-2">
            Forgot Your Password?
          </h1>
          <p className="text-center text-sm text-white/90 px-6">
            A code will be sent to your email to help reset password
          </p>
        </div>

        {/* ICON */}
        <div className="flex justify-center mb-6 lg:mb-8">
          <img src={Logo} alt="Safe Harbour logo" className="h-12 w-12 lg:h-16 lg:w-16" />
        </div>

        {/* DESKTOP TITLE */}
        <div className="hidden lg:flex flex-col items-center mb-6">
          <h1 className="montserrat text-[56px] font-semibold text-purple-500 mb-3">
            Forgot Your Password?
          </h1>
          <p className="inter text-lg text-muted text-center max-w-md">
            A code will be sent to your email to help reset password
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full max-w-[400px] lg:max-w-[500px] space-y-6" noValidate>
          {/* EMAIL INPUT */}
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              placeholder="Email"
              aria-label="Email address"
              aria-required="true"
              aria-invalid={touched && !!error}
              aria-describedby={error ? "email-error" : undefined}
              className={`w-full h-14 lg:h-[56px] rounded-lg border px-5 text-base
                placeholder-placeholder outline-none transition-colors
                ${error
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-purple-500/40 focus:ring-2 focus:ring-purple-200"
                }
                text-purple-600 bg-white`}
            />
            {touched && error && (
              <p
                id="email-error"
                role="alert"
                className="text-sm text-red-500 mt-2 inter"
              >
                {error}
              </p>
            )}
          </div>

          {/* CONTINUE BUTTON */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting || !email || !!error}
              aria-disabled={submitting || !email || !!error}
              className="group flex items-center justify-center gap-3 rounded-full
                bg-gradient-to-r from-purple-500 to-[#B28AF9] h-12 lg:h-[56px] w-[200px] lg:w-[260px]
                text-white font-medium text-base montserrat
                hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed
                transition-opacity shadow-lg"
            >
              Continue
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-purple-500">
                <img src={RightArrow} alt="" className="h-4 w-4" />
              </span>
            </button>
          </div>

          {/* BACK TO LOGIN LINK */}
          <div className="flex justify-center">
            <a
              href="/admin/login"
              className="text-sm text-muted hover:text-purple-500 underline inter transition-colors"
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

