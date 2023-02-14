export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    favouriteTeam?: string | null;
 }