import React from 'react';
import { useRef, useEffect, useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
//import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const usernameRef = useRef();
    const pinRef = useRef();

    

    function handleRegister(e) {
        e.preventDefault();
        navigate("/Register");

    }

    async function handleLoginSubmit(e){
        e.preventDefault();

        const username = usernameRef.current.value;
        const pin = pinRef.current.value;

        if (!username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }
        const passwordRequirement = /^\d{7}$/;
        if (!passwordRequirement.test(pin)) {
            alert("Your pin is a 7-digit number!");
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
            user.username === username && user.pin === pin
          );

        if (match) {
                alert("Login was successful");
                sessionStorage.setItem("username", username);
                navigate("/Home");
        } else {
            alert("Incorrect username or pin!");
        }


    }


        return <>
        <h1>Login</h1>
        <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={pinRef}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
            <p>Don't Have an Account Yet?</p>
            <Button type="submit" onClick={handleRegister}>Register</Button>
        </Form>
        </>
}