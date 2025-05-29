import { getCandidatesService } from "~/services/candidatesService";

export async function getCandidates() {
    try {
        const res = await getCandidatesService();

        if (!res || !res.data) {
            throw new Error("Respuesta inválida del servidor");
        }

        if (res.data.error) {
            console.error("Error getCandidates CandidatesProvider: ", res.data.error);
            throw new Error(res.data.error);
        }

        return res;

    } catch (error: any) {
        console.error("Error getCandidates CandidatesProvider: ", error);
        throw new Error(error);
    }
}

