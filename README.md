# Twatter

Twatter is a social media platform inspired by Twitter and similar services. It provides core features such as creating posts, commenting, friend requests, and more. **Future iterations plan to introduce real-time chat, an administration panel, and improved security with a microservice architecture**.

---

## Tech Stack

| **API**                                                            | **Frontend**                  | **Mobile**           |
|-------------------------------------------------------------------|------------------------------|----------------------|
| [NestJS](https://nestjs.com/)                                      | [React](https://reactjs.org/) | [Flutter](https://flutter.dev/) |
| [GraphQL](https://graphql.org/)                                    | [Material-UI (MUI)](https://mui.com/) |                      |
| [Codegen](https://graphql-code-generator.com/) (for code generation) | [Zustand](https://github.com/pmndrs/zustand) |                      |
| [Redis](https://redis.io/)                                         | [React Query](https://react-query-v3.tanstack.com/) |                      |
| [Nodemailer](https://www.nodemailer.com/)                              |                              |                      |

---

## Current Features

- **Create posts and comments**
- **Send/Remove friend requests**  
  Users can manage connections.
- **React to posts/comments**  
  Like or otherwise react to content.
- **Automated emails**  
  Users receive an email upon receiving a friend request.
- **Markdown editor**  
  Provides an easy way to write and format posts or comments.

---

## Planned Features

- **Complete rewrite**  
  Security improvements and a microservice-based structure.
- **File uploads**  
  Support for images or other attachments.
- **Real-time chat**  
  Live messaging between users.
- **Administration page**  
  Tools for moderators or site admins.
- **Mobile version**  
  A fully native Flutter app.
- **Additional notifications and email templates**  
  Enhancements for user engagement.

---

## Screenshots

![Twatter Example](/images/img_01.PNG)
![Twatter Example](/images/img_02.PNG)
![Twatter Example](/images/img_03.PNG)
![Twatter Example](/images/img_04.PNG)
![Twatter Example](/images/img_05.PNG)
![Twatter Example](/images/img_06.PNG)
![Twatter Example](/images/img_07.PNG)
![Twatter Example](/images/img_08.PNG)

---

## Project Structure

- **API**  
  Contains the backend (NestJS + GraphQL).

- **Frontend**  
  Contains the main user interface (React + MUI).

- **Shared**  
  Houses shared code, including models and GraphQL code generated via Codegen.

---

## Used docker images

- **Mailhog**  
  Used for capturing and testing emails during development.

- **Redis**  
  In-memory data store for caching, sessions, and more.

- **Postgres**  
  Primary database for Twatter.

---

## Setup

1. **Run Docker Compose**  
```bash
   docker-compose up
```
2. **Run database seeder**
```bash
   npm run seed-database
```
3. Check database for user, because I forgot to add global user, and login with password:
```bash
   yxcvbnm123
```
4. Run backend and frontend
