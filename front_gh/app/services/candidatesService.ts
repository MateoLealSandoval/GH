import { axiosInstance } from "~/utils/axiosConfig";

export async function getCandidatesService() {
    try {
        return await axiosInstance.get("candidatos");
    } catch (error) {
        console.error('Error getCandidates CandidatesService: ', error);
    }
}