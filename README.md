## this project is built using :  

`MERN stack` (Mongodb, Express, React, Nodejs) , `nextjs` for server side rendering and `typescript` for type checking, `authentication` is done using `JWT` (Json Web Token) and `Docker` for running the platform in a container.

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
# Platform Design : 

### Challenges Page : 

[![1.jpg](https://i.postimg.cc/gjWByDd3/1.jpg)](https://postimg.cc/7GKVwS5L)

### Scoreboard Page : 

[![2.jpg](https://i.postimg.cc/HsW6pjLW/2.jpg)](https://postimg.cc/3W6X18pz)

### Home Page : 

[![3.jpg](https://i.postimg.cc/RZydQRLq/3.jpg)](https://postimg.cc/v475G5jd)

### Challenges Solved by competitor Page : 

[![4.jpg](https://i.postimg.cc/zBSkN1ZR/4.jpg)](https://postimg.cc/N9FX8S0g)

### List of Users Page : 

[![5.jpg](https://i.postimg.cc/xj5PFY3w/5.jpg)](https://postimg.cc/mhcMtvqj)

### Register Page : 

[![6.jpg](https://i.postimg.cc/Gm8J2DnR/6.jpg)](https://postimg.cc/FYvJC7KC)

### Login Page : 

[![7.jpg](https://i.postimg.cc/d1v84SkQ/7.jpg)](https://postimg.cc/VSGrNgW2)
