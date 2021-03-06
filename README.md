# toolz-swap-service

## Setup
The project as is, is configured for a docker setup. For local setup, please see warning to change HOST in settings.

### Virtual Environment

```For Windows (bash)
py -3 -m venv <name_of_environment> 
```
```bash
source <name_of_environment>/Scripts/activate
```
To deactivate virtual environment:
```bash
deactivate
```
### Environment Variables

At the root of you directory, you should create a .env file with the following content:

```
DJANGO_SECRET_KEY=""
DEBUG="true"
TOOLZ_APP_DB=toolz_app_db_local
POSTGRES_USERNAME=postgres
TOOLZ_APP_DB_PASSWORD=password
TOOLZ_APP_DB=toolz_app_db_local
DB_HOST=localhost
TOOLZ_APP_DB_DOCKER=toolz_app_db_docker
DB_HOST_DOCKER=postgres_db_toolz
IMG_BB=""
```

Please reach out for the DJANGO_SECRET_KEY and IMG_BB variable

### Docker-Compose Setup (recommended)

Make sure that in your .env file (at root of directory):
```
IS_LOCAL_SETUP=true
```

1. Install Docker for you device
2. In a bash terminal at root of project, run the following. This might take a minute or so. When completed will exit terminal
```bash
docker-compose build
```
3. Let this load and run in background
```bash
docker-compose up
```
4. In a new bash terminal run the following. It should open a terminal to engage with Django app
```bash
docker exec -it toolz_swap_back bash
```
5. Make migrations
```bash
python manage.py makemigrations
```
6. Migrate
```bash
python manage.py migrate
```
7. Because of docker bind mount, you shouldn't need to reload, but in case you do: 
    a. Go back to previous terminal, pres CTRL+C to exit "docker-compose up" job
    b. Reload by running "docker-compose up" again
8. You should be able to open app at http://localhost:8000 . Follow allowed urls
9. You should be able to visit react client app at http://localhost:3000
10. After you finish with the app, you should tear it all down and remove unecessary volumes:
```bash
docker-compose down
docker volume rm <volume_id>
```

### Local Django setup

Make sure that in your .env file (at root of directory):
```
IS_LOCAL_SETUP=true
```

1. Install and setup postgres. Create a database called "toolz_app_db_local". For help, see here: https://www.youtube.com/watch?
v=uoJjDbL-Y_E
2. Enter virtual environment (see above)
3. Enter server directory:
```bash
cd server
```
4. Install requirements.txt after entering virtual environment (see above)
```bash
pip install -r requirements.txt
```
5. Make migrations
```bash
python manage.py makemigrations
```
6. Migrate migrations
```bash
python manage.py migrate
```
7. Run app. Should be accessible at http://localhost:8000
```bash
python manage.py runserver
```

### Starting React frontend

1. From the root of the directory, enter 'toolz_swap_front' folder:
```bash
cd client
```
2. Install the app. Yarn is recommended
```bash
yarn
```
or
```bash
npm install
```
3. Run the React app. Yarn is recommended
```bash
yarn start
```
or
```bash
npm start
```
4. App should be accessible and connected to django backend. Access app at http://localhost:3000

### Django API

For any of the models, by visiting http://localhost:8000/api/<name_of_model> you can access a form that allows you to post and create objects. You can even select foreign key objects if they are already created. It is using these endpoints that a frontend application will be able to communicate with our application. Feel free to submit information here and see that the entries show up in your postgres database. This is how you know everything is set up correctly. (Note: the uuid field does not need to be filled out, it does so automatically)

### Populating Database with Seed Data
If you want to quickly test something, there is `seed_data.json` file that has
some testing data. To use it, after you have set up your Docker containers and did all migrations, follow these steps:
1. connect to the container `docker exec -it toolz_swap_back bash`
2. run `python manage.py loaddata seed_data.json`

This should load some testing data.
If you wish to modify the seed_data.json file or create a new one, you can follow these steps:
1. Connect to the container:
`docker exec -it toolz_swap_back bash`

2. Open the shell:
`python manage.py shell`

3. Create your data by pasting/typing in the commands:
`>>> user_1 = User.objects.create(...)`

4. Dump it in a file:
`python manage.py dumpdata toolz_swap_app > seed_data.json`

5. Transfer the file to your host repo:
`docker cp <container_id>:/app/app_back/seed_data.json C:\Users\Nikita\Documents\GitHub\cs162-toolz-swap-service\server`

6. Rebuild the container and run migrations

7. Connect to the container and load your data:
`python manage.py loaddata seed_data.json`

### django-admin

There is a django-admin page but its incredibly rudimentary right now. However, if you'd like to access the admin page:

```bash
python manage.py createsuperuser
```

Follow the prompt to create superuser. Then, simply log in at http://localhost:8000/admin .

### Important notes

At some point, you may or may not have to run the following command, if you see errors related to DJANGO_SETTINGS_MODULE

To open django interactive terminal through docker:
```
docker exec -it toolz_swap_back bash
```

To open python interactive shell:
```
python manage.py shell
```

To set settings location
```
export DJANGO_SETTINGS_MODULE=toolz_app.settings
```

To delete all data in tables and restart:
```
python manage.py flush
```

If you're getting errors related to postgres connection try killing all connections:
```
netstat -ano | findstr :<PORT>
taskkill /PID <PID> /F
```