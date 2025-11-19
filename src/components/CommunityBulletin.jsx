
import React, { useEffect, useState, useContext } from "react"
import { Row, Col, Container, Pagination, Form, Button} from "react-bootstrap"
import BulletinMessage from "./BulletinMessage";

export default function CommunityBulletin(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);

    // we will create our own Bucket API where users can upload annnoucements/posters like they might hang up in the window of a coffee shop. 
    // for now, we are displaying the posts from the Bascom Hill Hangout from hw6
    const loadMessages = () => {
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/hw6/messages?chatroom=Bascom Hill Hangout&page=${page}`, {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_225debe6e094a2d9cdeb3968e3cf5ddffd39773b2318c77fd00c0a5e567f87b7"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };


    // Why can't we just say []?
    useEffect(loadMessages, [props, page]);

    function handlePost(e) {
        e.preventDefault();
    
        // Check if title/content are empty
        if (!title.trim() || !content.trim()) {
          alert("You must provide both a title and content!");
          return;
        }
    
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/hw9/messages?chatroom=Bascom Hill Hangout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CS571-ID": "bid_225debe6e094a2d9cdeb3968e3cf5ddffd39773b2318c77fd00c0a5e567f87b7"
          },
          credentials: "include",
          body: JSON.stringify({
            chatroom: props.name,
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
        fetch(`https://cs571api.cs.wisc.edu/rest/f25/hw6/messages?id=${messageId}`, {
          method: "DELETE",
          headers: { "X-CS571-ID": CS571.getBadgerId() },
          credentials: "include"
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
            /* TODO: Allow an authenticated user to create a post. */
            loginStatus ? (
                <Form onSubmit={handlePost} style={{ marginBottom: "2rem" }}>
                  <Form.Group>
                    <Form.Label htmlFor="titleInput">Title</Form.Label>
                    <Form.Control
                      type="text"
                      id = "titleInput"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="contentInput">Content</Form.Label>
                    <Form.Control
                      type = "text"
                      id = "contentInput"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" style={{ marginTop: "0.5rem" }} >Create Post</Button>
                </Form>
              ) : (
                <p>You must be logged in to post!</p>
              )
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
                                            <Col xs={12} md={6} lg={4} key = {message.id}>
                                        <BulletinMessage {...message}></BulletinMessage>
                                        {loginStatus?.username === message.poster && (
                                            <Button
                                            variant="danger"
                                            onClick={() => handleDelete(message.id)}
                                            style={{ marginTop: "0.25rem", width: "100%" }}
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

<div>
    <Pagination>
    {[1, 2, 3, 4].map(pageNum => (
      <Pagination.Item
        key={pageNum}
        active={pageNum === page}
        onClick={() => setPage(pageNum)}
      >
        {pageNum}
      </Pagination.Item>
    ))}
    </Pagination>
</div>
</>
}
