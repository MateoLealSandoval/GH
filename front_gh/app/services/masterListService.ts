import { axiosInstance } from "~/utils/axiosConfig";

export async function getMasterListByCodeService(code: string) {
    try {
        return await axiosInstance.get(`/listas-maestras/codigoLista/${code}`);
    } catch (error) {
        console.error('Error getMasterListByCodeService MasterListService: ', error);
    }
}