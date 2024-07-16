**Install dependencies:**

   ```sh
   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install
   ```

### Running the Project

#### Front End (Client)

```sh
cd client
npm start dev
```

The client application will be available at [http://localhost:3000](http://localhost:3000).

#### Back End (Server)

```sh
cd server
npm run dev
```

The server will be available at [http://localhost:5000](http://localhost:5000).

### Running with Docker

1. **Build and start Docker containers:**

   ```sh
   docker-compose up --build
   ```

2. **Access the applications:**

   - Client: [http://localhost:3000](http://localhost:3000)
   - Server: [http://localhost:5000](http://localhost:5000)
