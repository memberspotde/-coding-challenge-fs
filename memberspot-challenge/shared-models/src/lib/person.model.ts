import { z } from 'zod';

// Define schema to validate structure of a person object
export const PersonSchema = z.object({
    name: z.string(),
    birth_year: z.string(),
    homeworld: z.string(),
    homeworld_terrain: z.string(),
});

// Infer TypeScript type from schema for type safety
export type Person = z.infer<typeof PersonSchema>;
