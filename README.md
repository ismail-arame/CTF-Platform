## this project is built using :  

MERN stack (Mongodb, Express, React, Nodejs) and nextjs for server side rendering and typescript for type checking 

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
