import { ZodSafeParseResult } from "zod";

export function prepareErrorSummary<T>(validated: ZodSafeParseResult<T>) {
    const errors: Record<string, string> = {};
    const global: string[] = [];

    for (const issue of validated.error!.issues) {
        const key = issue.path.at(0);
        if (typeof key === "string") {
            if (!errors[key]) errors[key] = issue.message;
        } else if (global.length === 0) {
            global.push(issue.message);
        }
    }

    return {
        ...errors,
        ...(global.length > 0 && { _global: [global[0]] }),
    } as Partial<Record<keyof T, string>> & {
        _global: string[];
    };
}
