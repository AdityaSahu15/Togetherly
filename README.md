Togetherly 🌐

A Modern Social Media Application

Togetherly is a full-stack social media platform built to connect people in real-time. It allows users to share posts and stories, chat with friends, manage connections, and stay updated with notifications — all powered by an event-driven and scalable backend.


🚀 Features


🔐 Authentication (Clerk)

Secure login/signup with email, passwordless, and OAuth

Clerk’s prebuilt components for sign-in, sign-up, and profile management

Automatic sync of user data into MongoDB via Inngest

📝 Posts & Stories

Create, edit, delete posts

Like, comment, and share functionality

Story support with auto-deletion after 24 hours (via Inngest)

💬 Real-Time Chat (SSE)

One-to-one messaging with text and image support

Instant delivery using Server-Sent Events (SSE)

Messages stored in MongoDB

Seen/unseen tracking and inbox previews

🔔 Notifications

Real-time toast notifications for new messages, likes, and comments

Email reminders for pending connection requests

Daily unseen message summaries via Inngest cron jobs

🤝 Connections

Send and receive connection requests

Email notifications & reminders if requests remain unaccepted

⚙️ Background Jobs & Workflows (Inngest)

User Sync: auto-create/update/delete users in MongoDB when Clerk events fire

Connection Reminders: send reminder emails if requests are not accepted in 24h

Story Deletion: auto-remove stories after 24h

Unseen Message Digest: daily cron sending unseen message counts to users


🛠️ Tech Stack

Frontend

React.js + Vite

Tailwind CSS (styling)

Framer Motion (animations)

React Hot Toast (notifications)

Axios (API calls)

Clerk React SDK (authentication)


Backend


Node.js + Express.js (REST API)

MongoDB + Mongoose (database)

Clerk Backend SDK (session validation)

Inngest (background jobs & workflows)

SSE (Server-Sent Events) (real-time chat)

ImageKit (media uploads & optimization)

Nodemailer (email notifications)


DevOps & Tools

Vercel (frontend + backend hosting)

GitHub (version control)


⚙️ Installation

Clone Repository

git clone https://github.com/your-username/togetherly.git
cd togetherly

Install Dependencies

Frontend
cd client
npm install
npm run dev

Backend
cd server
npm install
npm run server

🔑 Environment Variables

Server (/server/.env)

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

# Clerk
CLERK_SECRET_KEY=your_clerk_secret_key

# Inngest
INNGEST_API_KEY=your_inngest_api_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public
IMAGEKIT_PRIVATE_KEY=your_imagekit_private
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint

# Nodemailer
SMTP_HOST=smtp.yourmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

Client (/client/.env)

VITE_API_URL=http://localhost:5000
VITE_CLERK_FRONTEND_API=your_clerk_frontend_api_key


👨‍💻 Author

Built with ❤️ by Aditya Sahu




