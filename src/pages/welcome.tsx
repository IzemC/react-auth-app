import { Link as MaterialLink } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Welcome to Vite + Material UI Auth</h1>
      <MaterialLink to="/signin" component={Link}>
        Sign In
      </MaterialLink>{" "}
      |{" "}
      <MaterialLink to="/signup" component={Link}>
        Sign Up
      </MaterialLink>
    </div>
  );
};

export default Welcome;
