import { useNavigate } from 'react-router-dom';

export default function Logout(props) {

  let navigate = useNavigate();

  const logoutClicked = (e) => {
    props.setToken(null);
    props.setTunnus(null);
    props.setId(null);
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={(e) => logoutClicked(e)}
      className="btn btn-primary">
      Kirjaudu ulos
    </button>
  );
};