// components/DocumentSection.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface DocumentSectionProps {
    title: string;
    items: string[];
}

export const DocumentSection: FC<DocumentSectionProps> = ({ title, items }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="h-full">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{title}</h3>
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
    );
};