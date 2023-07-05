import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/index";
import { setUser, setToken } from "../../state/authSlice";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [loginFormValue, setLoginFormValue] = useState({
    email: "",
    password: "",
  });

  const [failedToLogin, setFailedToLogin] = useState(false)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const email = event.target.value;

    setLoginFormValue((prevState) => {
      return {
        ...prevState,
        email: email,
      };
    });
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;

    setLoginFormValue((prevState) => {
      return {
        ...prevState,
        password: password,
      };
    });
  };

  async function tryLogin() {
    try {
      const email = loginFormValue.email;
      const password = loginFormValue.password;

      const loginResponse = await login(email, password);

      const token = loginResponse.token;

      if (token) {
        navigate("/books");
      } else {
        let error = true;
        if(loginResponse.errors) {
          error = loginResponse.errors?.details?.body[0].message ?? true
        } else if(loginResponse.error) {
          error = loginResponse.error
        }
        setFailedToLogin(error)
        console.log("Failed to login");
      }

      dispatch(setUser(loginResponse.user));
      dispatch(setToken(token));
    } catch (err) {
      console.error(err);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      tryLogin();
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6 card rounded-3 border border-3 border-primary">
            <div className="card-body">
              <h2 className="text-center mb-5">Login</h2>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={loginFormValue.email}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                  />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={loginFormValue.password}
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyDown}
                  />
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={tryLogin}
                  >
                  Login
                </button>
              </div>

              {
                failedToLogin ? (
                  <div className="mb-3">
                    <label className="form-label text-danger">{failedToLogin !== true ? failedToLogin : "Failed to login. Try again"}</label>
                  </div>
                ) : null
              }
              <p>
                Don't have an account?{" "}
                <a
                  className="link-primary cursor"
                  onClick={() => navigate("/signup")}
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
