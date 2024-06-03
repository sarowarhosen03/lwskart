import { useState } from "react";

export default function useShowHidePassword(status = false) {
  const [showPassword, setShowPassword] = useState(status);

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const ShowHideIcon = (
    <i
      key={"password-view-toggle"}
      title={showPassword ? "Hide password" : "Show password"}
      onClick={handleShowPassword}
      className={`fa-solid cursor-pointer text-primary ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
    ></i>
  );

  return [ShowHideIcon, showPassword];
}
