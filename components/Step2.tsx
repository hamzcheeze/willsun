
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format, set } from "date-fns"
import { th } from "date-fns/locale";
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { Check } from "lucide-react"
import { RequestForm } from "@/components/request";
import courtData from "@/data/thai-court.json";
import provincesData from '@/data/provinces.json';
import districtsData from '@/data/districts.json';
import subdistrictsData from '@/data/subdistricts.json';
import { useDecedentStore } from "@/stores/decedentStore";

interface ISubDistrict {
    id: number;
    provinceCode: number;
    districtCode: number;
    subdistrictCode: number;
    subdistrictNameEn: string;
    subdistrictNameTh: string;
    postalCode: number;
}

interface IDistrict {
    id: number;
    provinceCode: number;
    districtCode: number;
    districtNameEn: string;
    districtNameTh: string;
    postalCode: number;
}

interface IDropdown {
    value: string;
    label: string;
}

const TITLE: IDropdown[] = [
    { value: "mr", label: "นาย" },
    { value: "ms", label: "นางสาว" },
    { value: "mrs", label: "นาง" },
];


export const Step2 = () => {
    const [date, setDate] = useState<Date>()
    const getYear = new Date().getFullYear();
    const [deadDistricts, setDeadDistricts] = useState<Array<IDistrict>>([]);
    const [deadSubDistricts, setDeadSubDistricts] = useState<Array<ISubDistrict>>([]);
    const [birthDistricts, setBirthDistricts] = useState<Array<IDistrict>>([]);
    const [birthSubDistricts, setBirthSubDistricts] = useState<Array<ISubDistrict>>([]);
    const [court, setCourt] = useState<string>("");
    const { decedentData, setDecedentData } = useDecedentStore()

    const handleDeadProvince = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [provinceId, provinceName] = value.split('_');
        setDecedentData({
            ...decedentData,
            [name]: provinceName,
        });
        const district: IDistrict[] = districtsData.filter((d: any) =>
            d.provinceCode == provinceId
        );
        setDeadDistricts(district);
    };

    const handleDeadDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set subdistricts
        const { name, value } = e.target;
        const [districtId, districtName] = value.split('_');
        setDecedentData({
            ...decedentData,
            [name]: districtName,
        });
        const subDistrict: ISubDistrict[] = subdistrictsData.filter((d: any) =>
            d.districtCode == districtId
        );
        setDeadSubDistricts(subDistrict);
    }

    const handleBirthProvince = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [provinceId, provinceName] = value.split('_');
        setDecedentData({
            ...decedentData,
            [name]: provinceName,
        });
        const district: IDistrict[] = districtsData.filter((d: any) =>
            d.provinceCode == provinceId
        );
        setBirthDistricts(district);
    };

    const handleBirthDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set subdistricts
        const homeTown = decedentData.birthProvince
        const { name, value } = e.target;
        const [districtId, districtName] = value.split('_');

        const subDistrict: ISubDistrict[] = subdistrictsData.filter((d: any) =>
            d.districtCode == districtId
        );
        setBirthSubDistricts(subDistrict);
        // set court
        const court = courtData.province.find((province) =>
            province.name === homeTown
        )?.amphur.find((amphur) =>
            amphur.name === districtName
        )?.court.find((court) => {
            if (homeTown === "กรุงเทพมหานคร") {
                return court.startsWith("แพ่ง")
            } else {
                return court.startsWith("จังหวัด")
            }
        })
        setDecedentData({
            ...decedentData,
            [name]: districtName,
            courtName: court || "",
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDecedentData({
            ...decedentData,
            [name]: value,
        });
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-3">
                    <FormField
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>คำนำหน้า</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        handleChange({
                                            target: { name: "title", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {TITLE.map((item: any) => (
                                            <SelectItem key={item.value} value={item.label}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="firstName"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ชื่อ</FormLabel>
                                <FormControl>
                                    <Input
                                        name="firstName"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-5">
                    <FormField
                        name="lastName"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>นามสกุล</FormLabel>
                                <FormControl>
                                    <Input
                                        name="lastName"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-6">
                    <FormField
                        name="birthDate"
                        render={() => (
                            <FormItem >
                                <FormLabel>วันเกิด</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon />
                                            {date ? format(
                                                date, "PPP", { locale: th }
                                            ) : <span>เลือกวันที่</span>
                                            }
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            locale={th}
                                            mode="single"
                                            selected={date}
                                            onSelect={(selectedDate) => {
                                                setDate(selectedDate);
                                                if (selectedDate) {
                                                    handleChange({
                                                        target: {
                                                            name: "birthDate",
                                                            value: format(selectedDate, "yyyy-MM-dd")
                                                        }
                                                    } as React.ChangeEvent<HTMLInputElement>);
                                                }
                                            }}
                                            captionLayout="dropdown-buttons"
                                            fromYear={getYear - 100}
                                            toYear={getYear}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-6">
                    <FormField
                        name="deadDate"
                        render={() => (
                            <FormItem >
                                <FormLabel>วันที่เสียชีวิต</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon />
                                            {date ? format(
                                                date, "PPP", { locale: th }
                                            ) : <span>เลือกวันที่</span>
                                            }
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            locale={th}
                                            mode="single"
                                            selected={date}
                                            onSelect={(selectedDate) => {
                                                setDate(selectedDate);
                                                if (selectedDate) {
                                                    handleChange({
                                                        target: {
                                                            name: "deadDate",
                                                            value: format(selectedDate, "yyyy-MM-dd")
                                                        }
                                                    } as React.ChangeEvent<HTMLInputElement>);
                                                }
                                            }}
                                            captionLayout="dropdown-buttons"
                                            fromYear={getYear - 100}
                                            toYear={getYear}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-12">
                    <FormField
                        name="deadCause"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>สาเหตุการเสียชีวิต</FormLabel>
                                <FormControl>
                                    <Input
                                        name="deadCause"
                                        placeholder="เช่น โรคหัวใจ"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-12">
                    <FormField
                        name="deadAddress"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>สถานที่เสียชีวิต</FormLabel>
                                <FormControl>
                                    <Input
                                        name="deadAddress"
                                        placeholder="บ้านเลขที่ / อาคาร / หมู่บ้าน"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-4">
                    <FormField
                        name="deadVillageNo"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>หมู่ที่</FormLabel>
                                <FormControl>
                                    <Input
                                        name="deadVillageNo"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="deadRoad"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ถนน</FormLabel>
                                <FormControl>
                                    <Input
                                        name="deadRoad"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="deadAlley"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ตรอก/ซอย</FormLabel>
                                <FormControl>
                                    <Input
                                        name="deadAlley"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-12">
                    <FormField
                        name="deadProvince"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>จังหวัด</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        handleDeadProvince({
                                            target: { name: "deadProvince", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {provincesData
                                            .sort((a: any, b: any) => a.provinceNameTh.localeCompare(b.provinceNameTh))
                                            .map((item: any) => (
                                                <SelectItem
                                                    key={item.provinceCode}
                                                    value={`${item.provinceCode}_${item.provinceNameTh}`}
                                                >
                                                    {item.provinceNameTh}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>

            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-6">
                    <FormField
                        name="deadDistrict"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>อำเภอ/เขต</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        handleDeadDistrict({
                                            target: { name: "deadDistrict", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                    disabled={!deadDistricts.length}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {deadDistricts
                                            .sort((a: any, b: any) => a.districtNameTh.localeCompare(b.districtNameTh))
                                            .map((item: any) => (
                                                <SelectItem
                                                    key={item.districtCode || ""}
                                                    value={`${item.districtCode}_${item.districtNameTh}`}
                                                >
                                                    {item.districtNameTh || ""}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-6">
                    <FormField
                        name="deadSubDistrict"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ตำบล/แขวง</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        handleChange({
                                            target: { name: "deadSubDistrict", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                    disabled={!deadSubDistricts.length}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {deadSubDistricts
                                            .sort((a: any, b: any) => a.subdistrictNameTh.localeCompare(b.subdistrictNameTh))
                                            .map((item: any) => (
                                                <SelectItem
                                                    key={item.subdistrictCode || ""}
                                                    value={`${item.subdistrictNameTh || ""}`}
                                                >
                                                    {item.subdistrictNameTh || ""}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <br />
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-12">
                    <FormField
                        name="birthAddress"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ภูมิลำเนา</FormLabel>
                                <FormControl>
                                    <Input
                                        name="birthAddress"
                                        placeholder="บ้านเลขที่ / อาคาร / หมู่บ้าน"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-4">
                    <FormField
                        name="birthVillageNo"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>หมู่ที่</FormLabel>
                                <FormControl>
                                    <Input
                                        name="birthVillageNo"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="birthRoad"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ถนน</FormLabel>
                                <FormControl>
                                    <Input
                                        name="birthRoad"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="birthAlley"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ตรอก/ซอย</FormLabel>
                                <FormControl>
                                    <Input
                                        name="birthAlley"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-12">
                    <FormField
                        name="birthProvince"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>จังหวัด</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        handleBirthProvince({
                                            target: { name: "birthProvince", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {provincesData
                                            .sort((a: any, b: any) => a.provinceNameTh.localeCompare(b.provinceNameTh))
                                            .map((item: any) => (
                                                <SelectItem
                                                    key={item.provinceCode}
                                                    value={`${item.provinceCode}_${item.provinceNameTh}`}
                                                >
                                                    {item.provinceNameTh}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>

            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-6">
                    <FormField
                        name="birthDistrict"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>อำเภอ/เขต</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        handleBirthDistrict({
                                            target: { name: "birthDistrict", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                    disabled={!birthDistricts.length}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {birthDistricts
                                            .sort((a: any, b: any) => a.districtNameTh.localeCompare(b.districtNameTh))
                                            .map((item: any) => (
                                                <SelectItem
                                                    key={item.districtCode || ""}
                                                    value={`${item.districtCode}_${item.districtNameTh}`}
                                                >
                                                    {item.districtNameTh || ""}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-6">
                    <FormField
                        name="birthSubDistrict"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ตำบล/แขวง</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        handleChange({
                                            target: { name: "birthSubDistrict", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                    disabled={!birthSubDistricts.length}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {birthSubDistricts
                                            .sort((a: any, b: any) => a.subdistrictNameTh.localeCompare(b.subdistrictNameTh))
                                            .map((item: any) => (
                                                <SelectItem
                                                    key={item.subdistrictCode || ""}
                                                    value={`${item.subdistrictNameTh || ""}`}
                                                >
                                                    {item.subdistrictNameTh || ""}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <br />
            {/* <FormField
                name="field1"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>จังหวัด</FormLabel>
                        <Select
                            onValueChange={(value) => handleProvinceChange(value)}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="โปรดเลือก" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {courtData.province.map((province: any) => (
                                    <SelectItem key={province.name} value={province.name}>
                                        {province.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
            />
            <FormField
                name="field2"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>อำเภอ</FormLabel>
                        <Select
                            onValueChange={(value) => handleAmphurChange(value)}
                            defaultValue={field.value}
                            disabled={!amphurs.length}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="โปรดเลือก" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {amphurs.map((amphur) => (
                                    <SelectItem key={amphur.name} value={amphur.name}>
                                        {amphur.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
            />
            <FormField
                name="field3"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>ศาล</FormLabel>
                        <Select
                            onValueChange={(value) =>
                                handleChange({
                                    target: { name: "courtName", value },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                            defaultValue={field.value}
                            disabled={!courts.length}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="โปรดเลือก" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {courts.map((court) => (
                                    <SelectItem key={court} value={court}>
                                        {court}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
            /> */}
        </>
    );
}