import React from "react";
import Navbar from "./Navbar";
import backgroundImage from "../assets/bookImage.jpg";

export default function Layout({ children }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflowY: "auto",
        backgroundColor: "rgba(150, 45, 0, 0.2)",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10
        }}
      >
        <Navbar />
      </div>
      <div
        style={{
          paddingTop: "3rem", // Add padding to the top to give space for the fixed Navbar
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "cover",
            backgroundAttachment: "fixed",
            filter: "blur(2px) brightness(50%)",
            opacity: 0.6,
            zIndex: -1,
          }}
        />
        <div className="mt-5 mt-sm-1">{children}</div>
      </div>
    </div>
  );
}
