Steps to run app:
Requirements: docker, docker-compose
1. From terminal CD into the workspace folder.
2. Copy .env.example file as .env
3. Run command: ```docker-compose up -d```

To run server locally,
1. Change MONGODB_URL in .env file to mongo server's url.
2. Run command ```npm run start``` or ```npm run start:dev``` for debug build

To connect to server, use localhost:3500 IP address.
API to search for persons as per requirement:
```GET ${server_address}/search```
