import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import jwt_decode from "jwt-decode";
import Image from "next/image";
import dozeeIcon from "../../images/dozee-name-n-logo.png";

export async function getServerSideProps(context: any) {
  // get the authenticaton status
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    //user loged in
    const decode: any = jwt_decode(session?.user?.AccessToken);

    if (decode.exp < new Date().getTime() / 1000) {
      //if AcessToken is expired have to get a new token this is handeld in useEffect

      return {
        props: {
          currentStatus: "user logged in but refresh the token",
        },
      };
    } else {
      //every thing is fine and user loged in redirect to index page
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  // none of the case means user is notlogged in
  return {
    props: {
      currentStatus: "user not logedin",
    },
  };
}

const SignInPage = ({ currentStatus }) => {
  const [medium, setMedium] = useState<string>("");
  const [mediumValue, setMediumValue] = useState<string>("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpRequestOk, setOtpRequestOk] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const { status, data } = useSession();

  useEffect(() => {
    if (data?.user) {
      // this useEffect runs when there is a session but accessToken is expired this will genrate new
      // accessToken using refreshToken then call the singin funstion this will navigate to index page
      // i commented this code becase on localhost its http so token will not be genrated it will throw an error
      // in production build this has to be un commented
      // const fetchRefershToken = async () => {
      //   console.log("running");
      //   let token = await axios.get(
      //     "https://console.gateway.senslabs.io/api/tokens/refresh",
      //     {
      //       headers: { Authorization: "Bearer " + data.user.RefreshToken },
      //     }
      //   );
      //   token = token.data.AccessToken;
      //   const sinin = await signIn("credentials", {
      //     RefreshToken: data.user.RefreshToken,
      //     AccessToken: token,
      //     redirect: true,
      //   });
      // };
      // fetchRefershToken();
    }
  }, [status, data]);
  function setMediumAndValue(e: any) {
    // setting the medium value
    const mediumValue = "" + e.target.value;
    if (mediumValue.indexOf("@") !== -1) {
      setMedium("Email");
    } else {
      setMedium("Mobile");
    }
    setMediumValue(mediumValue);
  }
  //here request the otp but if the otp is wrong or error in fetching the otp has to handeled current its not handeled
  const requestOtp = async (e: any) => {
    console.log("requesting otp");

    e.preventDefault();
    setOtpRequested(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://console.gateway.senslabs.io/api/otp/request",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        Medium: medium,
        MediumValue: mediumValue,
      },
    };
    let getOtprespnse = await axios(config);
    setSessionId(getOtprespnse.data.SessionId);
    setOtpRequestOk(true);
  };
  const verifyOTP = async (e: any) => {
    //set one call the verify otp then set submitted state true to disable submitbutton and activate the spinner
    // error case is not handeled here have to work on that
    e.preventDefault();
    setOtpSubmitted(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://console.gateway.senslabs.io/api/otp/verify?category=USER",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        SessionId: sessionId,
        Medium: medium,
        MediumValue: mediumValue,
        Otp: otp,
      },
    };
    // in verifyResponse we will get sessionId
    let verifyOtpResponse = await axios(config);

    console.log("verifyed otp");
    //using to session is get accesstoken and Refershtoken
    let getTokensRespnse = await axios({
      method: "get",
      maxBodyLength: Infinity,
      url: "https://console.gateway.senslabs.io/api/tokens/request",
      headers: {
        Authorization: `Bearer ${verifyOtpResponse.data.AuthToken}`,
      },
    });
    if (getTokensRespnse.data) {
      //if accessToken and RefershToken is fetched then proceed to login in serverSide
      console.log("2");
      localStorage.setItem("AccessToken", getTokensRespnse.data.AccessToken);
      localStorage.setItem("RefreshToken", getTokensRespnse.data.RefreshToken);
      //calling next-Auths signin function by provinding credentials
      const sigIninssr = await signIn("credentials", {
        AccessToken: getTokensRespnse.data.AccessToken,
        RefershToken: getTokensRespnse.data.RefreshToken,
        redirect: true,
      });
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div
          className="border-6 bg-white p-10 rounded-lg border border-[#0055d2] border-t-1 shadow-md
"
        >
          <div className="drop-shadow-sm text-[#0055d2] text-lg">
            Welcome to Dozee Insights
          </div>
          <div className="flex justify-center py-6">
          <svg
                className="w-16 h-16 undefined"
                viewBox="0 0 109 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2091 82.5393C16.2005 82.6175 16.1915 82.7 16.1835 82.789C16.1057 82.7526 16.0538 82.7309 16.0175 82.7158C15.9814 82.7007 15.9607 82.6921 15.9451 82.6817C15.8783 82.6182 15.8123 82.5538 15.7464 82.4894C15.6793 82.424 15.6123 82.3586 15.5445 82.2941C13.7966 80.6014 11.7725 79.6046 9.28205 79.6772C7.47897 79.7291 5.81406 80.2103 4.29423 81.1587C2.18719 82.4706 0.981685 84.4401 0.353027 86.7938C-0.0683814 88.3688 -0.0856521 89.9713 0.159594 91.574C0.342665 92.7646 0.660448 93.9208 1.24075 94.9903C2.0283 96.4406 3.16817 97.5448 4.55675 98.4067C5.9695 99.2859 7.48589 99.8432 9.16116 99.9573C10.9331 100.079 12.6187 99.7358 14.2457 99.0574C15.541 98.5174 16.6636 97.7247 17.5893 96.6552C19.1852 94.8103 19.8794 92.6228 20.0107 90.2275C20.059 89.4002 20.0556 88.5694 20.0521 87.7387C20.0487 86.4857 20.0418 85.2319 20.0349 83.978C20.028 82.7241 20.0211 81.4702 20.0176 80.2172C20.0161 79.3151 20.0166 78.4137 20.017 77.5126C20.0175 76.3115 20.0181 75.111 20.0142 73.9106C20.0142 73.5402 19.9761 73.1699 19.9347 72.7995C19.8933 72.4119 19.7275 72.0657 19.4131 71.8441C18.7672 71.3873 18.0522 71.2488 17.3096 71.5638C16.5634 71.8823 16.2422 72.495 16.2422 73.3014C16.2457 76.2332 16.2457 79.165 16.2422 82.0967C16.2422 82.2383 16.2267 82.3799 16.2091 82.5393ZM16.3742 89.6799C16.3852 89.8233 16.3963 89.9667 16.409 90.1101C16.3158 91.5709 15.8668 92.8965 14.986 94.0699C13.8564 95.5861 12.3504 96.3891 10.4783 96.5552C7.62512 96.808 4.96197 94.9457 4.06387 92.2735C3.45249 90.4494 3.4145 88.6461 4.24004 86.8912C5.31083 84.6101 7.07936 83.2982 9.6389 83.1356C11.5767 83.0109 13.2209 83.6409 14.5576 85.0393C15.511 86.0362 16.0567 87.2408 16.264 88.5976C16.3184 88.957 16.3463 89.3182 16.3742 89.6799Z"
                  fill="#0055D2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M93.4801 92.7753C93.266 92.3116 93.1312 91.8235 93.0932 91.2247C93.3419 91.2247 93.5423 91.2247 93.7461 91.2212C94.6684 91.2212 95.5906 91.2214 96.5126 91.2216C99.2783 91.2223 102.043 91.2229 104.81 91.2177C105.5 91.2143 106.191 91.1866 106.882 91.1486C107.707 91.1035 108.302 90.5082 108.319 89.6706C108.333 88.9956 108.336 88.3137 108.25 87.6491C107.97 85.4996 107.128 83.6132 105.524 82.1213C104.019 80.716 102.223 79.9268 100.167 79.7433C98.7994 79.6222 97.473 79.8195 96.1708 80.228C93.4456 81.0829 91.4904 82.8067 90.3817 85.4477C89.5526 87.4276 89.3765 89.5079 89.639 91.6227C89.9465 94.1046 91.038 96.1675 93.0345 97.7009C95.0172 99.2239 97.2658 99.9993 99.7632 99.9993C101.176 100.003 102.547 99.7223 103.877 99.2412C104.889 98.8743 105.808 98.3516 106.592 97.604C106.848 97.3617 106.969 97.064 107.014 96.7109C107.12 95.8525 106.171 95.0322 105.411 95.001C104.741 94.9733 104.209 95.2675 103.67 95.5963C102.24 96.4686 100.692 96.8598 99.0205 96.7006C96.4265 96.4514 94.5716 95.1533 93.4801 92.7753ZM104.77 88.0811H93.1677C93.1816 87.2123 93.4476 86.4612 93.8861 85.7689C95.2402 83.6229 98.1106 82.4944 100.605 83.1002C102.991 83.6783 104.314 85.2324 104.767 87.5999C104.781 87.683 104.788 87.7696 104.791 87.8527C104.791 87.9014 104.785 87.9501 104.778 88.0115C104.776 88.033 104.773 88.056 104.77 88.0811Z"
                  fill="#0055D2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M72.813 94.4495C72.067 93.5254 71.5799 92.4835 71.3623 91.2235C71.5938 91.2235 71.7595 91.2235 71.9253 91.2271C72.8486 91.2219 73.7721 91.2163 74.6956 91.2106C78.098 91.1898 81.5021 91.169 84.9061 91.1717C85.8594 91.1717 86.6504 90.6594 86.6332 89.4445C86.6325 89.3985 86.6318 89.3524 86.6311 89.3064C86.6219 88.6766 86.6125 88.0423 86.5192 87.423C86.1945 85.2388 85.2722 83.3593 83.5797 81.9056C82.5504 81.023 81.3828 80.3964 80.0772 80.0295C78.2637 79.5242 76.4641 79.6488 74.6852 80.1646C71.6767 81.0402 69.5869 82.944 68.5126 85.9035C67.7942 87.8798 67.6698 89.929 67.9945 92.0024C68.2363 93.5531 68.8028 94.9827 69.8079 96.1907C71.7492 98.5201 74.2811 99.7386 77.2793 99.9669C78.616 100.067 79.946 99.9116 81.2413 99.5585C82.5262 99.209 83.704 98.6309 84.7299 97.7691C85.3655 97.2325 85.5209 96.3672 85.0615 95.7718C84.6954 95.2941 84.2083 95.0276 83.5866 95.0034C83.065 94.9827 82.6367 95.1833 82.2188 95.4498C80.5607 96.5091 78.7681 96.9625 76.8095 96.6337C75.2275 96.3672 73.8458 95.7268 72.813 94.4495ZM83.0436 88.0035C83.0379 88.028 83.0317 88.0542 83.0259 88.0831C79.1849 88.0831 75.3577 88.0831 71.5029 88.0797C71.413 87.4496 71.6514 86.9097 71.8897 86.3767C72.7601 84.4313 74.349 83.438 76.3732 83.0502C78.1625 82.7076 79.7894 83.0641 81.2194 84.2271C82.2799 85.0925 82.8566 86.2243 83.0536 87.5639C83.0709 87.6643 83.0709 87.7681 83.0673 87.8685C83.065 87.9123 83.0551 87.9546 83.0436 88.0035Z"
                  fill="#0055D2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M41.6549 97.2922C43.6583 95.2673 44.5978 92.7959 44.6358 89.5976C44.6209 89.4763 44.606 89.3287 44.5892 89.1623C44.5438 88.7117 44.4843 88.123 44.3734 87.5416C43.9036 85.0702 42.6428 83.0868 40.6152 81.6018C39.2162 80.5774 37.6343 80.0339 35.9279 79.8366C35.4132 79.7777 34.8882 79.7293 34.3701 79.7397C33.9444 79.7488 33.5162 79.8142 33.0899 79.8794C33.0318 79.8883 32.9738 79.8971 32.9158 79.9059C29.3857 80.4423 26.8296 82.2734 25.4099 85.5998C24.5119 87.7042 24.3564 89.885 24.8021 92.1175C25.4065 95.1358 27.0093 97.4238 29.7656 98.8429C32.0661 100.027 34.4875 100.262 36.9987 99.7118C38.7672 99.324 40.37 98.5903 41.6549 97.2922ZM29.2432 93.6972C28.5731 92.683 28.2345 91.2639 28.2345 89.3255C28.276 88.2456 28.6213 86.7607 29.6438 85.5249C31.8096 82.9081 36.041 82.0359 39.015 84.9607C40.0995 86.0269 40.6799 87.3249 40.8802 88.8098C41.1496 90.8035 40.7697 92.6519 39.5538 94.2753C38.5037 95.6771 37.0668 96.4559 35.3398 96.6186C32.7423 96.8678 30.687 95.8848 29.2432 93.6972Z"
                  fill="#0055D2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M41.6549 97.2922C43.6583 95.2673 44.5978 92.7959 44.6358 89.5976C44.6209 89.4763 44.606 89.3287 44.5892 89.1623C44.5438 88.7117 44.4843 88.123 44.3734 87.5416C43.9036 85.0702 42.6428 83.0868 40.6152 81.6018C39.2162 80.5774 37.6343 80.0339 35.9279 79.8366C35.4132 79.7777 34.8882 79.7293 34.3701 79.7397C33.9444 79.7488 33.5162 79.8142 33.0899 79.8794C33.0318 79.8883 32.9738 79.8971 32.9158 79.9059C29.3857 80.4423 26.8296 82.2734 25.4099 85.5998C24.5119 87.7042 24.3564 89.885 24.8021 92.1175C25.4065 95.1358 27.0093 97.4238 29.7656 98.8429C32.0661 100.027 34.4875 100.262 36.9987 99.7118C38.7672 99.324 40.37 98.5903 41.6549 97.2922ZM29.2432 93.6972C28.5731 92.683 28.2345 91.2639 28.2345 89.3255C28.276 88.2456 28.6213 86.7607 29.6438 85.5249C31.8096 82.9081 36.041 82.0359 39.015 84.9607C40.0995 86.0269 40.6799 87.3249 40.8802 88.8098C41.1496 90.8035 40.7697 92.6519 39.5538 94.2753C38.5037 95.6771 37.0668 96.4559 35.3398 96.6186C32.7423 96.8678 30.687 95.8848 29.2432 93.6972Z"
                  fill="#0055D2"
                />
                <path
                  d="M54.1892 96.3143C54.4483 96.3143 54.6279 96.3143 54.8075 96.3143C57.4464 96.3143 60.082 96.3108 62.721 96.3178C63.0733 96.3178 63.4291 96.3593 63.778 96.4147C64.3375 96.5047 64.7866 96.9166 64.8625 97.4738C64.9143 97.8684 64.9074 98.2873 64.8384 98.6818C64.7313 99.298 64.296 99.6338 63.695 99.7515C63.5292 99.7826 63.3599 99.7861 63.1908 99.7861C59.0629 99.7895 54.9387 99.7792 50.811 99.7964C50.1374 99.7998 49.4466 99.4295 49.2083 98.7823C49.039 98.3219 49.0356 97.8477 49.229 97.4012C49.3809 97.048 49.5641 96.695 49.7954 96.387C52.4137 92.8979 55.0458 89.4158 57.6709 85.9337C58.1787 85.2587 58.69 84.5838 59.1943 83.9088C59.3013 83.7634 59.3912 83.6076 59.5431 83.3758C59.2806 83.3758 59.1045 83.3758 58.9249 83.3758C56.1684 83.3758 53.4119 83.3792 50.6556 83.3722C50.3723 83.3722 50.0821 83.3307 49.8058 83.265C49.2463 83.1265 48.8836 82.7665 48.8041 82.185C48.7592 81.8528 48.735 81.5032 48.7903 81.1778C48.9181 80.4093 49.4293 79.9905 50.2376 79.942C50.6417 79.9179 51.0493 79.904 51.4535 79.904C55.0216 79.9005 58.5897 79.9005 62.158 79.904C62.4446 79.904 62.7313 79.9351 63.018 79.9351C64.2304 79.9282 64.6794 81.0324 64.5448 81.9357C64.4722 82.4307 64.2373 82.8634 63.9368 83.2615C62.8246 84.7326 61.7123 86.2037 60.607 87.6782C58.5691 90.3954 56.5345 93.1195 54.5 95.84C54.4068 95.9612 54.3273 96.1031 54.1892 96.3143Z"
                  fill="#0055D2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M82.1625 68.1447H82.7773V68.1436C82.7773 67.8257 82.7773 67.5905 82.7842 67.3485C82.7803 64.2591 82.7769 61.1694 82.7736 58.0795C82.7651 50.3196 82.7567 42.5584 82.7394 34.7972C82.7359 33.3261 82.6564 31.855 82.577 30.3874C82.4768 28.5044 82.1037 26.6629 81.5857 24.8561C80.1072 19.6777 77.6029 15.0671 73.969 11.083C72.1107 9.04769 70.0657 7.23391 67.7791 5.70741C64.9465 3.81747 61.8826 2.42252 58.6254 1.44293C55.9794 0.646808 53.2816 0.141439 50.5217 0.0341353C48.0036 -0.0627846 45.4888 0.0341353 43.0018 0.487582C41.0398 0.844109 39.102 1.29756 37.2298 1.98985C34.19 3.11481 31.3507 4.63783 28.6875 6.48624C26.5114 7.99541 24.5459 9.75036 22.8222 11.7649C20.5217 14.4441 18.722 17.4348 17.4128 20.7161C16.4629 23.0942 15.7721 25.5517 15.2678 28.0613C14.9949 29.4008 14.8118 30.7578 14.7496 32.1284C14.6944 33.3643 14.684 34.6 14.8153 35.8323C14.8632 36.2821 14.904 36.7323 14.9448 37.1822C15.0245 38.0618 15.1042 38.9403 15.2367 39.8128C15.8861 44.0843 17.4198 48.0372 19.6305 51.7341C21.4509 54.78 23.7169 57.4592 26.3939 59.7818C28.3524 61.4814 30.4733 62.9594 32.7669 64.1744C35.6512 65.7044 38.6909 66.7912 41.8861 67.4489C43.7756 67.8365 45.6754 68.1343 47.6029 68.1377C56.2444 68.1481 64.8859 68.1468 73.5274 68.1455C76.4057 68.1451 79.2841 68.1447 82.1625 68.1447ZM68.6284 37.7402C68.6618 37.7685 68.7011 37.8018 68.7485 37.8432C68.7788 37.7852 68.8085 37.7362 68.8351 37.6925C68.8783 37.6213 68.9132 37.564 68.9281 37.5039C68.9481 37.409 68.9446 37.3103 68.9411 37.212C68.9398 37.1742 68.9385 37.1364 68.9385 37.0989C68.9385 36.145 68.9383 35.1911 68.938 34.2372C68.9374 31.3765 68.9368 28.5158 68.9419 25.6551C68.9454 25.3194 68.973 24.9766 69.0422 24.6478C69.3427 23.2563 70.334 22.5571 71.7504 22.7336C72.9904 22.8893 73.7297 23.5851 73.8298 24.8312C73.8326 24.864 73.8355 24.8969 73.8384 24.9297C73.8635 25.216 73.8889 25.5044 73.892 25.7901C73.8982 26.2704 73.897 26.7495 73.8957 27.2281C73.8949 27.5462 73.894 27.8642 73.8954 28.1821C73.8982 29.0382 73.901 29.8945 73.9039 30.7509C73.9156 34.2157 73.9273 37.6823 73.93 41.1489C73.93 41.5581 73.9308 41.9674 73.9316 42.3766C73.9348 44.0859 73.938 45.7951 73.8851 47.5043C73.7884 50.6959 72.7935 53.5793 70.7174 56.0405C69.9471 56.9508 69.0317 57.6986 68.0023 58.3077C66.3443 59.2874 64.586 59.9936 62.6723 60.2947C60.382 60.6547 58.161 60.3778 55.995 59.6162C54.1332 58.962 52.5062 57.9027 51.121 56.5009C49.3454 54.7043 48.285 52.5374 47.8117 50.0555C47.5147 48.4943 47.4283 46.9262 47.5596 45.3547C47.7634 42.9316 48.5234 40.692 49.912 38.6843C51.3386 36.6247 53.2903 35.2609 55.6255 34.4197C56.9554 33.942 58.3164 33.6374 59.7292 33.6097C61.3942 33.5785 62.9832 33.9352 64.4893 34.6378C66.0265 35.3543 67.3495 36.3616 68.4894 37.6147C68.5253 37.6528 68.5669 37.6881 68.6284 37.7402Z"
                  fill="#0055D2"
                />
                <path
                  d="M52.1743 47.0702C52.0914 44.803 52.8203 42.8093 54.2227 41.0544C55.518 39.4344 57.2244 38.5276 59.2554 38.1987C60.606 37.9807 61.9462 38.0153 63.2622 38.4134C64.4609 38.7768 65.504 39.4137 66.4262 40.2618C68.1741 41.8713 68.9651 43.9134 69.1861 46.2394C69.3243 47.6829 69.1689 49.0812 68.6645 50.4277C67.6904 53.0238 65.9772 54.931 63.2726 55.7409C59.093 56.9939 55.1553 55.2633 53.1934 51.5215C52.4403 50.0781 52.1743 48.7975 52.1743 47.0702Z"
                  fill="#0055D2"
                />
              </svg>
          </div>
          <div className="drop-shadow-sm text-[#0055d2] text-center text-3xl">
            Sign In
          </div>
          <form className="flex flex-col gap-4 pt-7">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mediumValue" value="Your Email or Phone" />
              </div>
              <TextInput
                id="mediumValue"
                type="text"
                style={{
                  padding: "10px",
                }}
                placeholder="Email or Phone"
                required={true}
                disabled={otpRequested}
                onChange={setMediumAndValue}
              />
            </div>
            {otpRequestOk && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="otp" value="Received OTP" />
                </div>
                <TextInput
                  id="otp"
                  type="text"
                  style={{
                    padding: "10px",
                  }}
                  required={true}
                  disabled={otpSubmitted}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            {!otpRequestOk && (
              <Button style={{ padding: "10px" }}>
                {otpRequested && <Spinner size="sm" />}
                <span
                  className="px-2 bg-blue-700 text-white "
                  onClick={requestOtp}
                >
                  Submit
                </span>
              </Button>
            )}
            {otpRequestOk && (
              <Button style={{ padding: "10px" }}>
                {otpSubmitted ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  </>
                ) : (
                  <span
                    className="px-2 bg-blue-700 text-white"
                    onClick={verifyOTP}
                  >
                    Verify
                  </span>
                )}
              </Button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
