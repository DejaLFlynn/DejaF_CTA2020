import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useHistory} from 'react-router-dom'
import {login} from './../../Utils/Firebase'
import axios from 'axios'
import firebase from '../../Firebase'
import {useInput} from '../../Utils/Input'
import {apiURL} from '../../Utils/apiURL'
const API = apiURL()
const SignIn =()=> {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory()
	console.log(email, password)

	const handleSubmit = async (e) =>{
		e.preventDefault()
		try {
			await login(email, password)
			history.push(`${API}/posts`)
		} catch (error) {
			console.log(" incorrect path",error)
		}
	}
	return (
		<div className="SignIn">
			<form onSubmit={handleSubmit}>
			<input type ='text' className="email" value={email}placeholder="email"  onChange={(e) => setEmail(e.currentTarget.value)}></input>
			<input type='text' className="password" value={password}  placeholder="password"  onChange={(e) => setPassword(e.currentTarget.value)}></input>
			<input type="submit"></input>
				
			</form>
			<div>
			<Link to="/signup" className="button">New? Sign Up</Link>
			</div>
		</div>
	)


}

export default SignIn;