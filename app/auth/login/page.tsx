
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const session = await getServerSession();

  return (
    <>
      {session ? (
        redirect("/dashboard")
      ) : (
        <LoginForm />
      )}
    </>
  );
}
