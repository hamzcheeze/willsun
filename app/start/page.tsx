// pages/questionnaire.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
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

export interface Relation {
    value: string;
    label: string;
}

export const RELATIONS: Relation[] = [
    { value: "mom", label: "มารดา" },
    { value: "marriedDad", label: "บิดาที่สมรสกับมารดา" },
    { value: "dad", label: "บิดาที่ไม่ได้สมรสกับมารดา" },
    { value: "dadMomInlaw", label: "บิดา/มารดาบุญธรรม" }
];

export default function QuestionnairePage() {
    const [relation, setRelation] = useState('');
    const form = useForm();

    return (
        <section className="container mx-auto py-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-4xl mx-auto">
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form className="space-y-8">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="relation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xl font-semibold text-center block mb-6">
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

                                {relation && <PrepareDocs relation={relation} />}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}