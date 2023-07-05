import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAccount } from "../../api";

function SignupPage() {
  const [signupFormValue, setSignupFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const username = event.target.value;

    setSignupFormValue((prevState) => {
      return {
        ...prevState,
        username: username,
      };
    });
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;

    setSignupFormValue((prevState) => {
      return {
        ...prevState,
        email: email,
      };
    });
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;

    setSignupFormValue((prevState) => {
      return {
        ...prevState,
        password: password,
      };
    });
  };

  async function createUserAccount() {
    try {
      const signupData = {
        username: signupFormValue.username,
        email: signupFormValue.email,
        password: signupFormValue.password,
      };

      const signupResponse = await createAccount(
        signupData.username,
        signupData.email,
        signupData.password
      );

      if (signupResponse) {
        navigate("/login");
      } else {
        console.log("Failed to create user")
      }
    } catch (err) {
      return err;
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      createUserAccount();
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6 card rounded-3 border border-3 border-primary">
            <div className="card-body">
              <h2 className="text-center mb-5">Sign up</h2>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={signupFormValue.username}
                  onChange={handleUsernameChange}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={signupFormValue.email}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={signupFormValue.password}
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={createUserAccount}
                >
                  Sign up
                </button>
              </div>

              <p>
                Already have an account?{" "}
                <a
                  className="link-primary cursor"
                  onClick={() => navigate("/login")}
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
