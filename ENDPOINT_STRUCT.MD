# Backend API Documentation

---

## Core Concepts

### Roles

* **Admin**: Full privileges to manage users, projects, approvals.
* **Leader**: Project-level role with update approval rights.
* **Member**: Contributes to projects via updates.

### Points System

* 200 points to project leaders on approval.
* 100 points to members on project approval.
* Update approvals affect project progress but not individual points (for now).

---

## Database Abstractions

### UserCreds

| Field    | Type           | Description              |
| -------- | -------------- | ------------------------ |
| id       | Integer/String | Unique identifier        |
| username | String         | Unique username          |
| email    | String         | Unique email             |
| password | String         | Securely hashed password |
| isAdmin  | Boolean        | Admin flag               |
| score    | Integer        | Accumulated points       |

### ProjectsTable

| Field           | Type           | Description                  |
| --------------- | -------------- | ---------------------------- |
| id              | Integer/String | Unique identifier            |
| projectname     | String         | Unique name                  |
| description     | String         | Project description          |
| tags            | Array          | Project tags                 |
| projectProgress | Integer        | Percentage completed (0-100) |
| approved        | Boolean        | Approval status              |

### Project Members (Dynamic Table)

| Field    | Type    | Description                   |
| -------- | ------- | ----------------------------- |
| id       | Integer | Row ID                        |
| username | String  | Project member username       |
| isLeader | Boolean | Is this user a project leader |
| role     | String  | Member role in project        |

### Project Updates (Dynamic Table)

| Field        | Type    | Description                           |
| ------------ | ------- | ------------------------------------- |
| id           | Integer | Update ID                             |
| username     | String  | Contributor                           |
| update\_desc | String  | Description of update                 |
| approved     | Boolean | Admin or Leader approved              |
| percentage   | Integer | Contribution towards progress (0-100) |

---

## API Endpoints

### Authentication

#### POST /login

| Request Body | Type   |
| ------------ | ------ |
| username     | String |
| password     | String |

| Response Body | Type   |
| ------------- | ------ |
| message       | String |
| username      | String |

#### POST /logout

Clears user session or JWT cookie.

#### POST /add\_user *(development only)*

| Request Body | Type    |
| ------------ | ------- |
| username     | String  |
| email        | String  |
| password     | String  |
| isAdmin      | Boolean |
| score        | Integer |

---

### Projects

#### POST /createProject

| Request Body        | Type    |
| ------------------- | ------- |
| project\_data\_name | String  |
| description         | String  |
| tags                | Array   |
| projectProgress     | Integer |

| Response Body | Type   |
| ------------- | ------ |
| msg           | String |

#### GET /getpro

| Response Body | Type          |
| ------------- | ------------- |
| projects      | List\[String] |

#### GET /project/details

| Request Query       | Type   |
| ------------------- | ------ |
| project\_data\_name | String |

| Response Body | Type          |
| ------------- | ------------- |
| projectname   | String        |
| description   | String        |
| progress      | Integer       |
| approved      | Boolean       |
| members       | List\[Object] |
| tags          | List\[String] |

#### GET /project/members

| Request Query       | Type   |
| ------------------- | ------ |
| project\_data\_name | String |

| Response Body | Type          |
| ------------- | ------------- |
| members       | List\[Object] |

#### PUT /project/update-description

| Request Body        | Type   |
| ------------------- | ------ |
| project\_data\_name | String |
| description         | String |
| tags                | Array  |

---

### Members

#### POST /addMemberPro

| Request Body        | Type    |
| ------------------- | ------- |
| project\_data\_name | String  |
| username            | String  |
| isLeader            | Boolean |
| role                | String  |

---

### Updates

#### POST /postUpdate

| Request Body        | Type    |
| ------------------- | ------- |
| project\_data\_name | String  |
| update              | String  |
| percentage          | Integer |

#### UPDATE /approveUpdate

| Request Body        | Type    |
| ------------------- | ------- |
| project\_data\_name | String  |
| id                  | Integer |

---

### Approval

#### UPDATE /approveProject

| Request Body        | Type   |
| ------------------- | ------ |
| project\_data\_name | String |

---

### Updates View

#### GET /getupdates

| Request Body        | Type   |
| ------------------- | ------ |
| project\_data\_name | String |

#### GET /getappupdates

| Request Body        | Type   |
| ------------------- | ------ |
| project\_data\_name | String |

#### GET /getunappupdates

| Request Body        | Type   |
| ------------------- | ------ |
| project\_data\_name | String |

---

### Leaderboard & Badges

#### GET /leaderboard

| Query Params | Type              |
| ------------ | ----------------- |
| project      | String (optional) |

| Response    | Type          |
| ----------- | ------------- |
| leaderboard | List\[Object] |

#### GET /badges

| Query Params | Type              |
| ------------ | ----------------- |
| username     | String (optional) |

| Response | Type          |
| -------- | ------------- |
| badges   | List\[String] |

---

## System Design Considerations

* Rate limiting must be enforced on login and update endpoints.
* Passwords should be stored using strong hashing algorithms (e.g., bcrypt).
* Modular architecture is preferred, separating routes and services by domain.
* Tags and descriptions enhance project categorization and user experience.
* Leaderboards and badges can be derived at the frontend level using score data.

---

## Future Enhancements

* **Point Transaction Logging**
* **Notification System**
* **GitHub Commit Activity Integration**
