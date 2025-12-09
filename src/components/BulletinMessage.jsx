import React from "react"
import { Card } from "react-bootstrap";

function BulletinMessage(props) {

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <i>{props.poster}</i>
        <p>{props.content}</p>
    </Card>
}

export default BulletinMessage;