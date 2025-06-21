# Construction-Site

## Backend API Documentation

## Overview

This backend system powers a point-based project management platform. It allows administrators to manage projects, assign users, track updates, and award points for contributions. The system is designed to be backend-agnostic and database-agnostic, supporting both SQL and NoSQL databases.

---

## Core Concepts

### User Roles

* **Admin**: Full access. Can create/approve projects, assign members and leaders, and approve updates.
* **Leader**: Can approve updates submitted by team members within their assigned projects.
* **Member**: Can contribute to projects by submitting updates.

### Point System

* **Members** receive 100 points when a project they are part of is approved.
* **Leaders** receive 200 points for each approved project they lead.
* **Updates** increase project progress but do not directly award points.

---

## Database Models (Abstracted Schema)

### Users

| Field    | Type       | Description                   |
| -------- | ---------- | ----------------------------- |
| id       | Int/String | Unique user identifier        |
| username | String     | Unique username               |
| email    | String     | Email address                 |
| password | String     | Securely hashed password      |
| isAdmin  | Boolean    | Indicates if user is an admin |
| score    | Integer    | Total points accumulated      |

---

### Projects

| Field           | Type       | Description                              |
| --------------- | ---------- | ---------------------------------------- |
| id              | Int/String | Unique project identifier                |
| projectname     | String     | Unique project name                      |
| projectProgress | Integer    | Project completion percentage (0–100)    |
| approved        | Boolean    | Approval status                          |
| description     | String     | Project description                      |
| tags            | Array      | Project tags (e.g., \["frontend", "AI"]) |

---

### Project Members (Dynamic Table or Collection per Project)

| Field    | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| id       | Integer | Record ID                    |
| username | String  | Username of project member   |
| isLeader | Boolean | Whether the user is a leader |
| role     | String  | Role within the project      |

---

### Project Updates (Dynamic Table or Collection per Project)

| Field        | Type    | Description                      |
| ------------ | ------- | -------------------------------- |
| id           | Integer | Unique identifier for the update |
| username     | String  | Author of the update             |
| update\_desc | String  | Description of the update        |
| approved     | Boolean | Whether the update is approved   |
| percentage   | Integer | Progress percentage contributed  |

---

## API Endpoints

### Authentication

#### POST /login

Authenticates a user and issues a session or token.

#### POST /logout

Clears the session or invalidates the token.

#### POST /add\_user

Registers a new user. Intended for development use or restricted access only.

---

### Project Management

#### POST /createProject

* Admin-only
* Creates a new project along with its associated member and update tables.
* Accepts: `projectname`, `description`, `tags`, `projectProgress`

#### POST /addMemberPro

* Admin-only
* Adds a user to a project with leader/member role.

---

### Approvals

#### UPDATE /approveProject

* Admin-only
* Marks a project as approved.
* Awards 100 points to members and 200 points to leaders.

#### UPDATE /approveUpdate

* Admin or Leader
* Approves a project update and adds the specified percentage to project progress.

---

### Updates

#### POST /postUpdate

* Authenticated members or leaders
* Submits an update for a project with description and progress percentage.

---

### Data Retrieval

#### GET /getpro

Returns a list of projects relevant to the user:

* Admins receive all projects.
* Members receive only projects they are a part of.

#### GET /getupdates

Returns all updates for a given project.

* Admins and project leaders only.

#### GET /getappupdates

Returns only approved updates.

#### GET /getunappupdates

Returns only unapproved updates.

###  Additional routes

| Endpoint                       | Method | Auth Level | Purpose                        |
| ------------------------------ | ------ | ---------- | ------------------------------ |
| `/user/profile`                | GET    | User       | Get profile + projects + score |
| `/project/details`             | GET    | Auth       | Get full project details       |
| `/project/members`             | GET    | Auth       | Get all members in a project   |
| `/leaderboard`                 | GET    | Public     | Show user rankings by score    |
| `/badges`                      | GET    | Auth       | Get user badge list            |
| `/project/update-description`  | PUT    | Admin      | Modify project metadata        |
| `/project/member`              | DELETE | Admin/Lead | Remove member from project     |

---

## Architecture and Design Guidelines

### Modular Codebase

Recommended modular structure:

```
src/
  ├── auth/
  ├── project/
  ├── update/
  ├── admin/
  └── utils/
```

Each module should contain routes, services, and validation logic specific to the domain.

---

### Rate Limiting

All endpoints that accept user input (especially login, update submission) should have rate limiting enabled to mitigate brute force and abuse attacks.

Suggested limits:

* `/login`: 5 attempts per minute
* `/postUpdate`: 10 per hour per user

---

### Project Metadata Enhancements

* **Description**: Optional but recommended for user understanding.
* **Tags**: Used for filtering and categorization on the frontend.

---

### Leaderboard and Badge Support

To enhance engagement, a leaderboard and badge system can be implemented via the frontend using available point data.

Suggested leaderboard metrics:

* Top scorers of all time
* Top contributors per project

Suggested badges:

* “First Project Approved”
* “1000 Points Earned”
* “Top Contributor of the Month”

These can be calculated in the frontend from `/getpro` and user score data.

---

## Planned Enhancements

The following features are planned for future implementation:

### Point Logs

Track every point-earning event in a separate `point_logs` table or collection with:

* Username
* Action performed
* Points awarded/deducted
* Timestamp
* Reference ID

### Notification System

Notify users of:

* Project approval
* Update approval
* Score changes

Delivery via in-app, email, or WebSocket.

### GitHub Activity Integration

* Track user GitHub commit activity.
* Award bonus points for contributions linked to the project repository.

---

## Security Recommendations

* All passwords must be hashed using `bcrypt` or equivalent.
* Use JWT or OAuth2 for stateless session handling.
* Ensure CSRF protection for cookie-based auth.
* Validate all user inputs with schemas.
* Use role-based access control to protect admin endpoints.

---

## Compatibility

The system is compatible with:

* **Backend Frameworks**: Flask, Express, Django, Spring Boot, etc.
* **Databases**:

  * SQL: PostgreSQL, MySQL, SQLite
  * NoSQL: MongoDB, Firestore, etc.

Adaptation notes:

* For SQL, use dynamic table creation or proper schema design.
* For NoSQL, represent members and updates as subcollections or embedded documents.

---

## Final Notes

This system is designed with extensibility and portability in mind. It is recommended to use modern design principles such as service layers, middleware, and clean API contracts to make it easier to maintain and integrate into larger systems.

For full production use, ensure:

* Proper logging
* Error tracking
* Testing (unit + integration)
* CI/CD automation

---

Let me know if you'd like this exported as a `README.md`, `docs.md`, or to generate Swagger/OpenAPI YAML next.
