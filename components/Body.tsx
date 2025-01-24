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
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { RequestForm } from "@/components/request";
import { Step1 } from "@/components/Step1";
import { Step2 } from "@/components/Step2";
import { RenderStepper } from "@/components/RenderStepper";
import { useCaseStore } from "@/stores/caseStore";
import { useDecedentStore } from "@/stores/decedentStore";

const Body = () => {
    const form = useForm();
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<Error | null>(null);
    const { formData } = useCaseStore()
    const { decedentData } = useDecedentStore()
    // const [response, setResponse] = useState(false);
    const [step, setStep] = useState(1);

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleContinue = () => {
        console.log(formData);
        console.log(decedentData);
        setStep(step + 1);
    };

    function onSubmit() {
        // setResponse(true);
        console.log("test")
    }

    // const handleProvinceChange = (value: string) => {
    //     setSelectedProvince(value);
    //     setFormData({ ...formData, province: value });
    //     const province = courtData.province.find(p => p.name === value);
    //     setAmphurs(province ? province.amphur : []);
    //     setSelectedAmphur('');
    //     setCourts([]);
    // };

    // const handleAmphurChange = (value: string) => {
    //     setSelectedAmphur(value);
    //     setFormData({ ...formData, amphur: value });
    //     const amphur = amphurs.find(a => a.name === value);
    //     setCourts(amphur ? amphur.court : []);
    // };

    const renderStepContent = (currentStep: number) => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1 />
                );
            case 2:
                return (
                    <Step2 />
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

    return (
        <section className="grid grid-cols-12 mb-12">
            <div className="col-span-5 mr-4">
                <Card className="overflow-y-auto h-[314mm]">
                    <CardHeader>
                        <h1 className="text-3xl font-bold mb-5 text-center">สร้างเอกสาร</h1>
                    </CardHeader>
                    <CardContent>
                        <RenderStepper step={step} />
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
                        <RequestForm />
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