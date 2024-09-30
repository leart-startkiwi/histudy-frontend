import { useState } from "react";
import { useLogin } from "../../../reactQuery/useLogin";
import { inputStyle, labelStyle } from "../../../utils/helpers";
import { Link } from "react-router-dom";
import { useSignup } from "../../../reactQuery/useSignup";

function LoginSignUp({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { login } = useLogin();
  const { signup } = useSignup();

  return (
    <div className="mx-auto flex w-3/4 items-start gap-x-32">
      <img src="/public/login-img.png" />
      <div className="w-[28rem]">
        <h2 className="mt-20 text-center text-4xl font-bold">
          {type === "login"
            ? "Log in to your HiStudy account"
            : "Sign up and start learning"}
        </h2>
        <div className="mt-10 flex flex-col gap-y-4">
          {type === "signup" && (
            <>
              <div className="relative w-full">
                <input
                  id="firstName"
                  type="text"
                  className={inputStyle}
                  placeholder=" "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor={"firstName"} className={labelStyle}>
                  First Name
                </label>
              </div>
              <div className="relative w-full">
                <input
                  id="lastName"
                  type="text"
                  className={inputStyle}
                  placeholder=" "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor={"lastName"} className={labelStyle}>
                  Last Name
                </label>
              </div>
            </>
          )}
          <div className="relative w-full">
            <input
              id="email"
              type="text"
              className={inputStyle}
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor={"email"} className={labelStyle}>
              Email
            </label>
          </div>

          <div className="relative w-full">
            <input
              id="password"
              type="password"
              className={inputStyle}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor={"password"} className={labelStyle}>
              Password
            </label>
          </div>

          <button
            onClick={() => {
              if (type === "login") {
                login({ email, password });
              } else {
                signup(
                  {
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                  },
                  {
                    onSuccess: () => {
                      login({ email, password });
                    },
                  },
                );
              }
            }}
            className="bg-purple-600 py-3 font-semibold text-white "
          >
            {type === "login" ? "Log in" : "Sign up"}
          </button>
        </div>
        <p className="mt-10 text-center">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          {type === "login" ? (
            <Link
              to="/signup"
              className="font-bold text-purple-600 underline underline-offset-4"
            >
              Sign up
            </Link>
          ) : (
            <Link
              to="/login"
              className="font-bold text-purple-600 underline underline-offset-4"
            >
              Log in
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginSignUp;
