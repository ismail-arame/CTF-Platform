## this project is built using :  

`MERN stack` (Mongodb, Express, React, Nodejs) , `nextjs` for server side rendering and `typescript` for type checking, `authentication` is done using `JWT` (Json Web Token) and `Docker` for running the platform in a container.

# Platform Design : 


### Challenges Page : 

![image 1](https://github.com/user-attachments/assets/76d26e27-38bc-4cf6-b6a8-c141f8b09606)

### Scoreboard Page : 

![image 2](https://github.com/user-attachments/assets/934cab08-06ab-416c-a4f3-343c11cb5c59)

### Home Page : 

![image 3](https://github.com/user-attachments/assets/05d62ee6-fd24-47d2-b359-7717e764abc1)

### Challenges Solved by competitor Page : 

![4](https://github.com/user-attachments/assets/c30d275d-a913-405c-9b38-228c056f8714)

### List of Users Page : 

![5](https://github.com/user-attachments/assets/759e0a44-af37-4b40-8cb6-48d92dd90243)

### Register Page : 

![6](https://github.com/user-attachments/assets/1c6604f8-b473-4fd3-a90e-3fb52aa5e81d)

### Login Page : 

![7](https://github.com/user-attachments/assets/d28aeaea-905c-4e7f-87f2-8fa3b9efd8cf)

to run the platform localy we will be using docker, you have to set envirenment varaibles in both frontend and backend in order to make it work perfectly.

## Frontend : 

you will have to create a .env.local file
and set this in its content:

NEXT_PUBLIC_API_ENDPOINT=http://localhost:8000 #(if you want to run docker on a production server make sure to set the public ip of the server instead of localhost like this http://10.0.0.1:8000)
ACCESS_TOKEN_SECRET=dpUr3rSW2ShkmMYTjZx57nsPbevLWgnjLqvvbtIO

## Backend : 

you will have to create a .env file
and set this in its content:

PORT=8000
NODE_ENV=development (production in case of running it in production server)
DATABASE_URL=mongodb+srv://username:password@cluster0.bd441vd.mongodb.net/   #(connect to your mongodb atlas account and get a DATABASE_URL)
DEFAULT_PICTURE=https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png
ACCESS_TOKEN_SECRET=dpUr3rSW2ShkmMYTjZx57nsPbevLWgnjLqvvbtIO
REFRESH_TOKEN_SECRET=aUXDBHCwFvKUwunkujh8kJqq3RQp8bxmMJ7OF8Eb

## Running Docker Container : 

```bash
sudo docker build -t ctf-platform .
```

```bash
sudo docker run -p 8000:8000 -p 80:80 -d ctf-platform
```
