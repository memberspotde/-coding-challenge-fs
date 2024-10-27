import { z } from 'zod';
export declare const PersonSchema: z.ZodObject<{
    name: z.ZodString;
    birth_year: z.ZodString;
    homeworld: z.ZodString;
    homeworld_terrain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    birth_year: string;
    homeworld: string;
    homeworld_terrain: string;
}, {
    name: string;
    birth_year: string;
    homeworld: string;
    homeworld_terrain: string;
}>;
export type Person = z.infer<typeof PersonSchema>;
