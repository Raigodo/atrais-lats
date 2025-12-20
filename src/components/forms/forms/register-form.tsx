import { registerAction } from "@/src/lib/actions/register-action";
import { Button } from "../../ui/button";

function RegisterForm() {
    return (
        <form
            // action={registerAction}
            className="w-full flex flex-col justify-evenly mx-auto"
            autoComplete="off"
        >
            <div className="mb-8 space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        minLength={4}
                        required
                        placeholder="Lietotājvārds"
                        className="peer w-full border-b border-gray-400 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-transparent"
                    />
                    <label
                        htmlFor="username"
                        className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-900"
                    >
                        Lietotājvārds
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        minLength={4}
                        required
                        placeholder="Parole"
                        className="peer w-full border-b border-gray-400 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-transparent"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-900"
                    >
                        Parole
                    </label>
                </div>

                <div className="relative">
                    <input
                        name="email"
                        id="email"
                        required
                        placeholder="Ēpasts"
                        className="peer w-full border-b border-gray-400 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-transparent"
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-900"
                    >
                        Ēpasts
                    </label>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full h-[43px] text-white rounded-lg text-sm hover:bg-indigo-600 transition"
            >
                Pieslēgties
            </Button>
        </form>
    );
}

export default RegisterForm;
