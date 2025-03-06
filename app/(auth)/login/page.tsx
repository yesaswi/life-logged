import { auth, signIn } from "app/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "app/components/ui/button";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const session = await auth();
  const { error } = searchParams;

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {!error ? (
              "Sign in to access your private space"
            ) : error === "AccessDenied" ? (
              <span className="text-red-500">
                Access restricted to authorized users only
              </span>
            ) : (
              <span className="text-yellow-500">
                An error occurred during sign in
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button className="w-full" type="submit">
                Login with Google
              </Button>
            </form>
          </div>
          {!error && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
