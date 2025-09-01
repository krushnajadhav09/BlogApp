import { Navigate } from "react-router-dom";

const PrivateRouter = ({children}) =>{
const isloggedIn = !!localStorage.getItem("access_token");
console.log("this is aceess token ",isloggedIn)
return isloggedIn ? children : <Navigate to="/login"/>;
};

export default PrivateRouter;