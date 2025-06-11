import { createContext, useState } from "react";

interface AuthContextInterface {
    id: string | null;
    setId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [id, setId] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ id, setId }}>
            {children}
        </AuthContext.Provider>
    );
}
