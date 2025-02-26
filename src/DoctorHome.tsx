import React, { useState } from "react";
import {AppBar,Toolbar,Typography,Container,Box,Avatar,Grid,Paper,Button,} from "@mui/material";

// Type for a chat message
interface ChatMessage {
  id: number;
  sender: string;
  message: string;
}

const DoctorHome: React.FC = () => {
  // useState to store array of chat messages
  const [chatLogs, setChatLogs] = useState <ChatMessage[]> ([]);

  // Example function to add a new chat message to the log
  const addChatMessage = () => {
    const newMessage: ChatMessage = {
      id: chatLogs.length + 1,
      sender: "Doctor",
      message: "This is a new chat message.",
    };
    setChatLogs([...chatLogs, newMessage]);
  };

  return (
    <Box sx = {{ flexGrow: 1 }}>
      {/* Header with the doctor's picture in the top left */}
      <AppBar position = "static" color = "transparent" elevation = {0}>
        <Toolbar>
          <Avatar
            alt="Doctor Profile"
            src="/doctor-profile.png" // Ensure this file is in your public folder.
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Typography variant = "h6" component = "div">
            Dr. John Doe
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main */}
      <Container sx = {{ mt: 4 }}>
        <Grid container spacing = {2}>
          {/* Welcome */}
          <Grid item xs = {12}>
            <Paper elevation = {3} sx = {{ p: 2 }}>
              <Typography variant = "h4" gutterBottom>
                Welcome, Doctor
              </Typography>
              <Typography variant = "body1">
                This is your dashboard for direct messaging and patient management.
              </Typography>
            </Paper>
          </Grid>

          {/* Appointments */}
          <Grid item xs = {12} sm = {6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant = "h6" > Appointments </Typography>
              <Typography variant = "body2">
                You have 3 upcoming appointments.
              </Typography>
            </Paper>
          </Grid>

          {/* Messages */}
          <Grid item xs = {12} sm = {6}>
            <Paper elevation = {3} sx = {{ p: 2 }}>
              <Typography variant = "h6" > Messages </Typography>
              <Typography variant = "body2">
                You have 5 unread messages.
              </Typography>
            </Paper>
          </Grid>

          {/* Chats Section with a next tto it */}
          <Grid item xs = {12}>
            <Grid container spacing = {2} alignItems = "center">
              {/* Container that says "Chats" */}
              <Grid item xs>
                <Paper elevation = {3} sx = {{ p: 2 }}>
                  <Typography variant = "h6" > Chats </Typography>
                  <Typography variant = "body2">
                    View all your ongoing chat sessions.
                  </Typography>
                </Paper>
              </Grid>
              {/* Button next to the container */}
              <Grid item>
                <Button variant = "contained" color = "primary">
                  Chats
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Chat Logs with useState */}
          <Grid item xs = {12}>
            <Paper elevation = {3} sx = {{ p: 2 }}>
              <Typography variant = "h6" gutterBottom>
                Chat Logs
              </Typography>
              <Button
                variant = "outlined"
                onClick = {addChatMessage}
                sx = {{ mb: 2 }}
              >
                Add Chat Message
              </Button>
              {chatLogs.map((chat) => (
                <Paper key = {chat.id} sx = {{ p: 1, mt: 1 }} variant = "outlined">
                  <Typography variant = "subtitle2" > {chat.sender} </Typography>
                  <Typography variant = "body2" > {chat.message} </Typography>
                </Paper>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DoctorHome;
