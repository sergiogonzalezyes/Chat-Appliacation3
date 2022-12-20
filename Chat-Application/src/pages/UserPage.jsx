import io from "socket.io-client";
import { useEffect, useState } from "react";
// import { useState } from "react";
// import { useRef } from "react";
// import { useEffect } from "react";
// import io from 'socket.io-client'
// import axios from "axios";
// import { Await } from "react-router-dom";
// const connection = 'http://localhost:5001'
// const socket = io.connect('http://localhost:5001')

const socket = io.connect("http://localhost:5001");



export const UserPage = () => {

  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
};