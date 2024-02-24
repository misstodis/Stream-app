import { createViewerToken } from "@/actions/token";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    // when the hostIdentity changes, we will create a new token
    useEffect(() => {
        const createToken = async () => {
            try {
                const vieuwerToken = await createViewerToken(hostIdentity);
                setToken(vieuwerToken);

                const decodedToken = jwtDecode(vieuwerToken) as JwtPayload & {
                    name?: string;
                };

                // sub is the unique identity of the user
                // find more : https://docs.livekit.io/realtime/concepts/authentication/
                const identity = decodedToken.sub;
                const name = decodedToken?.name;

                if (identity) {
                    setIdentity(identity);
                }
                if (name) {
                    setName(name);
                }

            } catch (error) {
                toast.error(String(error));
            }
        }

        createToken();
    }, [hostIdentity]);

    return { token, name, identity };
}
