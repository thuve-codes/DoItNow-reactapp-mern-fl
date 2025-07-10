### Instructions to Run the Server Locally

1.  **Install Dependencies:**
    Open your terminal in the `backend` directory and run:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    Create a `.env` file inside the `config` directory with the following content:
    ```
    MONGO_URI=mongodb://localhost:27017/doitnow
    JWT_SECRET=your_jwt_secret
    ```
    Replace `your_jwt_secret` with a long, random string.

3.  **Run the Server:**
    ```bash
    npm start
    ```
    Or for development with auto-reloading:
    ```bash
    npm run dev
    ```

The server will be running on `http://localhost:5000`.
