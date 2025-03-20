import { useContext, useEffect } from "react";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router";

import { ChatsContext } from "../context/ChatsContext";

function Messages() {
  const { chats, getChats } = useContext(ChatsContext);

  useEffect(() => {
    getChats();
  }, []);

  return (
    <ListGroup>
      {chats && chats.length < 1 ? (
        <ListGroupItem>No chats found.</ListGroupItem>
      ) : (
        chats &&
        chats.map((chat) => (
          <NavLink key={chat._id} to={chat._id}>
            <ListGroupItem action>
              <div>
                <strong>Listing:</strong> {chat.listing.name}
              </div>
              <div>
                <strong>Last Message: </strong>
                {chat.messages[chat.messages.length - 1]?.text}
              </div>
            </ListGroupItem>
          </NavLink>
        ))
      )}
    </ListGroup>
  );
}

export default Messages;
