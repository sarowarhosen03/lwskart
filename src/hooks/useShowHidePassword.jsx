import { useState } from "react";

export default function useShowHidePassword(status = false) {
  const [showPassword, setShowPassword] = useState(status);

  function handelShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return [
    <i
      key={"password view toggle"}
      title={showPassword ? "Hide password" : "Show password"}
      onClick={handelShowPassword}
      className={`fa-solid relative right-8 top-4 text-primary ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
    ></i>,
    showPassword,
  ];
}
