import { LoginPage } from "@/components/Auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    redirect("/");
  }

  return <LoginPage />;
}
