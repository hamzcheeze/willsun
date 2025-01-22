'use client';

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
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
import { format } from "date-fns"
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

interface Dropdown {
    value: string;
    label: string;
}

const TITLE: Dropdown[] = [
    { value: "mr", label: "นาย" },
    { value: "ms", label: "นางสาว" },
    { value: "mrs", label: "นาง" },
];

// Remove zod entirely
type FormValues = {
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
    field7: string;
    field8: string;
    field9: string;
    field10: string;
    field11: string;
    field12: string;
}

interface CaseData {
    blackCase: string;
    year: string;
    content: string;
    plaintiff: string;
    province: string;
    amphur: string;
    courtName: string;
    title: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    birthDate: string;
}

const Body = () => {
    const [formData, setFormData] = useState<CaseData>({
        blackCase: "",
        year: "2568",
        content: "แพ่ง",
        plaintiff: "",
        province: "",
        amphur: "",
        courtName: "",
        title: "",
        firstName: "",
        lastName: "",
        idNumber: "",
        birthDate: "",
    });
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedAmphur, setSelectedAmphur] = useState<string>('');
    const [amphurs, setAmphurs] = useState<{ name: string; court: string[] }[]>([]);
    const [courts, setCourts] = useState<string[]>([]);
    const [date, setDate] = useState<Date>()
    const getYear = new Date().getFullYear();

    const [stepValues, setStepValues] = useState<FormValues>({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
        field7: '',
        field8: '',
        field9: '',
        field10: '',
        field11: '',
        field12: '',
    });

    const form = useForm<FormValues>({
        defaultValues: {
            field1: "",
            field2: "",
            field3: "",
            field4: "",
            field5: "",
            field6: "",
            field7: "",
            field8: "",
            field9: "",
            field10: "",
            field11: "",
            field12: "",
        },
    })

    const handlePrevious = () => {
        // Store current step values
        const currentValues = form.getValues();
        setStepValues({
            ...stepValues,
            ...currentValues
        });

        // Restore values for previous step
        if (step === 2) {
            form.reset({
                field1: stepValues.field1,
                field2: stepValues.field2,
                field3: stepValues.field3,
            });
        } else if (step === 3) {
            form.reset({
                field4: stepValues.field4,
                field5: stepValues.field5,
                field6: stepValues.field6,
            });
        } else if (step === 4) {
            form.reset({
                field7: stepValues.field7,
                field8: stepValues.field8,
                field9: stepValues.field9,
            });
        }
        setStep(step - 1);
    };

    const handleContinue = () => {
        console.log(formData);
        // const currentValues = form.getValues();
        // setStepValues({
        //     ...stepValues,
        //     ...currentValues
        // });

        // if (step === 1) {
        //     form.reset({
        //         field4: stepValues.field4,
        //         field5: stepValues.field5,
        //         field6: stepValues.field6,
        //     });
        // } else if (step === 2) {
        //     form.reset({
        //         field7: stepValues.field7,
        //         field8: stepValues.field8,
        //         field9: stepValues.field9,
        //     });
        // } else if (step === 3) {
        //     form.reset({
        //         field10: stepValues.field10,
        //         field11: stepValues.field11,
        //         field12: stepValues.field12,
        //     });
        // }
        setStep(step + 1);
    };

    function onSubmit() {
        const currentValues = form.getValues();
        const finalValues = {
            ...stepValues,
            ...currentValues
        };

        const allFieldsFilled = Object.values(finalValues).every(value => value !== "");
        if (allFieldsFilled && step === 4) {
            setResponse(true);
            console.log('Final form values:', finalValues);

            // Reset everything after successful submission
            setStepValues({
                field1: '',
                field2: '',
                field3: '',
                field4: '',
                field5: '',
                field6: '',
                field7: '',
                field8: '',
                field9: '',
                field10: '',
                field11: '',
                field12: '',
            });
            form.reset();
            // setStep(1);
        }
    }

    const handleProvinceChange = (value: string) => {
        setSelectedProvince(value);
        setFormData({ ...formData, province: value });
        const province = courtData.province.find(p => p.name === value);
        setAmphurs(province ? province.amphur : []);
        setSelectedAmphur('');
        setCourts([]);
    };

    const handleAmphurChange = (value: string) => {
        setSelectedAmphur(value);
        setFormData({ ...formData, amphur: value });
        const amphur = amphurs.find(a => a.name === value);
        setCourts(amphur ? amphur.court : []);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const renderStepContent = (currentStep: number) => {
        switch (currentStep) {
            case 1:
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
                                    name="occupation"
                                    render={() => (
                                        <FormItem className="flex-1">
                                            <FormLabel>ที่อยู่</FormLabel>
                                            <FormControl>
                                                <Input
                                                    name="occupation"
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
                                    name="homeNumber"
                                    render={() => (
                                        <FormItem className="flex-1">
                                            <FormLabel>หมู่ที่</FormLabel>
                                            <FormControl>
                                                <Input
                                                    name="homeNumber"
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
            case 2:
                return (
                    <>
                        <FormField
                            name="field4"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field4</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="field5"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field5</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="field6"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field6</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <FormField
                            name="field7"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field7</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="field8"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field8</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="field9"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field9</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="flex flex-wrap lg:flex-nowrap gap-2">
                            <FormField
                                name="field10"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Field10</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="field11"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Field11</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-wrap lg:flex-nowrap gap-2">
                            <FormField
                                name="field12"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Field12</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const renderStepper = () => {
        return (
            <div className="flex justify-center mb-8">
                {[1, 2, 3, 4].map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step > stepNumber
                            ? 'bg-blue-500'
                            : step === stepNumber
                                ? 'bg-blue-500'
                                : 'bg-gray-300'
                            }`}>
                            {step > stepNumber ? (
                                <Check className="w-5 h-5 text-white" />
                            ) : (
                                <span className="text-white">{stepNumber}</span>
                            )}
                        </div>
                        <span className="ml-2 mr-2 hidden 2xl:inline">
                            {stepNumber === 1 ? 'ผู้ร้อง' :
                                stepNumber === 2 ? 'ผู้ตาย' :
                                    stepNumber === 3 ? 'ทรัพย์มรดก' : 'เครือญาติ'}
                        </span>
                        {stepNumber < 4 && (
                            <div className={`w-6 h-0.5 ${step > stepNumber ? 'bg-blue-500' : 'bg-gray-300'}`} />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="grid grid-cols-12 mb-12">
            <div className="col-span-5 mr-4">
                <Card>
                    <CardHeader>
                        <h1 className="text-3xl font-bold mb-5 text-center">สร้างเอกสาร</h1>
                    </CardHeader>
                    <CardContent>
                        {renderStepper()}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {renderStepContent(step)}
                                <div className="flex justify-between">
                                    {step > 1 && (
                                        <Button
                                            type="button"
                                            onClick={handlePrevious}
                                            variant="outline"
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {step < 4 ? (
                                        <Button
                                            type="button"
                                            onClick={handleContinue}
                                            className="ml-auto"
                                        >
                                            Continue
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            className="ml-auto"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                form.handleSubmit(onSubmit)();
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-7">
                <Card className="overflow-y-auto">
                    <CardContent>
                        <RequestForm caseData={formData} />
                    </CardContent>
                </Card>

                {/* {response ? (
                    <Card className="overflow-y-auto">
                        <CardContent>
                            <A4Card />
                        </CardContent>
                    </Card>
                ) : (
                    <></>
                )} */}
            </div>
        </section>
    );
};

export default Body;