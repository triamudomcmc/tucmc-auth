import React, { useState } from "react"
import { useAuth } from "./auth"
import { Loader } from "./vectors/Loader"

export const TUCMCLogin = () => {
  const [hover, setHover] = useState(false)
  const { loading, signIn } = useAuth()

  const styles = {
    backgroundImage: "linear-gradient(to right, #a78bfa, #ec4899, #ef4444)",
    color: "rgba(255, 255, 255, 1)",
    fontWeight: 600,
    borderRadius: "0.375rem",
    fontSize: "15.4px",
    fontFamily: "Arial, Helvetica, sans-serif",
    lineHeight: "1.25rem",
    border: "none",
    cursor: "pointer",
    transition: "filter 300ms ease",
    width: "216px",
  }

  const hoverStyle = {
    filter: "brightness(0.8)"
  }

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={signIn}
      style={{
        ...styles,
        ...(hover && hoverStyle),
        ...loading ? {padding: "0.20rem 2rem"} : {padding: "0.6rem 2rem" }
      }}
    >
      {loading ? <Loader /> : "Login with TUCMC"}
    </button>
  )
}
