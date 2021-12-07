fix api and axios issues. can not post to localhost:8000/api/tool for some reason

model->serializers->api (viewsets)-> urls(toolz_swap)->urls(toolz_swap_app)

docker-compose up
docker exec -it toolz_swap_back bash
python manage.py migrate




If postgres db connection is wack, kill all connections:
netstat -ano | findstr :<PORT>
taskkill /PID <PID> /F

Make sure nothing is running in docker-already:

docker-compose ps
docker ps

for docker set up, in settings.py:

DB_HOST -> DB_HOST_DOCKER
TOOLZ_APP_DB -> TOOLZ_APP_DB_DOCKER