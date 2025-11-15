"use client";

import { useSession } from "next-auth/react";

function Page() {
    const user = useSession();

    return (
        <div>
            settings <div>{JSON.stringify(user)}</div>
        </div>
    );
}

export default Page;
