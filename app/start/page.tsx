
'use client';

import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useEffect, useState, useTransition } from "react";
import PrepareDocs from "@/components/PrepareDocs";

export default function QuestionnairePage() {
    const [isPeding, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [relation, setRelation] = useState("")
    const form = useForm();

    // useEffect(() => {
    //     console.log(relation)
    // }, [relation])

    const onSubmit = (data: any) => {
        console.log(data)
        console.log(data.relation);
    }

    return (
        <section className="flex items-center justify-center">
            {/* <div className="w-9/12"> */}
            <Card className="w-[800px]">
                <CardHeader>
                    {/* <h1 className="text-3xl font-bold mb-2 text-center">กรุณาตอบคำถามต่อไปนี้</h1> */}
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="mb-4 text-center">
                                <FormField
                                    control={form.control}
                                    name="relation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className="text-xl">
                                                ผู้ตายเป็นอะไรกับท่าน
                                            </FormLabel>
                                            <Select
                                                // onValueChange={field.onChange}
                                                onValueChange={(value) => setRelation(value)}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="โปรดเลือก" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="mom">มารดา</SelectItem>
                                                    <SelectItem value="marriedDad">บิดาที่สมรสกับมารดา</SelectItem>
                                                    <SelectItem value="dad">บิดาที่ไม่ได้สมรสกับมารดา</SelectItem>
                                                    <SelectItem value="dadMomInlaw">บิดา/มารดาบุญธรรม</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {relation && <PrepareDocs relation={relation}/>}
                            {/* <div>
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>นามสกุล</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPeding}
                                                    placeholder=""
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>อีเมล์</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPeding}
                                                    type="email"
                                                    placeholder="email@example.com"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>รหัสผ่าน</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPeding}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                disabled={isPeding}
                                type="submit"
                                className="w-full"
                            >
                                ยืนยัน
                            </Button> */}
                        </form>
                    </Form>
                </CardContent>
            </Card>
            {/* </div> */}
        </section>

    );
}