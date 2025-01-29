
import {
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
import { format } from "date-fns"
import { th } from "date-fns/locale";
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import provincesData from '@/data/provinces.json';
import districtsData from '@/data/districts.json';
import subdistrictsData from '@/data/subdistricts.json';
import { useCaseStore } from "@/stores/caseStore";

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

interface IProvince {
    id: number;
    provinceCode: number;
    provinceNameTh: string;
    provinceNameEn: string;
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


export const Step1 = () => {
    const [date, setDate] = useState<Date>()
    const getYear = new Date().getFullYear();
    const [districts, setDistricts] = useState<Array<IDistrict>>([]);
    const [subDistricts, setSubDistricts] = useState<Array<ISubDistrict>>([]);
    const { formData, setFormData } = useCaseStore()

    const handleProvinceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [provinceId, provinceName] = value.split('_');
        setFormData({
            ...formData,
            [name]: provinceName,
        });
        const district: IDistrict[] = districtsData.filter((d: IDistrict) =>
            d.provinceCode == parseInt(provinceId)
        );
        setDistricts(district);
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [districtId, districtName] = value.split('_');
        setFormData({
            ...formData,
            [name]: districtName,
        });
        const subDistrict: ISubDistrict[] = subdistrictsData.filter((d: ISubDistrict) =>
            d.districtCode == parseInt(districtId)
        );
        setSubDistricts(subDistrict);
    }

    const handleSubDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [postalCode, subDistrictName] = value.split('_');
        setFormData({
            ...formData,
            postalCode,
            [name]: subDistrictName,
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
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
                                    onValueChange={(value: string) =>
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
                                        {TITLE.map((item: IDropdown) => (
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
                                <FormLabel>ชื่อผู้ร้อง</FormLabel>
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
                <div className="w-full col-span-7">
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
                <div className="w-full col-span-5">
                    <FormField
                        name="idNumber"
                        render={() => (
                            <FormItem>
                                <FormLabel>เลขประจำตัวประชาชน</FormLabel>
                                <FormControl>
                                    <Input
                                        name="idNumber"
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
                        name="race"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>เชื้อชาติ</FormLabel>
                                <FormControl>
                                    <Input
                                        name="race"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="nationality"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>สัญชาติ</FormLabel>
                                <FormControl>
                                    <Input
                                        name="nationality"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="occupation"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>อาชีพ</FormLabel>
                                <FormControl>
                                    <Input
                                        name="occupation"
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
                        name="address"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ที่อยู่</FormLabel>
                                <FormControl>
                                    <Input
                                        name="address"
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
                        name="villageNo"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>หมู่ที่</FormLabel>
                                <FormControl>
                                    <Input
                                        name="villageNo"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="road"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ถนน</FormLabel>
                                <FormControl>
                                    <Input
                                        name="road"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-4">
                    <FormField
                        name="alley"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>ตรอก/ซอย</FormLabel>
                                <FormControl>
                                    <Input
                                        name="alley"
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
                        name="province"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>จังหวัด</FormLabel>
                                <Select
                                    onValueChange={(value: string) =>
                                        handleProvinceChange({
                                            target: { name: "province", value },
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
                                            .sort((a: IProvince, b: IProvince) => a.provinceNameTh.localeCompare(b.provinceNameTh))
                                            .map((item: IProvince) => (
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
                        name="district"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>อำเภอ/เขต</FormLabel>
                                <Select
                                    onValueChange={(value: string) =>
                                        handleDistrictChange({
                                            target: { name: "district", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                    disabled={!districts.length}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {districts
                                            .sort((a: IDistrict, b: IDistrict) => a.districtNameTh.localeCompare(b.districtNameTh))
                                            .map((item: IDistrict) => (
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
                        name="subDistrict"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ตำบล/แขวง</FormLabel>
                                <Select
                                    onValueChange={(value: string) =>
                                        handleSubDistrictChange({
                                            target: { name: "subDistrict", value },
                                        } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                    defaultValue={field.value}
                                    disabled={!subDistricts.length}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="โปรดเลือก" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {subDistricts
                                            .sort((a: ISubDistrict, b: ISubDistrict) => a.subdistrictNameTh.localeCompare(b.subdistrictNameTh))
                                            .map((item: ISubDistrict) => (
                                                <SelectItem
                                                    key={item.subdistrictCode || ""}
                                                    value={`${item.postalCode || ""}_${item.subdistrictNameTh || ""}`}
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
            <div className="grid grid-cols-12 gap-2">
                <div className="w-full col-span-12">
                    <FormField
                        name="email"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>อีเมล์</FormLabel>
                                <FormControl>
                                    <Input
                                        name="email"
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
                        name="tel"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>โทรศัพท์</FormLabel>
                                <FormControl>
                                    <Input
                                        name="tel"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full col-span-6">
                    <FormField
                        name="fax"
                        render={() => (
                            <FormItem className="flex-1">
                                <FormLabel>โทรสาร</FormLabel>
                                <FormControl>
                                    <Input
                                        name="fax"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
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