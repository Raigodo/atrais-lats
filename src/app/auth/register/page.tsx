function Page() {
    return (
        <main className="min-h-screen bg-beige flex items-center justify-center font-[Poppins] p-6">
            <div className="relative w-full max-w-[1020px] bg-white rounded-[3.3rem] shadow-[0_60px_40px_-30px_rgba(0,0,0,0.27)] overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-[45%] flex flex-col justify-center items-center p-10">
                    <form
                        action="/signup"
                        method="post"
                        autoComplete="off"
                        className="w-full max-w-xs"
                    >
                        <div className="flex items-center mb-6">
                            <img src="/logo1.png" alt="Ātrais Lats" className="h-16 w-16 mr-2" />
                            <h4 className="text-2xl font-semibold text-gray-800">Ātrais Lats</h4>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                                Reģistrācija
                            </h2>
                            <p className="text-sm text-gray-500">
                                Jau esi reģistrēts?{" "}
                                <a
                                    href="/"
                                    className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                                >
                                    Pieslēgties
                                </a>
                            </p>
                        </div>

                        <div className="space-y-5">
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
                                    type="email"
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-8 w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-indigo-600 transition"
                        >
                            Reģistrēties
                        </button>
                    </form>
                </div>

                {/* Image Side */}
                <section className="hidden md:block relative w-full md:w-[55%] rounded-4xl overflow-hidden">
                    <div className="absolute inset-0 flex justify-center items-center bg-white">
                        <img
                            id="slide-3"
                            src="/slider3.png"
                            alt="bilde3"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Page;
