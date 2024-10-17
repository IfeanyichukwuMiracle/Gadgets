import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div style={{ padding: ".5rem" }}>
      <p style={{ fontSize: "1.3rem", fontWeight: "500" }}>
        You&apos;re not an admin
      </p>
      <Link to={`/`} style={{ textDecoration: "underline", color: "blue" }}>
        Go to Login
      </Link>
    </div>
  );
};

export default Auth;
