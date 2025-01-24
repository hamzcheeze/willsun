import { create } from 'zustand'

interface DecedentData {
    title: string;
    firstName: string;
    lastName: string;
    age: number;
    birthDate: string;
    birthAddress: string;
    birthVillageNo: string;
    birthRoad: string;
    birthAlley: string;
    birthProvince: string;
    birthDistrict: string;
    birthSubDistrict: string;
    courtName: string;
    deadDate: string;
    deadCause: string;
    deadAddress: string;
    deadVillageNo: string;
    deadRoad: string;
    deadAlley: string;
    deadProvince: string;
    deadDistrict: string;
    deadSubDistrict: string;
}

interface DecedentStore {
    decedentData: DecedentData;
    setDecedentData: (data: Partial<DecedentData>) => void;
}

const initialState: DecedentData = {
    title: "",
    firstName: "",
    lastName: "",
    age: 0,
    birthDate: "",
    birthAddress: "",
    birthVillageNo: "",
    birthRoad: "",
    birthAlley: "",
    birthProvince: "",
    birthDistrict: "",
    birthSubDistrict: "",
    courtName: "",
    deadDate: "",
    deadCause: "",
    deadAddress: "",
    deadVillageNo: "",
    deadRoad: "",
    deadAlley: "",
    deadProvince: "",
    deadDistrict: "",
    deadSubDistrict: ""
}

export const useDecedentStore = create<DecedentStore>((set) => ({
    decedentData: initialState,
    setDecedentData: (data: any) => set((state) => ({
        decedentData: { ...state.decedentData, ...data }
    }))
}))