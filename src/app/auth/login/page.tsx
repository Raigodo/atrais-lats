"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import LoginForm from "@/src/components/form/forms/login-form";

function Page() {
    return (
        <div className="h-full grid grid-cols-[2fr_3fr]">
            <div className="px-16 py-12 flex flex-col justify-between h-full">
                <div className="flex items-center">
                    <img src="/logo1.png" alt="Ātrais Lats" className="size-16 mr-1" />
                    <h4 className="text-xl font-semibold">Ātrais Lats</h4>
                </div>

                <div className="mt-8">
                    <h2 className="text-4xl font-semibold mb-2">Laipni lūgts atpakaļ</h2>
                    <h6 className="text-gray-400 text-xs inline">Jauns lietotājs? </h6>
                    <Link
                        href="/auth/register"
                        className="text-xs font-medium hover:text-indigo-600 transition"
                    >
                        Reģistrēties
                    </Link>
                </div>

                <div className="flex gap-x-4 my-4">
                    <Button
                        type="button"
                        size={"icon-lg"}
                        variant={"ghost"}
                        onClick={() => signIn("github")}
                    >
                        <GithubIcon />
                    </Button>
                    <Button
                        type="button"
                        size={"icon-lg"}
                        variant={"ghost"}
                        onClick={() => signIn("google")}
                    >
                        <svg viewBox="0 0 48 48" className="block">
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            ></path>
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            ></path>
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            ></path>
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            ></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                    </Button>
                </div>

                <LoginForm />
            </div>

            <div className="relative rounded-3xl grid overflow-hidden transition-all duration-700 ease-in-out">
                <div className="flex absolute top-0 bottom-0 right-0 left-0 items-center justify-center overflow-hidden">
                    <img src="/slider1.png" alt="bilde1" className="object-cover" />
                </div>
            </div>
        </div>
    );
}

export default Page;
