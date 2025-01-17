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
import { A4Card } from '@/components/A4Card';
import { useForm } from "react-hook-form"
import { Check } from "lucide-react"

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

const Body = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState(false);
    const [step, setStep] = useState(1);

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
        const currentValues = form.getValues();
        setStepValues({
            ...stepValues,
            ...currentValues
        });

        if (step === 1) {
            form.reset({
                field4: stepValues.field4,
                field5: stepValues.field5,
                field6: stepValues.field6,
            });
        } else if (step === 2) {
            form.reset({
                field7: stepValues.field7,
                field8: stepValues.field8,
                field9: stepValues.field9,
            });
        } else if (step === 3) {
            form.reset({
                field10: stepValues.field10,
                field11: stepValues.field11,
                field12: stepValues.field12,
            });
        }
        setStep(step + 1);
    };

    function onSubmit(values: FormValues) {
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
    const renderStepContent = (currentStep: number) => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <FormField
                            name="field1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field1</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="field2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field2</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="field3"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field3</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
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
                            {stepNumber === 1 ? 'Create' :
                                stepNumber === 2 ? 'Review' :
                                    stepNumber === 3 ? 'Verify' : 'Submit'}
                        </span>
                        {stepNumber < 4 && (
                            <div className={`w-10 h-0.5 ${step > stepNumber ? 'bg-blue-500' : 'bg-gray-300'}`} />
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
                        <h1 className="text-4xl font-bold mb-5 text-center">สร้างเอกสาร</h1>
                    </CardHeader>
                    <CardContent>
                        {renderStepper()}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                {response ? (
                    <Card className="overflow-y-auto">
                        <CardContent>
                            <A4Card />
                        </CardContent>
                    </Card>
                ) : (
                    <></>
                )}
            </div>
        </section>
    );
};

export default Body;