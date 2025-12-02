import { loginAction } from "@/src/lib/actions/login-action";
import { Button } from "../../ui/button";

function LoginForm() {
    return (
        <form
            action={loginAction}
            className="w-full flex flex-col h-full mx-auto"
            autoComplete="off"
        >
            <div className="mb-12 space-y-4">
                <div className="relative">
                    <input
                        id="username"
                        name="username"
                        required
                        placeholder="lietotājvārds"
                        className="peer w-full border-b border-gray-400 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-transparent"
                    />
                    <label
                        htmlFor="username"
                        className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-900"
                    >
                        lietotājvārds
                    </label>
                </div>

                <div className="relative">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                        placeholder="Parole"
                        className="peer w-full border-b border-gray-400 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-transparent"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-gray-900"
                    >
                        parole
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

export default LoginForm;
