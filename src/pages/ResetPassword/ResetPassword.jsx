import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import RightArrow from "../../assets/RightArrow.svg";
import { resetPassword } from "../../services/authService";

const passwordRules = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /\d/.test(v) },
];

const getPasswordStrength = (password) => {
  if (!password) return { level: "none", label: "", color: "" };
  
  const passedRules = passwordRules.filter((rule) => rule.test(password)).length;
  
  if (passedRules < 2) return { level: "weak", label: "Weak", color: "text-red-500" };
  if (passedRules < 4) return { level: "medium", label: "Medium", color: "text-yellow-500" };
  return { level: "strong", label: "Strong", color: "text-green-500" };
};

export default function ResetPassword() {
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordChecks = useMemo(
    () => passwordRules.map((r) => ({ ...r, passed: r.test(formValues.password) })),
    [formValues.password]
  );

  const passwordStrength = useMemo(
    () => getPasswordStrength(formValues.password),
    [formValues.password]
  );

  const passwordError = useMemo(() => {
    if (!touched.password) return "";
    if (!formValues.password) return "Password is required";
    const failed = passwordChecks.filter((r) => !r.passed);
    return failed.length > 0 ? "Password does not meet requirements" : "";
  }, [formValues.password, passwordChecks, touched.password]);

  const confirmPasswordError = useMemo(() => {
    if (!touched.confirmPassword) return "";
    if (!formValues.confirmPassword) return "Please confirm your password";
    if (formValues.password !== formValues.confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  }, [formValues.password, formValues.confirmPassword, touched.confirmPassword]);

  const isFormValid = !passwordError && !confirmPasswordError && formValues.password && formValues.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true });

    if (!isFormValid) {
      setError("Please fix the errors above");
      return;
    }

    const token = sessionStorage.getItem("resetToken");
    if (!token) {
      setError("Session expired. Please start over.");
      setTimeout(() => navigate("/forgot"), 2000);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const result = await resetPassword(token, formValues.password);
      if (result.success) {
        // Clear session data
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("maskedEmail");
        sessionStorage.removeItem("resetToken");
        
        // Redirect to login with success message
        navigate("/admin/login", { state: { message: "Password reset successfully! Please login with your new password." } });
      } else {
        setError(result.message || "Failed to reset password. Please try again.");
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
          <h1 className="montserrat text-center text-4xl font-semibold text-white">
            Set a new Password
          </h1>
        </div>

        {/* ICON */}
        <div className="flex justify-center mb-6 lg:mb-8">
          <img src={Logo} alt="Safe Harbour logo" className="h-12 w-12 lg:h-16 lg:w-16" />
        </div>

        {/* DESKTOP TITLE */}
        <div className="hidden lg:flex flex-col items-center mb-6">
          <h1 className="montserrat text-[56px] font-semibold text-purple-500">
            Set a new Password
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full max-w-[400px] lg:max-w-[500px] space-y-6" noValidate>
          {/* PASSWORD INPUT */}
          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="New Password"
              aria-label="New password"
              aria-required="true"
              aria-invalid={touched.password && !!passwordError}
              aria-describedby={passwordError ? "password-error" : undefined}
              className={`w-full h-12 lg:h-[56px] rounded-lg border px-5 text-base
                placeholder-placeholder outline-none transition-colors
                ${passwordError
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-purple-500/40 focus:ring-2 focus:ring-purple-200"
                }
                text-purple-600 bg-white`}
            />
            {touched.password && formValues.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-medium ${passwordStrength.color} inter`}>
                    Password strength: {passwordStrength.label}
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted">
                  {passwordChecks.map((rule) => (
                    <li
                      key={rule.label}
                      className={`flex items-center gap-2 ${
                        rule.passed ? "text-green-600" : "text-muted"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          rule.passed ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      {rule.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {touched.password && passwordError && (
              <p
                id="password-error"
                role="alert"
                className="text-sm text-red-500 mt-2 inter"
              >
                {passwordError}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD INPUT */}
          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              aria-label="Confirm password"
              aria-required="true"
              aria-invalid={touched.confirmPassword && !!confirmPasswordError}
              aria-describedby={confirmPasswordError ? "confirm-password-error" : undefined}
              className={`w-full h-12 lg:h-[56px] rounded-lg border px-5 text-base
                placeholder-placeholder outline-none transition-colors
                ${confirmPasswordError
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-purple-500/40 focus:ring-2 focus:ring-purple-200"
                }
                text-purple-600 bg-white`}
            />
            {touched.confirmPassword && confirmPasswordError && (
              <p
                id="confirm-password-error"
                role="alert"
                className="text-sm text-red-500 mt-2 inter"
              >
                {confirmPasswordError}
              </p>
            )}
            {touched.confirmPassword &&
              formValues.confirmPassword &&
              !confirmPasswordError &&
              formValues.password === formValues.confirmPassword && (
                <p className="text-sm text-green-600 mt-2 inter">Passwords match</p>
              )}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-500 text-center inter">
              {error}
            </p>
          )}

          {/* CONTINUE BUTTON */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid || submitting}
              aria-disabled={!isFormValid || submitting}
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
        </form>
      </div>
    </div>
  );
}

