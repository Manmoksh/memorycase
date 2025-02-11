import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  return (
    <nav className="sticky z-[100] h-144 insetx-0 top-0 w-full border-b border-gray-200 bg-white/65 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center border-b justify-between border-zinc-200 ">
          <Link href="/" className="flex z-40 font-semibold">
            <span className="text-blue-600">Memory</span>case
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign Out
                </Link>

                {isAdmin ? (
                  <LogoutLink
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Dashboard ✨
                  </LogoutLink>
                ) : null}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case
                  <ArrowRight className=" ml-1.5 h-5 w-5 " />
                </Link>
              </>
            ) : (
              <>
                <RegisterLink
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign Up
                </RegisterLink>
                <LoginLink
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Login
                </LoginLink>

                <div className="h-8 hidden w-px bg-zinc-200 sm:block" />
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case
                  <ArrowRight className=" ml-1.5 h-5 w-5 " />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
