import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import { useHistory} from 'react-router-dom'
import {login} from './../../Utils/Firebase'
import firebase from '../../Firebase'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', 
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});

const SignIn =(props)=> {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory()

	const handleSubmit = async (e) =>{
		e.preventDefault()
		try {
			await login(users_name.value, email.value)
			history.push('/users')
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
       			</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">User's Name</InputLabel>
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input name="email" type="email" id="email" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={login}
						className={classes.submit}>
						Sign in
          			</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/register"
						className={classes.submit}>
						Register
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function login() {
		try {
			await firebase.login(email, password)
			props.history.replace('/dashboard')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(withStyles(styles)(SignIn))