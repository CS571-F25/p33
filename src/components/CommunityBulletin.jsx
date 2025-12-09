
import React, { useEffect, useState, useContext } from "react"
import { Row, Col, Container, Pagination, Form, Button} from "react-bootstrap"
import BulletinMessage from "./BulletinMessage";




export default function CommunityBulletin(props) {

    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const username = sessionStorage.getItem("username");

    // we will create our own Bucket API where users can upload annnoucements/posters like they might hang up in the window of a coffee shop. 
    // for now, we are displaying the posts from the Bascom Hill Hangout from hw6
    const loadMessages = () => {
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/communitymessages`, {
            method: "GET",
            headers: {
                "X-CS571-ID": 'bid_225debe6e094a2d9cdeb3968e3cf5ddffd39773b2318c77fd00c0a5e567f87b7'
            }
        }).then(res => res.json()).then(json => {
          const messages = Object.entries(json.results).map(([id, msg]) => ({
            id,
            ...msg
          }));
        
          setMessages(messages);
          console.log("Messages array:", messages);
        })
    };

    useEffect(loadMessages, [props]);

    function handlePost(e) {
        e.preventDefault();
    
        // Check if title/content are empty
        if (!title.trim() || !content.trim()) {
          alert("You must provide both a title and content!");
          return;
        }
    
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/communitymessages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CS571-ID": 'bid_225debe6e094a2d9cdeb3968e3cf5ddffd39773b2318c77fd00c0a5e567f87b7'
          },
          credentials: "include",
          body: JSON.stringify({
            "poster": username,
            title,
            content
          })
        })
          .then((res) => {
            if (res.status === 200) {
              alert("Successfully posted!");
              setTitle("");
              setContent("");
              loadMessages(); 
            } else {
              alert("Failed to post message");
            }
          })
      }

      function handleDelete(messageId) {
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/communitymessages?id=${messageId}`, {
          method: "DELETE",
          headers: { "X-CS571-ID": 'bid_225debe6e094a2d9cdeb3968e3cf5ddffd39773b2318c77fd00c0a5e567f87b7' },
        })
        .then(res => {
          if (res.status === 200) {
            alert("Message deleted!");
            loadMessages(); // reload messages
          } else {
            alert("Failed to delete message");
          }
        })
    }
    

    return <>
        <h1>Community Bulletin Board! </h1>
        {
          <div style={{ display: "flex", justifyContent: "center" }}>
                <Form onSubmit={handlePost} style={{ marginBottom: "2rem" }}>
                  <Form.Group>
                    <Form.Label htmlFor="titleInput">Title</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "300px" }}
                      id = "titleInput"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{marginTop:"10px"}} htmlFor="contentInput">Content</Form.Label>
                    <Form.Control
                      type = "text"
                      style={{ width: "300px" }}
                      id = "contentInput"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>
                  <Button onClick={handlePost} style={{
                    marginTop: "10px",
                     padding: "10px 20px",
                     background: "lightblue",
                     color: "black",
                     border: "1px solid gray",
                     borderRadius: "8px",
                     cursor: "pointer",
                     fontSize: "16px",
                     }} >Create Post</Button>
                </Form>
                </div>
        }
        <hr/>
        {
            messages.length > 0 ?
                <> {
        
                        <div>
                            <Container>
                            <Row>
                                  {
                                        messages.map((message, i) => (
                                            <Col xs={12} md={6} lg={4} key={message.id}>
                                        <BulletinMessage {...message}></BulletinMessage>
                                        {username === message.poster && (
                                            <Button
                                            variant="danger"
                                            onClick={() => handleDelete(message.id)}
                                            style={{
                                              padding: "5px 10px",
                                              borderRadius: "6px",
                                              border: "1px solid gray",
                                              background: "pink",
                                              color: "black",
                                              cursor: "pointer",
                                            }}
                                            >Delete Post</Button>
                                            )}
                                        </Col>
                                       ))
                                    }
                            </Row>
                            </Container>
                            </div>
                    }
                
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>

                
        }
</>
}
