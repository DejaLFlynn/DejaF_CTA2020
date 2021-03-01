import React, { useState, useEffect, useContext } from "react";
import { AContext } from "../../Providers/Context";
import { apiURL } from "../../Utils/apiURL";
import axios from "axios";
import Upload from "../Upload";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import UsersGallery from "./UsersGallery";
import UserPosts from "./UserPosts";
import SideBar from "../Comments/SideBar";
// component displays the info saved in the database for the current logged-in user
//grab context that contains the current user✅
//fire network request using axios to the backend using the current user id to retrieve the user information stored in database
//save the user information to the state
//render user information from the state
//user may upload new pics from component to the database
//display pictures thant belong to logged-in user uploaded by logged-in user
//make a new component for user gallery and call in return
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 750,
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  profile:{
    display: "flex",
    
  },

  avatar: {
    width: "200px",
    height: "200px",
    backgroundColor: red[500],
    position: "center",
  },
  userName:{
    

  }, 
  bio:{

  },

}));

const User = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const API = apiURL();
  const [profile, setProfile] = useState([]);
  const { currentUsers, token, loading } = useContext(AContext);
  const [newProfile, setNewProfile] = useState(null);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [userPic, setUserPic] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const fetchUserById = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `${API}/users/${currentUsers.id}`,
        headers: {
          AuthToken: token,
        },
      });
      // debugger
      setProfile(res.data.payload);
      setUserName(res.data.payload.name);
      setBio(res.data.payload.bio);
      setUserPic(res.data.payload.user_pic);
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   fetchUserById();
  // }, [token]);
  // const getUser = async()=>{
  //   try {
  //     let res = await axios.get(`${API}/users/:id`)
  //     debugger
  //     setNewProfile(res.data.payload)
  //     setUserName(res.data.payload.name);
  //     setBio(res.data.payload.bio);
  //     setUserPic(res.data.payload.user_pic);
  //   } catch (error) {
  //     console.log(err)
  //   }

  // }
  // useEffect(()=>{
  //   getUser()
  // })

  useEffect(() => {
    fetchUserById();
  }, [profile, token]);

  return (
    <div className={classes.root}>
      <NavBar />
      <CssBaseline />
<div className={classes.profile}>

      <Avatar className={classes.avatar} src={userPic}></Avatar>
      <Typography className={classes.userName}>
        <h2> {userName}</h2>
      </Typography>
      <Typography className={classes.bio}>
        <p> {bio}</p>
      </Typography>

</div>
      <UsersGallery />

      {/* <Upload /> */}
      <SideBar className={classes.sidebar} />
    </div>
  );
};

export default User;
