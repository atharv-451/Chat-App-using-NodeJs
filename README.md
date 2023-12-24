# Real Time Chat App

![Chat App Logo](client/assets/chat.png)

This is a Real Time Chat Application built using Node.js, Express, and Socket.io. The application allows users to join a chat room, send messages in real-time, and see the number of users online.

## Features

- Real-time messaging using Socket.io
- Dynamic updating of online users count
- Simple and responsive design
- Easy to deploy on Render (backend) and Netlify (frontend)

## How to Use

1. Clone the Respository:
   ```bash
   git clone https://github.com/your-username/real-time-chat-app.git
   cd real-time-chat-app
2. Install dependencies for the backend:
   ```bash
   cd nodeserver
   npm install
3. Start the server:
   ```bash
   cd nodeserver
   nodeman index.js
4. Start the frontend:
   ```bash
   cd frontend
   npm start
5. Open your browser and go to http://localhost:3000 to access the chat application.

## Deployment
- ### Nodeserver (Server):
   Deploy the backend on Render or any other Node.js hosting service. Make sure to configure environment variables if needed.
- ### Client:
  Deploy the frontend on Netlify or any other static site hosting service.

## Configuration
- Update the Socket.io connection URLs in client.js and index.html to match the deployed backend URL.
- Configure CORS in the server.js file to allow requests from the frontend domain.

## License
  This project is licensed under the ISC License.

## Author
 Atharv Kulkarni

 ---
 
Feel free to contribute and make improvements!
