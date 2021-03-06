import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { login } from "./../../Utils/Firebase";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding:50,
    backgroundColor: "white",
  },
  media: {
    height: 240,
    padding: 200,
  },

  
});


const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  // console.log(email, password)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push(`/posts`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGuestSignIn = async () => {
    
  
    await login("guest109@gmail.com","1234abcd");
    history.push("/posts")
}
  return (
    <div className="SignIn">
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <img
              src="https://i.postimg.cc/44bfJzn7/Screen-Shot-2020-12-01-at-9-58-32-AM.png"
              width="250"
              height="80px"
            />
          </CardContent>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                autoComplete="on"
                defaultValue="Small"
                type="text"
                className="email"
                value={email}
                placeholder="email"
                variant="outlined"

                onChange={(e) => setEmail(e.currentTarget.value)}
              ></TextField>
              <TextField
                autoComplete="on"
                type="password"
                className="password"
                defaultValue="Small"
                value={password}
                placeholder="password"
                variant="outlined"

                onChange={(e) => setPassword(e.currentTarget.value)}
              ></TextField>
              <Button  type="submit"

                        // variant="contained"
                        color="inherit"
                        className={classes.button}>

              <input type="submit" value="Log In"></input>
              </Button>
            </form>
          </CardContent>
        </CardActionArea>
       
      </Card>
 
      <div>
      <Card className={classes.root}>
    <CardActionArea>

        <Link to="/signup" className="signUp">
          Don't have an account?
          <span className="span"> Sign up </span>
        </Link>
        <Button className="guest" onClick={handleGuestSignIn}>
              Guest
             
            </Button>
         

    </CardActionArea>
        </Card>
       
        <p>Get the App</p>
          <img
            className="appleStore"
            src="https://losserranosgolfclub.com/wp-content/uploads/Download-on-the-App-Store-button.png"
            alt="appleStore" width="100px"
          ></img>
          <img
            className="android"
            src="https://www.fcsok.org/wp-content/uploads/2020/04/get-it-on-google-play-badge.png"
            alt="googlePlay" width="120px"
          ></img>
      </div>
    </div>
  );
};

export default SignIn;
