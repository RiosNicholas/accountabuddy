import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignupForm from "./SignupForm";

export default async function SignupPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center p-3 w-full">
      <SignupForm/>
    </main>
  );
}