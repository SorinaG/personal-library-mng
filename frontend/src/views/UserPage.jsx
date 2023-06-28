import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getMe } from "../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/index";

function UserPage() {
  const token = useSelector((store) => store.auth.token);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const userResponse = await getMe(token);
    if (!userResponse.errors) setUser(userResponse);
  }

  const handleOldPassword = (event) => {
    const oldPassword = event.target.value;
    setUserPassword((prevState) => {
      return {
        ...prevState,
        oldPassword: oldPassword,
      };
    });
  };

  const handleConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    setUserPassword((prevState) => {
      return {
        ...prevState,
        confirmPassword: confirmPassword,
      };
    });
  };

  const handleNewPassword = (event) => {
    const newPassword = event.target.value;
    setUserPassword((prevState) => {
      return {
        ...prevState,
        newPassword: newPassword,
      };
    });
  };

  async function changeUserPassword() {
    try {
      const oldPassword = userPassword.oldPassword;
      const newPassword = userPassword.newPassword;
      const confirmPassword = userPassword.confirmPassword;

      if (newPassword === confirmPassword) {
        const passwordChangeResponse = await changePassword(
          token,
          oldPassword,
          newPassword
        );
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log("Failed to change password");
    }
  }

  return (
    <Layout>
      <div>
        <div className="card text-center mt-3 mx-3">
          <div className="card-header">My info</div>
          <div className="card-body row">
            <h5 className="card-title capitalize">{user.username}</h5>
            <p className="card-text">{user.email}</p>
            <p>Change password</p>
            <div className="mb-3 col-12 col-md-4">
              <label className="form-label">Old password</label>
              <input
                type="text"
                className="form-control"
                value={userPassword.oldPassword}
                onChange={handleOldPassword}
              />
            </div>
            <div className="mb-3 col-12 col-md-4">
              <label className="form-label">New password</label>
              <input
                type="text"
                className="form-control"
                value={userPassword.newPassword}
                onChange={handleNewPassword}
              />
            </div>
            <div className="mb-3 col-12 col-md-4">
              <label className="form-label">Confirm new password</label>
              <input
                type="text"
                className="form-control"
                value={userPassword.confirmPassword}
                onChange={handleConfirmPassword}
              />
            </div>
            <div className="mb-3">
              <button
                className="btn btn-primary"
                type="button"
                onClick={changeUserPassword}
              >
                Save
              </button>
            </div>
          </div>
          <div className="card-footer text-body-secondary">
            Joined from {user.createdAt ? user.createdAt.split('T')[0] : ""}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
