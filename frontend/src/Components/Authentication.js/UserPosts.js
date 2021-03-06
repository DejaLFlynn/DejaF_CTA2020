import React, { useState,  useContext } from "react";
import { AContext } from "../../Providers/Context";
import { apiURL } from "../../Utils/apiURL";
import axios from "axios";
import { getFirebaseIdToken } from "../../Utils/Firebase";
import { storage } from "../../Firebase";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserPosts = () => {
  const classes = useStyles();
  const { currentUser, token } = useContext(AContext);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [time, setTime] = useState("");
  const API = apiURL();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await getFirebaseIdToken(true);
      // debugger
      let res2 = await axios({
        method: "post",
        url: `${API}/posts`,
        data: {
          id: res.user.uid,
          content: content,
          posts_images: url,
          post_time: time,
        },

        headers: {
          AuthToken: token,
        },
      });
      debugger;
      console.log(res2.data.payload);
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
  const handleUpload = (e) => {
    e.stopPropagation();
    console.log('handleUpload')
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        console.log("image")
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url)
          });
          
      }
    );
  };
  return (
    <>
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="name"
                    value={content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                    required
                    fullWidth
                    id="content"
                    label="content"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <input type="file" onChange={handleChange} />
                  <br />
                </Grid>
              </Grid>
              <button type ="button" onClick={handleUpload}>Upload Image</button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                label="Add Post"
                className={classes.submit}
              >
                Add Post
              </Button>
              <Grid container justify="flex-end">
                <Grid item></Grid>
              </Grid>
            </form>
           
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserPosts;
