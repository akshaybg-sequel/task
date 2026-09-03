# Task Manager - Backend Setup Guide

## Spring Boot API

The backend is located at `d:\SpringBootProjects\task` and runs on port `8080`.

**Backend Details:**
- **Database:** MySQL (taskdb)
- **API Base URL:** `http://localhost:8080/tasks`

**Database Connection:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskdb
spring.datasource.username=root
spring.datasource.password=Sequel@123
```

**To run the backend:**
```bash
cd d:\SpringBootProjects\task
mvn spring-boot:run
```

## API Endpoints

**Endpoints:**
```
GET    /tasks               → Get all tasks
GET    /tasks/{id}          → Get single task
POST   /tasks               → Create new task
PUT    /tasks/{id}          → Update task
DELETE /tasks/{id}          → Delete task
```

**Request/Response Format:**
```json
{
   "title": "Example task",
   "completed": false
}
```

---

## 🏗️ Project Structure

```
task/
├── src/
│   ├── main/java/com/example/teamtask/    (Backend Spring Boot)
│   │   ├── TaskApplication.java
│   │   ├── controller/TaskController.java
│   │   ├── service/TaskService.java
│   │   ├── repository/TaskRepository.java
│   │   ├── model/Task.java
│   │   ├── dto/TaskRequest.java & TaskResponse.java
│   │   └── exception/
│   └── main/resources/
│       └── application.properties
│
├── pom.xml
└── README.md
```

---

## Technologies Used

**Backend:**
- Spring Boot 4.1.1
- Spring Data JPA
- MySQL JDBC Driver
- Java 21

The API uses Spring Boot, Spring Data JPA, MySQL, and Java 21.
