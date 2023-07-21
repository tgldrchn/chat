import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import SignInPage from "./component/SignInPage";
import HomePage from "./component/HomePage";
import UserProfilePage from "./component/UserProfilePage";

export default function Home() {
  return (
    <ClerkProvider publishableKey="pk_test_aG9seS1ncm91cGVyLTM1LmNsZXJrLmFjY291bnRzLmRldiQ">
      <SignedIn>
        <HomePage />
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </ClerkProvider>
  );
}
