export default function GetAuth(){
    const userName = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    return btoa(`${userName}:${password}`)
}