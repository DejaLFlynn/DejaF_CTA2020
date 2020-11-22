import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { apiURL } from "../Utils/apiURL";
import { signUp } from "../Utils/Firebase";
import { AContext } from "../Providers/Context";
import { storage } from "../Firebase";

//component signs up user using name, email, password and picture
//sends data to firebase
//qurans@gmail.com
//password

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useContext(AContext);
  const [url, setUrl] = useState("");
  // const { currentUsers, token, loading } = useContext(AContext);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const API = apiURL();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await signUp(email, password);
      debugger;
      let res2 = await axios({
        method: "post",
        url: `${API}/users/${res2.user.uid}`,
        data: { id: res.user.uid, email, name, image },

        headers: {
          AuthToken: token,
        },
      });
      debugger;
      console.log(res2.data);
      history.push("/posts");
    } catch (error) {
      setError(error.message);

      console.log(error);
    }
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed", () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        });
    });
  };

  // console.log("image: ", uploadPic);

  return (
    <>
      <div>
        {/* {error ? <div>{error}</div> : null} */}
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            type="text"
            placeholder="name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="text"
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            autoComplete="on"
            type="password"
            placeholder="password"
          />
          <input type="file" onChange={handleChange} />
          <button onClick={handleUpload}>Upload Image</button>
          <br />
          {/* <Dropzone handleImageChange={handleImageChange} dropzoneText={"Drop or Select Your Profile Image"}/> */}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
