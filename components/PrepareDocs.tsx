// components/PrepareDocs.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';
import { DocumentSection } from '@/components/DocumentSection';

interface PrepareDocsProps {
    relation: string;
}

export const PrepareDocs: FC<PrepareDocsProps> = ({ relation }) => {
    const requesterDocs = [
        'สำเนาทะเบียนบ้าน',
        'สำเนาบัตรประชาชน',
        'สำเนาใบเปลี่ยนชื่อ-สกุล (ถ้ามี)',
    ];

    const deceasedDocs = [
        'สำเนาทะเบียนบ้าน',
        'สำเนามรณบัตร',
        'สำเนาทะเบียนสมรส/หย่า',
        'สำเนาใบเปลี่ยนชื่อ-สกุล (ถ้ามี)',
        ...(relation === 'dadMomInlaw' ? ['ทะเบียนรับบุตรบุญธรรม'] : []),
        ...(relation === 'dad' ? ['ทะเบียนรับรองบุตร (ถ้ามี)'] : []),
    ];

    const inheritanceDocs = [
        'บัญชีเงินฝาก',
        'ทะเบียนรถ/ปืน',
        'ใบหุ้น',
        'โฉนดที่ดิน',
        'สัญญาเช่าซื้อ',
    ];

    const relativeDocs = [
        'สำเนามรณบัตรบิดาผู้ตาย',
        'สำเนามรณบัตรมารดาผู้ตาย',
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="bg-muted/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-center mb-6">
                    โปรดเตรียมเอกสารเพิ่มเติมดังต่อไปนี้เพื่อทำการสร้างแบบฟอร์มคำร้อง
                    <br />
                    ขอให้ศาลตั้งเป็นผู้จัดการมรดก (โดยไม่มีพินัยกรรม)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DocumentSection title="1. เอกสารของผู้ร้องขอ" items={requesterDocs} />
                    <DocumentSection title="2. เอกสารของผู้ตาย" items={deceasedDocs} />
                    <DocumentSection title="3. ทรัพย์มรดก" items={inheritanceDocs} />
                    <DocumentSection title="4. บัญชีเครือญาติ" items={relativeDocs} />
                </div>
            </div>
        </motion.div>
    );
};