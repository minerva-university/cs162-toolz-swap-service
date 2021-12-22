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


# API URLs (all of them working)

# get all listings in the neighborhood
# http://127.0.0.1:8000/listing/neighborhoods/?neighborhood_id=20ae61f5-61fd-4afd-aa4e-8ac5b750f3a7

# update/delete an existing neighborhood
# http://127.0.0.1:8000/router/neighborhoods/40e634b1-c5d6-4375-9874-00d42baf04d7/

# get all listing reviews given the listing_id
# http://127.0.0.1:8000/filter/listing/reviews/?listing_id=159be4a6-c309-4e5b-8dc7-fadde32568cb

search for "TODO" there's a lot left to do.