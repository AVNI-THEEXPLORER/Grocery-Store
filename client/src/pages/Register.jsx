import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  // Password strength checker
  useEffect(() => {
    if (data.password) {
      const strength = checkPasswordStrength(data.password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength("");
      setPasswordSuggestions([]);
    }
  }, [data.password]);

  const checkPasswordStrength = (password) => {
    const suggestions = [];
    let strength = 0;

    // Check length
    if (password.length < 6) {
      suggestions.push(<p className="text-md text-black0 font-light">At least 6 characters</p>);
    } else {
      strength += 1;
    }

    // Check for uppercase letters
    if (!/[A-Z]/.test(password)) {
      suggestions.push(<p className="text-md text-black font-light">At least one uppercase letter</p>);
    } else {
      strength += 1;
    }

    // Check for lowercase letters
    if (!/[a-z]/.test(password)) {
      suggestions.push(<p className="text-md text-black font-light">At least one lowercase letter</p>);
    } else {
      strength += 1;
    }

    // Check for numbers
    if (!/[0-9]/.test(password)) {
      suggestions.push(<p className="text-md text-black font-light">At least one number</p>);
    } else {
      strength += 1;
    }

    // Check for special characters
    if (!/[^A-Za-z0-9]/.test(password)) {
      suggestions.push(<p className="text-md text-black font-light">At least one special character</p>);
    } else {
      strength += 1;
    }

    setPasswordSuggestions(suggestions);

    if (password.length > 12) {
      return "exceeded";
    }

    if (strength <= 2) {
      return "weak";
    } else if (strength <= 4) {
      return "moderate";
    } else {
      return "strong";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "text-red-500 font-bold";
      case "moderate":
        return "text-yellow-600 font-bold";
      case "strong":
        return "text-green-500 font-bold";
      case "exceeded":
        return "text-red-500 font-bold";
      default:
        return "text-gray-500 font-bold";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case "weak":
        return "Weak";
      case "moderate":
        return "Moderate";
      case "strong":
        return "Strong";
      case "exceeded":
        return "Maximum 12 characters allowed!";
      default:
        return "";
    }
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (data.password.length > 12) {
      toast.error("Password cannot exceed 12 characters");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-bold text-2xl">
          Welcome to <span className="text-orange-400">Grocery</span>{" "}
          <span className="text-green-500">Store</span>
        </p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-normal">
              Name :
            </label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200 font-normal"
              name="name"
              value={data.name}
              onChange={(e) => {
                const regex = /^[a-zA-Z ]+$/;
                const errorElement = document.getElementById("name-error");

                if (regex.test(e.target.value) || e.target.value === "") {
                  handleChange(e);
                  errorElement.textContent = ""; // Clear error
                } else {
                  errorElement.textContent =
                    "⚠ Only letters and spaces are allowed!";
                  errorElement.style.color = "#FF0000"; // Bright red
                  errorElement.style.fontWeight = "bold"; // Bold text

                  // Hide the warning after 2 seconds
                  setTimeout(() => {
                    errorElement.textContent = "";
                  }, 3000);
                }
              }}
              placeholder="Enter your name"
            />
            <p id="name-error" className="mt-1 text-sm"></p>
          </div>
          <div className="grid gap-1">
            <label htmlFor="email" className="font-normal">
              Email :
            </label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200 font-normal"
              name="email"
              value={data.email}
              onChange={handleChange}
              onBlur={(e) => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const errorElement = document.getElementById("email-error");
                if (!emailRegex.test(e.target.value) && e.target.value !== "") {
                  errorElement.textContent = "⚠ Please enter a valid email address!";
                  errorElement.style.color = "#FF0000";
                  errorElement.style.fontWeight = "bold";
                } else {
                  errorElement.textContent = "";
                }
              }}
              placeholder="Enter your email"
            />
            <p id="email-error" className="mt-1 text-sm"></p>
          </div>
          <div className="grid gap-1">
            <label htmlFor="password" className="font-normal">
              Password :
            </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none font-normal"
                name="password"
                value={data.password}
                onChange={(e) => {
                  // Limit to 12 characters
                  if (e.target.value.length <= 12) {
                    handleChange(e);
                  }
                }}
                placeholder="Enter your password (6-12 characters)"
                maxLength={12}
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            {data.password && (
              <div className="mt-1">
                <p className={`text-sm ${getPasswordStrengthColor()}`}>
                  {getPasswordStrengthText()}
                </p>
                {passwordSuggestions.length > 0 && passwordStrength !== "strong" && passwordStrength !== "exceeded" && (
                  <div className="text-xs text-gray-500 mt-1">
                    <p className="font-semibold">Suggestions to make your password stronger:</p>
                    <ul className="list-disc pl-5">
                      {passwordSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword" className="font-normal">
              Confirm Password :
            </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full outline-none font-normal"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirm password"
              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            {data.confirmPassword && data.password !== data.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match!
              </p>
            )}
          </div>

          <button
            disabled={!valideValue}
            className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
              }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>

        <p className="font-extralight">
          Already have account ?{" "}
          <Link to={"/login"} className="font-semibold hover:text-green-500">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;