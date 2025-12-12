import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import RightArrow from "../../assets/RightArrow.svg";
import { verifyOTP } from "../../services/authService";

const OTP_LENGTH = 4;
const RESEND_COOLDOWN = 60; // seconds

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const email = sessionStorage.getItem("resetEmail") || "example@gmail.com";
  const maskedEmail = sessionStorage.getItem("maskedEmail") || email;

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-advance to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split("");
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < OTP_LENGTH) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);
      setError("");
      // Focus last input
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== OTP_LENGTH) {
      setError("Please enter the complete verification code");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const result = await verifyOTP(email, otpString);
      if (result.success) {
        sessionStorage.setItem("resetToken", result.token || "mock-token");
        navigate("/reset-password");
      } else {
        setError(result.message || "Invalid verification code. Please try again.");
        // Clear OTP on error
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setResendTimer(RESEND_COOLDOWN);
    setCanResend(false);
    setError("");
    
    // Call forgotPassword again to resend code
    try {
      const { forgotPassword } = await import("../../services/authService");
      await forgotPassword(email);
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
    {/* MOBILE PURPLE ARC */}
    <div
        className="absolute left-1/2 top-[-140px] z-0 h-[280px] w-full max-w-[420px]
        -translate-x-1/2 rounded-b-[220px] bg-purple-500 lg:hidden"
      />

      {/* DESKTOP BRAND */}
      <div className="hidden lg:flex items-center gap-2 text-base font-semibold text-purple-500 absolute top-6 left-6">
        <span className="montserrat">Safe Harbour</span>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-[860px] flex flex-col items-center pt-[140px] lg:pt-0">
        {/* MOBILE TITLE IN PURPLE ARC */}
        <div className="lg:hidden flex flex-col items-center absolute top-[60px] left-1/2 -translate-x-1/2 z-20 w-full">
          <h1 className="montserrat text-center text-4xl font-semibold text-white mb-2">
            Check your email
          </h1>
          <p className="text-center text-sm text-white/90 px-6">
            Please enter the four digit verification code we sent to
          </p>
          <p className="text-center text-sm font-semibold text-white mt-1">
            {maskedEmail}
          </p>
        </div>

        {/* ICON */}
        <div className="flex justify-center mb-6 lg:mb-8">
          <img src={Logo} alt="Safe Harbour logo" className="h-12 w-12 lg:h-16 lg:w-16" />
        </div>

        {/* DESKTOP TITLE */}
        <div className="hidden lg:flex flex-col items-center mb-6">
          <h1 className="montserrat text-[56px] font-semibold text-purple-500 mb-3">
            Check your email
          </h1>
          <p className="inter text-lg text-muted text-center max-w-md">
            Please enter the four digit verification code we sent to
          </p>
          <p className="inter text-lg font-semibold text-muted mt-1">
            {maskedEmail}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full max-w-[400px] lg:max-w-[500px] space-y-6" noValidate>
          {/* OTP INPUT BOXES */}
          <div className="flex justify-center gap-4 lg:gap-7">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                aria-label={`Digit ${index + 1} of verification code`}
                aria-required="true"
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl border border-purple-500/40
                  bg-purple-100 text-center text-2xl font-semibold text-purple-600
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-500
                  outline-none transition-all"
              />
            ))}
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-red-500 text-center inter"
            >
              {error}
            </p>
          )}

          {/* CONTINUE BUTTON */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting || otp.join("").length !== OTP_LENGTH}
              aria-disabled={submitting || otp.join("").length !== OTP_LENGTH}
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

          {/* RESEND AND BACK LINKS */}
          <div className="flex flex-col items-center gap-2 text-sm inter">
            <p className="text-muted">
              Didn't get the code?{" "}
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-purple-500 underline hover:text-purple-600"
                >
                  Resend
                </button>
              ) : (
                <span className="text-purple-500 underline">
                  Resend in {formatTime(resendTimer)}
                </span>
              )}
            </p>
            <p className="text-muted">
              Entered wrong email?{" "}
              <a
                href="/forgot"
                className="text-purple-500 underline hover:text-purple-600"
              >
                Back
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

