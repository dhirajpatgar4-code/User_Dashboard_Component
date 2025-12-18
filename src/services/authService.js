/**
 * Authentication service for password reset flow
 * Handles API calls for forgot password, OTP verification, and password reset
 * this will be used to handle the API calls for the password reset flow
 * the mock implementation will be used to handle the API calls for the password reset flow until the API is ready
 */

/**
 * Request password reset code
 * @param {string} email - User email address
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const forgotPassword = async (email) => {
  // TODO: Replace with actual API call
  // Example: return api.post('/auth/forgot-password', { email });

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Password reset code sent to your email',
      });
    }, 1000);
  });
};

/**
 * Verify OTP code
 * @param {string} email - User email address
 * @param {string} otp - 4-digit OTP code
 * @returns {Promise<{success: boolean, token?: string, message?: string}>}
 */
export const verifyOTP = async (email, otp) => {
  // TODO: Replace with actual API call
  // Example: return api.post('/auth/verify-otp', { email, otp });

  // Mock implementation - accepts any 4-digit code
  return new Promise((resolve) => {
    setTimeout(() => {
      if (otp.length === 4 && /^\d{4}$/.test(otp)) {
        resolve({
          success: true,
          token: 'mock-reset-token',
          message: 'OTP verified successfully',
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid OTP code',
        });
      }
    }, 1000);
  });
};

/**
 * Reset password with new password
 * @param {string} token - Reset token from OTP verification
 * @param {string} password - New password
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const resetPassword = async (token, password) => {
  // TODO: Replace with actual API call
  // Example: return api.post('/auth/reset-password', { token, password });

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Password reset successfully',
      });
    }, 1000);
  });
};
