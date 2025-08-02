
# Project Management Dashboard

A modern task/project management dashboard built with **React**, **TypeScript**, and **Tailwind CSS**, designed to assist freelancers and agencies in organizing client projects. Includes smart filtering, priority tagging, smooth UI animations, and an AI-assisted context system (MCP).

To build this project, we used a protocol called **MCP Server (Model Context Protocol)** — think of it as a living **manual** or **design library** for the AI. It acts as a contextual brain: every time you mention `@modal`, `@button`, or `@card`, the assistant knows *exactly* what UI component you're referring to and how to implement it.  
Feels like magic? It's not — it's **contextual intelligence**.

---

## MVP Features

- [x] Add / update / delete tasks  
- [x] Filter by priority and status  
- [x] Paginated task list  
- [x] Animated modal for task creation  
- [x] Component system using `shadcn/ui` + `Lucide` icons  
- [x] Clean and responsive UI (Framer Motion + Tailwind V.4)

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React + TypeScript + Vite         |
| UI        | Tailwind CSS + shadcn/ui + Lucide |
| Animation | Framer Motion                     |
| Backend   | Node.js (to be implemented)       |
| AI Layer  | Model Context Protocol (MCP)      |

---

## What is MCP?

An MCP Server is a central component within the Model Context Protocol (MCP) ecosystem. It acts as an intermediary that facilitates communication between AI models and various data sources and external tools. Essentially, the MCP Server manages access to these sources, allowing AI models to receive contextual information relevant to their tasks and make more informed decisions like:

- Create layout from MCP UX/UI like shadcn-ui-server (I used this)
- More context about the project
- Each MCP is unique, regardless of the project context, they will all have their own tools to assist Artificial Intelligence

It’s not just autocomplete. It’s co-pilot design through shared understanding.

---

## Authentication (Coming Soon)

Authentication will be handled via:

- **MySQL** for user registration and login
- **JWT** for session handling and secure access

Routes:
- `POST /api/register-user` — Register new user  
- `POST /api/login-user` — User login  
- `DELETE /api/logout-account` — Delete user account
- `GET /api/home/` — A protected route with JWT Auth
---

## Project/Task Management (MongoDB)

Task data is stored in a **MongoDB** collection:

Routes:
- `POST /api/register-task` — Create new task  
- `PUT /api/update-task` — Edit existing task  
- `DELETE /api/delete-task/:id` — Delete task by ID

---

### Image Preview

<img width="1919" height="910" alt="Captura de tela 2025-08-01 232415" src="https://github.com/user-attachments/assets/1c0e734c-49ec-4f43-8c58-6399131c7518" />
