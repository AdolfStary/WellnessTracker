
const Logout = () => {

    sessionStorage.clear();
    window.location = "/";

    return true;

}
export default Logout;
