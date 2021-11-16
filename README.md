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
```
SET DJANGO_SECRET_KEY=
SET DEBUG=
SET TOOLZ_APP_DB=
SET POSTGRES_USERNAME=
SET TOOLZ_APP_DB_PASSWORD=
```
You can reach out in the group chat if you need the values for the environment variables

6. From the root directory, install the app's dependencies by runnig the command `pip install -r requirements.txt`
7. Once the dependencies are installed, run the command `python manage.py makemigrations` followed by `python manage.py migrate`. 
8. From your terminal,run the command `python manage.py runserver`. <br>
Navigate to the url http://127.0.0.1:8000/ to view the app locally. 