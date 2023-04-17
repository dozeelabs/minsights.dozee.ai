import React, { useCallback, useState } from "react";
import { requestOTP } from "../../utils/package/signInApiCalls";

export default function useSendOtp(setOtpRequested: any) {
  const [errorInGettingOtp, setErrorInGettingOtp] = useState(false);
  const [otpRequestCompleted, setOtpRequestCompleted] = useState(false);
  const [sessionID, setSessionID] = useState("");

  const sendOTP = useCallback(async (medium: string, mediumValue: string) => {
    if (errorInGettingOtp) {
      setErrorInGettingOtp(false);
    }

    try {
      const response = await requestOTP(medium, mediumValue);
      setSessionID(response.data.SessionId);
      setOtpRequestCompleted(true);
    } catch {
      console.log("there was an error in request otp ");
      setErrorInGettingOtp(true);
      setOtpRequested(false);
    }
  }, []);

  return { sessionID, errorInGettingOtp, sendOTP, otpRequestCompleted };
}
