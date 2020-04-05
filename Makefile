build:
	docker-compose build --force-rm && make down && make up
up:
	docker-compose up -d
down:
	docker-compose down
logs:
	docker-compose logs -f
clean:
	docker-compose down -v --rmi all --remove-orphans
stop:
	docker-compose stop
start:
	docker-compose start
restart:
	docker-compose restart
