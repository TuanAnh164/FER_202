const UserProfile = ({ user }) => {
  return (
    <div>
      Hello, {user.name}, {user.age}
    </div>
  );
};

export default UserProfile;
