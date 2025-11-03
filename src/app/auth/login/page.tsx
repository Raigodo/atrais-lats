"use client";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { handleLogin } from "./login-handler";
import { useState } from "react";

function Page() {
    const [username, setUsername] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");

    return (
        <main className="h-screen grid place-items-center bg-background2 p-8">
            <div className="relative w-full max-w-[1020px] h-[640px] bg-background rounded-4xl shadow-[0_60px_40px_-30px_rgba(0,0,0,0.27)]">
                <div className="p-16 h-full grid grid-cols-[auto_1fr] gap-16">
                    <form
                        action={handleLogin}
                        className="max-w-[260px] w-full flex flex-col justify-evenly h-full mx-auto"
                        autoComplete="off"
                    >
                        <div className="flex items-center">
                            <img src="/logo1.png" alt="Ātrais Lats" className="size-16 mr-1" />
                            <h4 className="text-xl font-semibold">Ātrais Lats</h4>
                        </div>

                        <div>
                            <h2 className="text-4xl font-semibold">Laipni lūgts atpakaļ</h2>
                            <h6 className="text-gray-400 text-xs inline">Jauns lietotājs? </h6>
                            <Link
                                href="/register"
                                className="text-xs font-medium hover:text-indigo-600 transition"
                            >
                                Reģistrēties
                            </Link>
                        </div>

                        <div>
                            <div className="mb-8">
                                <label
                                    className={cn(
                                        "text-gray-400 transition-all duration-300",
                                        username && "text-xs"
                                    )}
                                >
                                    Lietotājvārds
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required
                                    minLength={4}
                                    className={cn(
                                        "w-full bg-transparent border-0 border-b border-gray-400 text-sm outline-none transition duration-300",
                                        username && "border-foreground"
                                    )}
                                />
                            </div>

                            <div className="mb-8">
                                <label
                                    className={cn(
                                        "text-gray-400 transition-all duration-300",
                                        password && "text-xs"
                                    )}
                                >
                                    Parole
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                    minLength={4}
                                    className={cn(
                                        "w-full bg-transparent border-0 border-b border-gray-400 text-sm outline-none transition duration-300",
                                        password && "border-foreground"
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-[43px] text-white rounded-lg text-sm hover:bg-indigo-600 transition"
                            >
                                Pieslēgties
                            </Button>
                        </div>
                    </form>

                    <div className="rounded-3xl grid overflow-hidden transition-all duration-700 ease-in-out">
                        <div className="flex items-center justify-center overflow-hidden">
                            <img
                                src="/slider1.png"
                                alt="bilde1"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;
