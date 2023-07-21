import { UserButton } from "@clerk/nextjs";

const UserProfilePage = () => (
  <UserButton
    userProfileMode="navigation"
    userProfileUrl={
      typeof window !== "undefined"
        ? `${window.location.origin}/profile`
        : undefined
    }
  />
);

export default UserProfilePage;
