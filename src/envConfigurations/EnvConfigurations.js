const {
    REACT_APP_API_URL,
    REACT_APP_PORT = 3000
}= process.env

export const envConfig = () => ({
    apiUrl: REACT_APP_API_URL,
    apiPort: REACT_APP_PORT
})