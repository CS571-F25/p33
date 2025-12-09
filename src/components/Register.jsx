import React from 'react';
import { Button, Form } from "react-bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rpPassword, setRpPassword] = useState("");
    const navigate = useNavigate();



    async function handleRegisterSubmit(e) {
        e.preventDefault();


        if (!password || !username || !rpPassword) {
            alert("You must provide both a username and pin!");
            return;
        }

        const passwordRequirement = /^\d{7}$/;
        if (!passwordRequirement.test(password)) {
            alert("Your pin must be a 7-digit number!");
            return;
        }
        if (password !== rpPassword){
            alert("Your pins do not match!");
            return;
        }

        const res = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/usernames", {
            headers: {
                "X-CS571-ID": "bid_225debe6e094a2d9cdeb3968e3cf5ddffd39773b2318c77fd00c0a5e567f87b7",
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        const users = Object.values(data.results);
        console.log(users);
        const match = users.some(user =>
            user.username === username
          );

        if (match) {
            // setLoginStatus({ loggedIn: true, username  });
            alert("That username has already been taken!");
            return;
        }

        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/usernames", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_225debe6e094a2d9cdeb3968e3cf5ddffd39773b2318c77fd00c0a5e567f87b7",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, pin: password})
        })
        // status codes 200, 400, 409, 413
        .then(res => {
            if (res.status === 200) {
                alert(username + " successfully registered!");
                navigate("/Home");
            } else {
                alert("Something went wrong");
            }
        })
        
    }

    // TODO Create the register component.

    return  <>
    <h1>Register</h1>
    <Form onSubmit = {handleRegisterSubmit}>
    <Form.Label htmlFor="usernameInput">Username</Form.Label>
    <Form.Control id="usernameInput" value={username}
          onChange={(e) => setUsername(e.target.value)}></Form.Control>
    <Form.Label htmlFor="passwordInput">Password</Form.Label>
    <Form.Control id="passwordInput" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}></Form.Control>
    <Form.Label htmlFor="repeatPasswordInput">Repeat Password</Form.Label>
    <Form.Control id="repeatPasswordInput" type="password" value={rpPassword}
          onChange={(e) => setRpPassword(e.target.value)}></Form.Control>
    <br/>
    <Button type="submit">Register</Button>
    </Form>
    </>
}
