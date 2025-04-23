import LogInCard from "@/components/log-in/login-card";
import Link from "next/link";

const BackendLogIn = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <LogInCard />
      <Link href={"/zachary-online/v1/sign-up"} className="mt-2 underline">
        Don&apos;t have an account? Sign up!
      </Link>
    </div>
  );
};
export default BackendLogIn;
