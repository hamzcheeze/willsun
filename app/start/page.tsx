// pages/questionnaire.tsx
'use client';

import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PrepareDocs } from '@/components/PrepareDocs';
import { Input } from '@/components/ui/input';

export interface Dropdown {
    value: string;
    label: string;
}

export const RELATIONS: Dropdown[] = [
    { value: "marriedMom", label: "มารดาที่สมรสกับบิดาท่าน" },
    { value: "mom", label: "มารดาที่ไม่ได้สมรสกับบิดาท่าน" },
    { value: "marriedDad", label: "บิดาที่สมรสกับมารดาท่าน" },
    { value: "dad", label: "บิดาที่ไม่ได้สมรสกับมารดาท่าน" },
    { value: "dadMomInlaw", label: "บิดา/มารดาบุญธรรม" }
];

export const PARENT: Dropdown[] = [
    { value: "aliveBoth", label: "ทั้งบิดาและมารดาผู้ตายยังมีชีวิตอยู่ทั้งคู่" },
    { value: "deadGrandpa", label: "บิดาเสียชีวิต/มารดาผู้ตายยังมีชีวิตอยู่" },
    { value: "deadGrandma", label: "บิดามีชีวิต/มารดาผู้ตายเสียชีวิตแล้ว" },
    { value: "deadBoth", label: "ทั้งบิดาและมารดาผู้ตายเสียชีวิตแล้วทั้งคู่" },
];


export default function QuestionnairePage() {
    const [relation, setRelation] = useState('');
    const [parentStatus, setParentStatus] = useState('');
    const [childrenAmount, setChildrenAmount] = useState(0);

    const form = useForm();

    return (
        <section className="container mx-auto py-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-4xl mx-auto">
                    <CardHeader className="text-3xl font-semibold text-center mt-4">
                        โปรดตอบคำถามด้านล่าง
                    </CardHeader>
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form className="space-y-8">
                                <div className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="relation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold block mb-4">
                                                    ผู้ตายเป็นอะไรกับท่าน
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => setRelation(value)}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full text-lg">
                                                            <SelectValue placeholder="โปรดเลือก" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {RELATIONS.map((relation: any) => (
                                                            <SelectItem
                                                                key={relation.value}
                                                                value={relation.value}
                                                                className="text-lg"
                                                            >
                                                                {relation.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="parentStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold block mb-4">
                                                    บิดามารดาของผู้ตายยังมีชีวิตอยู่หรือไม่
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => setParentStatus(value)}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full text-lg">
                                                            <SelectValue placeholder="โปรดเลือก" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {PARENT.map((relation: any) => (
                                                            <SelectItem
                                                                key={relation.value}
                                                                value={relation.value}
                                                                className="text-lg"
                                                            >
                                                                {relation.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="parentStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold block mb-4">
                                                    ผู้ตายมีบุตรกี่คน (รวมตัวท่าน)
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    className="w-full text-lg"
                                                    placeholder="โปรดระบุจำนวน"
                                                    onChange={(e) => setChildrenAmount(Number(e.target.value))}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {relation && parentStatus && childrenAmount > 0 && (
                                    <PrepareDocs
                                        relation={relation}
                                        parentStatus={parentStatus}
                                        childrenAmount={childrenAmount}
                                    />
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}