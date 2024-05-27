import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const CustomRoute = ({ nav, role, element }) => {
    const user = useSelector((state) => state.auth);
    const isAuthenticated = user.isAuthenticated;

  
   
      if (!isAuthenticated) {
        return <Navigate to={"/"} />;
      }
    return (
      <div>
        {isAuthenticated && role.includes(auth.role) ? (
          element
        ) : (
          <Navigate to={nav} />
        )}
      </div>
    );
  };

export default CustomRoute;
