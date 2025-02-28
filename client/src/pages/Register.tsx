import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { ImageUploadOkResponse, RegisterOkResponse, UserRegisterFormType, UserType } from "../types/customTypes";
import UploadAvatar from "../components/UploadAvatar";

function Register() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [newUser, setNewUser] = useState<UserRegisterFormType | null>(null);

  const [user, setUser] = useState<UserType | null>(null) // this keeps the user logged in - remove once I have authContext

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];

    if (file instanceof File) {
      // if our document/image matches the File type the function will run
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file))
    }
  };

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(); // append everything here - username,email,password,image
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/uploadImage",
        requestOptions
      );
      const result = (await response.json()) as ImageUploadOkResponse;

      setNewUser({ ...newUser!, image: result.imageURL }); // we don't know what's already inside newUser (email etc.) so we use spread operator to add the image
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error :>> ", error);
    }
    finally {
      if (typeof imagePreview === "string") {
        URL.revokeObjectURL(imagePreview)
        setImagePreview(null)
      }
      
    }
  };

  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(newUser);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    // Input validation here - username,password,email
    if (newUser) {
      urlencoded.append("username", newUser.username);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
    } else {
      console.log("All the fields are required");
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/register",
        requestOptions
      );
      const result = await response.json() as RegisterOkResponse
      console.log(result.message);
      setUser(result.user)
      

    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      <h1>Register</h1>

      <div className="form-container">
        <form className="register-form">
          <TextField
            
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleRegisterInputChange}
          />
          <TextField
           
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleRegisterInputChange}
          />
          <TextField
            
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleRegisterInputChange}
          />

          <Button onClick={handleRegisterSubmit}>Register</Button>
        </form>
      </div>

      <UploadAvatar/>

      
    </>
  );
}

export default Register;
