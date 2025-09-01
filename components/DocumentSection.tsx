// components/DocumentSection.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface DocumentSectionProps {
    title: string;
    items: string[];
    from?: {
        alive: string[];
        dead: string[];
    };
}

export const DocumentSection: FC<DocumentSectionProps> = ({ title, items, from }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="h-full">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{title}</h3>
                    {from && from?.alive.length === 0 ? (
                        <>
                            <ul className="space-y-2">
                                <li key="" className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    <span>
                                        สำเนามรณบัตรของ{from?.dead.join(' ')}
                                    </span>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            {from && from?.alive.length > 0 && (
                                <>
                                    (สำหรับ{from?.alive.join(', ')})
                                </>
                            )}
                            <ul className="space-y-2">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {from && from?.dead.length > 0 && (
                                <>
                                    <br />
                                    (สำหรับ{from?.dead.join(', ')})
                                    <ul className="space-y-2">
                                        <li key="" className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span>สำเนามรณบัตร</span>
                                        </li>
                                    </ul>
                                    {/* ปล. หากไม่มี ต้องให้ที่ว่าการอำเภอออกให้ */}
                                </>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};