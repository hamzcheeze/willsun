import { create } from 'zustand'

interface CaseData {
    blackCase: string;
    year: string;
    content: string;
    plaintiff: string;
    address: string;
    villageNo: string;
    road: string;
    alley: string;
    province: string;
    district: string;
    subDistrict: string;
    postalCode: string;
    courtName: string;
    title: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    birthDate: string;
    race: string;
    nationality: string;
    occupation: string;
    tel: string;
    fax: string;
    email: string;
}

interface CaseStore {
    formData: CaseData;
    setFormData: (data: Partial<CaseData>) => void;
    resetForm: () => void;
}

const initialState: CaseData = {
    blackCase: "",
    year: "2568",
    content: "แพ่ง",
    plaintiff: "",
    address: "",
    villageNo: "",
    road: "",
    alley: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    courtName: "",
    title: "",
    firstName: "",
    lastName: "",
    idNumber: "",
    birthDate: "",
    race: "",
    nationality: "",
    occupation: "",
    tel: "",
    fax: "",
    email: "",
}

export const useCaseStore = create<CaseStore>((set) => ({
    formData: initialState,
    setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
    })),
    resetForm: () => set({ formData: initialState })
}))