import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

import {
  verifyOtpApiCall,
  getAccessAndRefershToken,
} from "../../utils/package/signInApiCalls";

export default function useOtp(setOtpSubmitted: any) {
  const [error, setError] = useState<null | any>(null);

  const verifyOtp = useCallback(
    async (
      sessionId: string,
      otp: string,
      medium: string,
      mediumValue: string
    ) => {
      try {
        setError("");
        console.log(medium, mediumValue);
        const verifyOtpResponse = await verifyOtpApiCall(
          sessionId,
          medium,
          mediumValue,
          otp
        );
        const getTokenResponse = await getAccessAndRefershToken(
          verifyOtpResponse.data.AuthToken
        );

        signIn("credentials", {
          AccessToken: getTokenResponse.data.AccessToken,
          RefreshToken: getTokenResponse.data.RefreshToken,
          redirect: true,
        });
      } catch (e) {
        setError("In correctOtp");
        setOtpSubmitted(false);
      }
    },
    []
  );
  function clearError() {
    setError(null);
  }

  return { verifyOtp, error, clearError };
}
