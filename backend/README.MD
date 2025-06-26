## Backend DEMO

### First make a demo user using the add user command from below and test login

### TEST CREATE PROJECT

```
curl -X POST -H "Content-Type: application/json" \
-b cookie.txt \
-d '{"project_data_name": "team_project2"}' \
http://127.0.0.1:5000/dashboard/createProject
```

### TEST LOGOUT

```
curl -X POST -b cookie.txt \
http://127.0.0.1:5000/auth/logout
```

### TEST LOGIN

```
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "test", "password": "mypassword123"}' \
-c cookie.txt \
http://127.0.0.1:5000/auth/login
```

### TEST GET PROJECTS

```
curl -X GET \
-b cookie.txt \
http://127.0.0.1:5000/dashboard/getpro
```

### ADD USER

```
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "testuser", "email": "test2@example.com", "password": "password123", "isAdmin": true, "score": 100}' \
http://127.0.0.1:5000/auth/add_user
```

### ADD A MEMBER TO PROJECT (ONLY ADMIN CAN)

```
 curl -X POST http://127.0.0.1:5000/dashboard/addMemberPro \
     -H "Content-Type: application/json" \
     -b cookie.txt \
     -d '{
          "project_data_name": "team_project69",
          "username": "testuser69",
          "isLeader": false,
          "role": "Developer-2"
     }'
```
     
### POST AN UPDATE FOR PROJECT (ONLY MEMBERS OF PROJECT)    
``` 
      curl -X POST http://127.0.0.1:5000/dashboard/postUpdate \
     -H "Content-Type: application/json" \
     -b cookie.txt \
     -d '{
          "project_data_name": "team_project421",
          "update": "nice_ig",
          "percentage": 10
     }'
```
     
### APPROVE THE UPDATE AND INCREMENT PROJECT COMPLETION PERCENTAGE (ONLY PROJECT LEADS AND ADMINS)
```
        curl -X UPDATE http://127.0.0.1:5000/dashboard/approveUpdate \
     -H "Content-Type: application/json" \
     -b cookie.txt \
     -d '{
          "project_data_name": "team_project421",
          "username":"testuser69"
     }'
```

### GET ALL PROJECT UPDATES

```
curl -X GET -H "Content-Type: application/json" \
-b cookie.txt \
-d '{"project_data_name": "team_project421"}' \
http://127.0.0.1:5000/dashboard/getupdates
```
