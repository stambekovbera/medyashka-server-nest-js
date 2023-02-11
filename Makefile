build:
	docker-compose build
up:
	docker-compose up

start:
	docker-compose start

down:
	docker-compose down

destroy:
	docker-compose down -v

stop:
	docker-compose stop

restart:
	docker-compose stop && docker-compose up -d

main-shell:
	docker exec -it medyashka-backend bash

psql-shell:
	docker exec -it postgres bash

psql-copy-books-dump:
	docker cp ./dumps/medyashka-books.sql postgres:/medyashka-books.sql && docker exec -it postgres bash