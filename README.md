<div align="center">
  <h1>
    <img src="https://user-images.githubusercontent.com/53683415/229388736-68c19abe-1555-4e15-b0d2-ecc622a0776e.png" width="200">
    <br>
    <img src="https://img.shields.io/badge/react-v17.0-white">
    <img src="https://img.shields.io/badge/java-v17-white">
    <img src="https://img.shields.io/badge/redux-v7.2-white">
    <img src="https://img.shields.io/badge/spring-v3.0-white">
    <img src="https://img.shields.io/badge/asp.net core-v6.0-white">
  </h1>
   House Work Job/Employee Seeking App Made With React+Redux and Spring Framework/ASP.NET Core
   <br>
</div>
<br>
<div align="center">
  <img src="https://github.com/juliantjg/homeWork/blob/main/readme-assets/all.gif" width="600">
</div>

<div align="center">
<details>
  
 <summary><b>Show screenshots</b></summary>
<div align="center">
  <br>
  <img src="https://user-images.githubusercontent.com/53683415/229389740-3ae0e967-763e-4785-90c7-14b03830400e.png" width="300">
  <img src="https://user-images.githubusercontent.com/53683415/229389849-4aedd2a5-0136-465b-bae0-9ee431a734f5.png" width="300">
  <img src="https://user-images.githubusercontent.com/53683415/229390115-018b94bf-06cf-425a-842d-7492d5e66ed5.png" width="300">
  <br>
</div>
  
</details>
</div>

## :question: What Is homeWork?
<b>homeWork</b> is a web application made with Spring Boot (backend api) and React.js + Redux (frontend), with a ASP.NET Core (backend api) version. A house work job website, <b>homeWork</b> provides a platform for both job seeker and recruiter. The application provides a wide range of functionalities listed below.
- [Main functionality preview](https://youtu.be/PoEHn59womA)
- [Job Seeker preview](https://youtu.be/jqqa_wIk9Ow)
- [Employer preview](https://youtu.be/3dFc_x0IZWA)

## ⚙️ Functionalities
Here is the complete <b>homeWork</b> functionalities rundown:
<details>
 <summary><b>Click to expand</b></summary>
 <br />
 
 1. Authentication with Spring Security (backend) + React (frontend)
 2. Registering as Job Seeker or Job Creator
 3. Route protection (only authenticated users can access the functionalitites)
 4. User functionalities separated by roles (job creator/job seeker)
 5. Create/update/delete jobs as a job creator
 6. Applying for a job as a job seeker
 7. Managing applications on application dashboard as job creator (accept/reject an application)
 8. Dashboard separation for different roles
 9. Jobs marketplace
 10. Job types with different thumbnails
 11. User profile page with unique gravatar image
 12. Proper statuses on job (pending/accepted/rejected application)
 13. Responsive sidebar
 14. View all my posted jobs as job creator
 
</details>

## :hammer: Utilization
<b>homeWork</b> utilizes the following points:
- React functional components
- State management with Redux
- Spring Framework for API development
- Spring Security for back end authentication and tokenization
- ASP.NET Core MVC
- ASP.NET Core JWT authentication + IdentityUser + auth middleware
- Json Web Token - Jwt Api
- MySQL for DB management
- Docker containerization, docker-compose
- Error handling with React/Redux
- Responsive UI with CSS/Bootstrap
- Gravatar pixel profile picture
- JPA @Query on repository data fetching/modification

## :whale: Getting Started With Docker
Wanna try out <b>homeWork</b> on your local machine? Here are the steps:
<details>
 <summary><b>Simple setup with Docker</b></summary>
 <br />
 
 Both the frontend and backend (and MySQL database) were containerized within separate Docker containers, as provided [here](https://github.com/juliantjg?tab=packages&repo_name=homeWork):
 <br />
 ![image](https://user-images.githubusercontent.com/53683415/230527901-133bb8f4-25f2-462d-9d7b-89fabfa3ded9.png#gh-dark-mode-only)
 ![image](https://user-images.githubusercontent.com/53683415/230527979-822d73f7-868a-403e-96e1-3c68f3f0b28f.png#gh-light-mode-only)

 1. Create a file `docker-compose.yml` with the following content (you can also find it [here](https://github.com/juliantjg/homeWork/blob/main/docker-compose.yml)):
 ```yml
version: '3'
services:
  db:
    image: mysql:8
    restart: always
    ports:
      - 3307:3306
    environment:
      MYSQL_DATABASE: homework
      MYSQL_USER: newuser
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: password
  server:
    image: ghcr.io/juliantjg/homework-backend:latest
    restart: always
    ports:
      - 8080:8080
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/homework?autoReconnect=true

  frontend:
    image: ghcr.io/juliantjg/homework-frontend:latest
    ports:
      - 3000:3000
 ```
 
  2. Run the `docker-compose.yml` to start up the backend (server), frontend (frontend) and MySQL (db). (Please make sure your local port `:3000` and `:8080` aren't in use):
  ```sh
  $ docker-compose up
  
  =======================================================
  Starting springdeploy_server_1         ... done
  Starting springdeploy_frontend_1       ... done
  Starting springdeploy_db_1             ... done
  =======================================================
  ```
  
  3. Access the application by entering `localhost:3000` on your browser:

  <img src="https://user-images.githubusercontent.com/53683415/230530173-d507cf61-7078-4040-b1a3-2a0a3a8f594e.png" width="600">
  
  4. Done! Now you can login. The database have been seeded, thus you can find jobs on the Hunt Jobs dashboard. Here is an employer credential (you can also sign up as one):
  ```
  email: employer@email.com
  password: password
  ```
 
</details>

## 🛠️ Built With <img src="https://user-images.githubusercontent.com/53683415/229395886-517660d1-0abe-4d41-86d0-1d9ffbb5b9ba.png" width="30"> <img src="https://github.com/juliantjg/homeWork/assets/53683415/2aa99df7-3eec-43c9-aa86-e217a75b7877" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223294710-a2ba9d4c-c680-497a-9b71-101f2186fc49.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313723-71cdde37-3494-44e8-80cb-01edecb3311c.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/224955579-a1ed2e8c-3ab7-41e1-b129-f37466f77c05.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313847-3cf57f1a-11fd-4963-a1df-b3895e478119.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/224954200-33f50594-34e2-43b6-81e9-f3c0bb269f97.png" width="30">
- <img src="https://user-images.githubusercontent.com/53683415/229395886-517660d1-0abe-4d41-86d0-1d9ffbb5b9ba.png" width="12"> <b><a href="https://spring.io/">Spring Framework</a> -</b> The Spring Framework is an application framework and inversion of control container for the Java platform.
- <img src="https://github.com/juliantjg/homeWork/assets/53683415/2aa99df7-3eec-43c9-aa86-e217a75b7877" width="12"> <b><a href="https://learn.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-7.0">ASP.NET Core</a> -</b> ASP.NET Core is a free and open-source web framework and successor to ASP.NET, developed by Microsoft.
- <img src="https://user-images.githubusercontent.com/53683415/223294710-a2ba9d4c-c680-497a-9b71-101f2186fc49.png" width="12"> <b><a href="https://reactjs.org/">React</a> -</b> React is a free and open-source front-end JavaScript library for building user interfaces based on components.
- <img src="https://user-images.githubusercontent.com/53683415/223313723-71cdde37-3494-44e8-80cb-01edecb3311c.png" width="12"> <b><a href="https://getbootstrap.com/">Bootstrap</a> -</b> Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development.
- <img src="https://user-images.githubusercontent.com/53683415/224955579-a1ed2e8c-3ab7-41e1-b129-f37466f77c05.png" width="12"> <b><a href="https://www.mysql.com/">MySQL</a> -</b> MySQL is an open-source relational database management system.
- <img src="https://user-images.githubusercontent.com/53683415/223313847-3cf57f1a-11fd-4963-a1df-b3895e478119.png" width="12"> <b><a href="https://redux.js.org/">Redux</a> -</b> Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.
- <img src="https://user-images.githubusercontent.com/53683415/224954200-33f50594-34e2-43b6-81e9-f3c0bb269f97.png" width="12"> <b><a href="https://www.docker.com/">Docker</a> -</b> Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.

## ✍️ Authors
- [Muhammad Umer Tariq](https://www.linkedin.com/in/muhammad-umer-tariq-bbaa91182/)
- [Julian Tjiong](https://juliantjg.github.io/)

## :scroll: License
- [Standart MIT License](https://github.com/juliantjg/homeWork/blob/main/LICENSE.md)
