import React from 'react';
import { Button, Form } from "react-bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rpPassword, setRpPassword] = useState("");
    const navigate = useNavigate();


    function handleBack() {
        navigate("/");
    }

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
                sessionStorage.setItem("username", username);
                navigate("/Home");
            } else {
                alert("Something went wrong");
            }
        })
        
    }

    // TODO Create the register component.

    return  <>
    <h1>Register</h1>
    <div style={{ display: "flex", justifyContent: "center" }}>
    <Form onSubmit = {handleRegisterSubmit}>
    <Form.Label style={{ marginTop:"10px" }} htmlFor="usernameInput">Username</Form.Label>
    <Form.Control id="usernameInput"  style={{ width: "300px" }} value={username}
          onChange={(e) => setUsername(e.target.value)}></Form.Control>
    <Form.Label style={{ marginTop:"10px" }} htmlFor="passwordInput">Password</Form.Label>
    <Form.Control id="passwordInput" style={{ width: "300px" }} type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}></Form.Control>
    <Form.Label style={{ marginTop:"10px" }} htmlFor="repeatPasswordInput">Confirm Password</Form.Label>
    <Form.Control id="repeatPasswordInput" style={{ width: "300px" }} type="password" value={rpPassword}
          onChange={(e) => setRpPassword(e.target.value)}></Form.Control>
    <br/>
    <Button 
    style={{
        padding: "5px 10px",
        borderRadius: "6px",
        border: "1px solid gray",
        background: "pink",
        color: "black",
        cursor: "pointer",
      }}
      onClick={handleBack}>Back</Button>
    <Button 
    style={{
        padding: "10px 20px",
        background: "lightblue",
        color: "black",
        border: "1px solid gray",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
        marginLeft: "10px"
      }}
      onClick={handleRegisterSubmit} type="submit">Register</Button>
    </Form>
    </div>
    </>
}
