import { getMasterListByCodeService } from "~/services/masterListService";

export async function getMasterListByCode(code: string) {
    try {
        const res = await getMasterListByCodeService(code);
        const masterList = res?.data;
        const FormattedMasterLists = masterList.map((list: { idItem: { toString: () => any; }; descripcion: any; }) => ({
            value: list.idItem.toString(),
            label: list.descripcion,
        }));
        return FormattedMasterLists;
    } catch (error: any) {
        console.error("Error getMasterListByCode MasterListProvider: ", error);
        throw new Error(error);
    }
}

