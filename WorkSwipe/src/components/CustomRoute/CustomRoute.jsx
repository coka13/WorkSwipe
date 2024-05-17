import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../../utils/getUserRole";

const CustomRoute = ({ nav, role, element }) => {
    const user = useSelector((state) => state.users);
    const isAuthenticated = user.isAuthenticated;
    const userRole = getUserRole(user);
  
   
      if (!isAuthenticated) {
        return <Navigate to={"/"} />;
      }

  
    return (
      <div>
        {isAuthenticated && role.includes(userRole) ? (
          element
        ) : (
          <Navigate to={nav} />
        )}
      </div>
    );
  };

export default CustomRoute;
