# toolz-swap-service
## Local Setup
1. Clone this repository on your local machine either using the command line or github desktop. When making changes, please don't work on the `main` branch. Create a new branch and work from there. 
2. You should have PostgreSQL client installed locally. You can download that here: https://postgresapp.com/. It is preferred that you download the Mac app as it is convenient to use. 
3. Once you have PostgreSQL setup, in your terminal run the command `psql CREATE DATABASE toolz_app_db;` to create a database for the app
4. Create a python virtual environment. You can find more information on how to create one here: https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/. Please use Python3 as this is the version of Python we are using for this project. 
5. You will need to set environment variables for the following. If you're using the Terminal in Mac, your .env file would look like this: <br>
```
export DJANGO_SECRET_KEY=
export DEBUG=
export TOOLZ_APP_DB=
export POSTGRES_USERNAME=
export TOOLZ_APP_DB_PASSWORD=
```
For Windows: <br>

Create .env file in your project directory and fill in the environmental variables. The usage of `python-dotenv` library in the codebase will take care of importing and using them. This adheres to the 12-factor app principles.
```
DJANGO_SECRET_KEY=
DEBUG=
TOOLZ_APP_DB=
POSTGRES_USERNAME=
TOOLZ_APP_DB_PASSWORD=
```
You can reach out in the group chat if you need the values for the environment variables

6. From the root directory, install the app's dependencies by runnig the command `pip install -r requirements.txt`
7. Once the dependencies are installed, run the command `python manage.py makemigrations` followed by `python manage.py migrate`. 
8. From your terminal,run the command `python manage.py runserver`. <br>
Navigate to the url http://127.0.0.1:8000/ to view the app locally. 

## Database
Once you create the database `toolz_app_db` and also figure out the Postres connection (using the right credentials in the .env file), you may want to insert some test data to test the application. Here are the next steps after you can view the app successfully at http://127.0.0.1:8000/ :
1. Setup a superuser by running `python3 manage.py createsuperuser`(you might need to use `python manage.py createsuperuser` if using Windows). You will be prompted to enter a username, email address, and strong password.
2. Once this command completes a new superuser will have been added to the database. Now restart the development server so we can test the login: `python3 manage.py runserver`
3. Go login to the site, open the /admin URL (e.g. http://127.0.0.1:8000/admin) and enter your new superuser userid and password credentials
4. From here on, you can proceed to adding, deleting, and modifying the data. 
5. For more about using the Admin page, go here: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Admin_site 
6. For more about authentication and creating regular users for testing, go here: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Authentication 


docker-compose up
In new bash terminal:
- docker exec -it toolz_swap_back bash
- python manage.py migrate
- python manage.py createsuperuser
CTRL+C
docker-compose up
yarn
yarn start

localhost:3000 

docker-compose down
