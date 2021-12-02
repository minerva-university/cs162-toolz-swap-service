fix api and axios issues. can not post to localhost:8000/api/tool for some reason

model->serializers->api (viewsets)-> urls(toolz_swap)->urls(toolz_swap_app)

docker-compose up
docker exec -it toolz_swap_back bash
python manage.py migrate