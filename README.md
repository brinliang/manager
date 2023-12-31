# manager
This is a web app for managing and visualizing time spent, built using FastAPI, React, and MongoDB.

## setup
Install the required node modules by running ```npm install``` in the frontend folder.

Install the required Python libraries by running ```pip install -r requirements.txt``` in the root directory.

Create an environment variable with your MongoDB key by running ```echo MONGODB_URL = 'your url here'" >> .env``` in the root directory.

## run
Run the server locally with ```uvicorn main:app --reload``` in the root directory.

Run the server in production with ```gunicorn main:app -k uvicorn.workers.UvicornWorker``` in the root directory.

## update
Run just the frontend with ```npm start``` in the frontend folder.

Create a new build with ```npm run build``` in the frontend folder.
