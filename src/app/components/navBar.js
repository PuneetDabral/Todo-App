"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import Image from "next/image"; 

import { onUserLogout } from "../../store/slices/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const userSession = useSelector((state) => state.auth);

  const [theme, setTheme] = useState("light");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-bs-theme", savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-bs-theme", newTheme);
  };

  const handleLogout = () => {
    console.log("Logging out...");
     dispatch(onUserLogout());
    router.push("/login");
  };

  if(!userSession?.token){return}

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Smart Task Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" href="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/home">Home</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light ms-3" onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </li>
          
            <li className="nav-item dropdown ms-3" ref={dropdownRef}>
              <Link
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Image
                  src="/avatar.jpg" // Use a real profile image
                  alt="Avatar"
                  width={35}
                  height={35}
                  className="rounded-circle"
                />
              </Link>
              <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown">
                <li><span className="dropdown-item-text">{userSession?.user}</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}