import React, { useState } from "react";
import { UUID as initialUUID } from "../common/constants";
import styled from "styled-components";

function Settings() {
  const [uuid, setUUID] = useState(initialUUID);
  const [WebSocketURL, setWebSocketURL] = useState("127.0.0.1");
  const [WebSocketPort, setWebSocketPort] = useState(1234);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState(""); //
  const messageTimeout = 3000;

  const handleUUIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUUID(event.target.value);
  };

  const handleWebSocketURLChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWebSocketURL(event.target.value);
  };

  const handleWebSocketPortChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWebSocketPort(parseInt(event.target.value));
  };

  const handleSubmit = () => {
    console.log("Form submitted!");
    console.log(
      "UUID:",
      uuid,
      "WebSocket URL:",
      WebSocketURL,
      "WebSocket Port:",
      WebSocketPort
    );
    SendData(WebSocketURL, WebSocketPort);
  };

  function SendData(WebSocketURL: string, WebSocketPort: number) {
    const data = {
      WebSocketURL: WebSocketURL,
      WebSocketPort: WebSocketPort
    };

    fetch("/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Data sent!");
        setMessage("Data sent successfully!");
        setMessageColor("green");
        setTimeout(() => {
          setMessage("");
        }, messageTimeout);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error occurred: " + error.message);
        setMessageColor("red");
        setTimeout(() => {
          setMessage("");
        }, messageTimeout);
      });
  }

  return (
    <details>
      <summary>Settings</summary>
      <StyledSettings>
        <div>
          <label htmlFor="WebSocketURL">WebSocket:</label>
          <InputContainer>
            <Input
              type="text"
              id="WebSocketURL"
              value={WebSocketURL}
              onChange={handleWebSocketURLChange}
            />
          </InputContainer>
        </div>
        <div>
          <label htmlFor="WebSocketPort">WebSocket Port:</label>
          <InputContainer>
            <Input
              type="number"
              id="WebSocketPort"
              value={WebSocketPort}
              onChange={handleWebSocketPortChange}
            />
          </InputContainer>
        </div>
        <div>
          <label htmlFor="uuid">UUID:</label>
          <InputContainer>
            <Input
              type="text"
              id="uuid"
              value={uuid}
              onChange={handleUUIDChange}
            />
          </InputContainer>
        </div>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        <Message style={{ color: messageColor }}>{message}</Message>
      </StyledSettings>
    </details>
  );
}

const StyledSettings = styled.div`
  display: grid;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Input = styled.input`
  height: 1.2rem;
`;

const SubmitButton = styled.button`
  color: #fff;
  background-color: #30343f;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  width: 5rem;
  margin: auto;
`;
const Message = styled.p`
  margin-top: 10px;
  position: absolute;
  top: 2rem;
  right: 5rem;
`;

export default Settings;
