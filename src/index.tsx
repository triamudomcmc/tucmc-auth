import React, { useContext, useEffect, useState } from "react";
import { IAuthContext } from "./interfaces/IAuthContext";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Loader } from "./vectors/Loader";
import * as crypto from "crypto";

const AuthContext = React.createContext<IAuthContext | null>(null);

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, TOKEN }): JSX.Element => {
  const auth = useProvideAuth(TOKEN);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useProvideAuth(token) {
  const [prevPop, setPrevPop] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = () => {
    const data = window.localStorage.getItem("data");

    if (data) {
      const parsed = JSON.parse(data);
      return parsed.data;
    } else {
      return null;
    }
  };

  const reFetch = () => {
    setUserData(user());
  };

  const SignInWithTUCMC = () => {
    return (
      <button
        onClick={signin}
        style={{
          backgroundImage: "linear-gradient(to right, #a78bfa, #ec4899, #ef4444)",
          color: "rgba(255, 255, 255, 1)",
          padding: loading ? "0.14rem 4.71rem" : "0.5rem 2rem",
          fontWeight: 600,
          borderRadius: "0.375rem",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          border: "none",
        }}
      >
        {loading ? <Loader /> : "Login with TUCMC"}
      </button>
    );
  };

  useEffect(() => {
    reFetch();
  }, []);

  const signOut = () => {
    window.localStorage.setItem("data", "");
    reFetch();
  };

  const fetchToken = async () => {
    const fp = await FingerprintJS.load();
    const fingerPrint = await fp.get();

    const res = await fetch(`https://account.triamudom.club/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "fetchAuthToken",
        authToken: window.sessionStorage.getItem("authToken"),
        reqToken: token,
        fp: fingerPrint.visitorId,
      }),
    });

    const jsonResult = await res.json();

    if (jsonResult.status) {
      window.sessionStorage.setItem("authToken", "");
      window.localStorage.setItem("data", JSON.stringify(jsonResult.data.data));
      reFetch();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prevPop) {
      const inter = setInterval(() => {
        if (prevPop.closed) {
          fetchToken();
          clearInterval(inter);
        }
      }, 500);
    }
  }, [prevPop]);

  const genToken = async () => {
    const fp = await FingerprintJS.load();
    const fingerPrint = await fp.get();

    const res = await fetch(`https://account.triamudom.club/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "genAuthToken",
        reqToken: token,
        fp: fingerPrint.visitorId,
      }),
    });

    return await res.json();
  };

  const checkToken = () => {
    return token.length === 44;
  };

  const signin = () => {
    if (loading) return;
    if (prevPop) {
      prevPop.close();
    }

    if (!checkToken()) {
      console.error("invalid_client_token");
      return;
    }

    const data = window.localStorage.getItem("data");
    if (data) return;
    setLoading(true);

    const wid = window.open("https://account.triamudom.club/auth", "_blank", "width=492,height=740");
    setPrevPop(wid);

    genToken().then((jsonResult) => {
      if (jsonResult.status) {
        window.sessionStorage.setItem("authToken", jsonResult.data.authToken);
        wid.location.replace(`https://account.triamudom.club/auth?authToken=${jsonResult.data.authToken}`);
      }
    });
  };

  return {
    SignInWithTUCMC,
    signOut,
    reFetch,
    userData,
  };
}
