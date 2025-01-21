// components/PrepareDocs.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';
import { DocumentSection } from '@/components/DocumentSection';

interface PrepareDocsProps {
    relation: string;
    parentStatus: string;
    childrenAmount: number;
}

interface FromState {
    alive: string[];
    dead: string[];
}

export const PrepareDocs: FC<PrepareDocsProps> = ({ relation, parentStatus, childrenAmount }) => {
    let from: FromState = { alive: [], dead: [] };
    
    switch (parentStatus) {
        case 'aliveBoth':
            from = { alive: ['บิดาผู้ตาย', 'มารดาผู้ตาย'], dead: [] };
            break;
        case 'deadGrandpa':
            from = { alive: ['มารดาผู้ตาย'], dead: ['บิดาผู้ตาย'] };
            break;
        case 'deadGrandma':
            from = { alive: ['บิดาผู้ตาย'], dead: ['มารดาผู้ตาย'] };
            break;
        case 'deadBoth':
            from = { alive: [], dead: ['บิดาผู้ตาย', 'มารดาผู้ตาย'] };
            break;
    }

    switch (relation) {
        case 'marriedMom':
            from.alive.push('คู่สมรส');
            break;
        case 'marriedDad':
            from.alive.push('คู่สมรส');
            break;
    }

    if (childrenAmount > 1) {
        from.alive.push('บุตรที่เหลือของผู้ตาย');
    }

    const requesterDocs = [
        'สำเนาทะเบียนบ้าน',
        'สำเนาบัตรประชาชน',
        'สำเนาใบเปลี่ยนชื่อ-สกุล (ถ้ามี)',
    ];

    const deceasedDocs = [
        'สำเนาทะเบียนบ้าน',
        'สำเนามรณบัตร',
        ...((relation === 'marriedMom' || relation === 'marriedDad') ? ['สำเนาทะเบียนสมรส/หย่า'] : []),
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
        'สัญญาจำนอง',
        'สลากออมสิน'
    ];

    const consentDocs = [
        'หนังสือให้ความยินยอมในการขอจัดการมรดก',
        'สำเนาทะเบียนบ้าน',
        'สำเนาบัตรประชาชน',
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="bg-muted/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-center mb-6">
                    โปรดเตรียมเอกสารเพิ่มเติมดังต่อไปนี้เพื่อทำการสร้างแบบฟอร์มคำร้อง
                    <br />
                    ขอให้ศาลตั้งเป็นผู้จัดการมรดก (โดยไม่มีพินัยกรรม)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DocumentSection
                        title="1. เอกสารของผู้ร้องขอ"
                        items={requesterDocs}
                    />
                    <DocumentSection
                        title="2. เอกสารของผู้ตาย"
                        items={deceasedDocs}
                    />
                    <DocumentSection
                        title="3. ทรัพย์มรดก"
                        items={inheritanceDocs}
                    />
                    <DocumentSection
                        title="4. เอกสารประกอบเกี่ยวกับทายาทโดยธรรมที่ให้ความยินยอม"
                        items={consentDocs}
                        from={from}
                    />
                </div>
            </div>
        </motion.div>
    );
};