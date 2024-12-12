import { Link } from "react-router";

function MainPage() {
  return (
    <div>
      <h1>Logged IN!!!!</h1>
      <Link to="/Users" className="text-lg text-blue-700">
        User Panel
      </Link>
    </div>
  );
}

export default MainPage;
