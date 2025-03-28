import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/LoginRegister.css";

function Register() {
  const { register } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [type, setType] = useState("password");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  //REVIEW same comment as before. And given than look the same functions, just reuse them
  const validateUsername = (username: string) => {
    return username.length >= 4;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression used to validate emails
    return emailRegex.test(email); // test method checks if the email string matches the pattern
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleUsernameInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsername(e.target.value);
    setErrors({
      ...errors,
      username: validateUsername(e.target.value)
        ? ""
        : "Username must be at least 4 characters",
    });
  };

  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
    setErrors({
      ...errors,

      email: validateEmail(e.target.value) ? "" : "Invalid email format",
    });
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
    setErrors({
      ...errors,

      password: validatePassword(e.target.value)
        ? ""
        : "Password must be at least 6 characters",
    });
  };

  // const handleToggle = () => {
  //   setType(type === "password" ? "text" : "password");
  // };

  const handleSubmitRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password)) {
      setErrors({
        username: validateUsername(username)
          ? ""
          : "Username must be at least 4 characters",
        email: validateEmail(email) ? "" : "Invalid email format",
        password: validatePassword(password)
          ? ""
          : "Password must be at least 6 characters",
      });
      return;
    }

    if (username && email && password) {
      register(username, email, password);
    }
  };

  // const myStyle = {
  //   width: "250px",
  //   height: "40px",
  // };

  return (
    <>
      <h1>Register</h1>

      <div className="form-container">
        <form className="register-form">
          <Form.Group controlId="username">
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={handleUsernameInputChange}
              className={
                errors.username && errors.username.length > 0
                  ? "errorInput"
                  : ""
              }
            />
            {errors.username && errors.username.length > 0 ? (
              <p className="error">{errors.username}</p>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              onChange={handleEmailInputChange}
              className={
                errors.email && errors.email.length > 0 ? "errorInput" : ""
              }
            />
            {errors.email && errors.email.length > 0 ? (
              <p className="error">{errors.email}</p>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              type={"password"}
              placeholder="Enter password"
              name="password"
              onChange={handlePasswordInputChange}
              className={
                errors.password && errors.password.length > 0
                  ? "errorInput"
                  : ""
              }
            />
            {/* <div>
              {type === "password" ? (
                <Button onClick={handleToggle}>Show</Button>
              ) : (
                <Button onClick={handleToggle}>Hide</Button>
              )}
            </div> */}
          </Form.Group>

          <div className="login-button">
            {!errors.email && !errors.username && !errors.password ? (
              <Button onClick={handleSubmitRegister}>Register</Button>
            ) : (
              <Button disabled>Register</Button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
