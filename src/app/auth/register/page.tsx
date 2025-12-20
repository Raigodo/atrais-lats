"use client";

import RegisterForm from "@/src/components/forms/forms/register-form";

function Page() {
    return (
        <div className="h-full grid grid-cols-[2fr_3fr]">
            <div className="px-16 py-12 flex flex-col justify-between h-full gap-6">
                <div className="flex items-center">
                    <img src="/logo1.png" alt="Ātrais Lats" className="h-16 w-16 mr-2" />
                    <h4 className="text-2xl font-semibold text-gray-800">Ātrais Lats</h4>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">Reģistrācija</h2>
                    <p className="text-sm text-gray-500">
                        Jau esi reģistrēts?{" "}
                        <a
                            href="/auth/login"
                            className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                        >
                            Pieslēgties
                        </a>
                    </p>
                </div>
                <RegisterForm />
            </div>

            <div className="relative rounded-3xl grid overflow-hidden transition-all duration-700 ease-in-out">
                <div className="flex absolute top-0 bottom-0 right-0 left-0 items-center justify-center overflow-hidden">
                    <img src="/slider3.png" alt="bilde3" className="object-cover size-full" />
                </div>
            </div>
        </div>
    );
}

export default Page;
