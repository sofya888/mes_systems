import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((s) => s.auth);
  return (
    <div>
      <h1>Профиль</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
export default ProfilePage;
