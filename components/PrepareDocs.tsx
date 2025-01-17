'use client';

interface PrepareDocsProps {
    relation: string;
}

export default function PrepareDocs({ relation }: PrepareDocsProps) {
    return (
        <div className="items-center space-x-4 rounded-md border p-4">

            <div className="space-y-1 mt-4">
                <p className="text-lg font-bold ml-4">
                    โปรดเตรียมเอกสารเพิ่มเติมดังต่อไปนี้พื่อทำการสร้างแบบฟอร์มคำร้อง
                    <br />
                    ขอให้ศาลตั้งเป็นผู้จัดการมรดก (โดยไม่มีพินัยกรรม)
                </p>
            </div>
            <br />

            <div className="grid grid-cols-12">
                <div className="col-span-6">
                    <b>1. เอกสารของผู้ร้องขอ</b><br />
                    - สำเนาทะเบียนบ้าน<br />
                    - สำเนาบัตรประชาชน<br />
                    - สำเนาใบเปลี่ยนชื่อ-สกุล (ถ้ามี)<br />

                    <br />
                    <b>2. เอกสารของผู้ตาย</b><br />
                    - สำเนาทะเบียนบ้าน<br />
                    - สำเนามรณบัตร<br />
                    - สำเนาทะเบียนสมรส/หย่า<br />
                    - สำเนาใบเปลี่ยนชื่อ-สกุล (ถ้ามี)<br />
                    {relation == "dadMomInlaw" ? (
                        <>
                            - ทะเบียนรับบุตรบุญธรรม<br />
                        </>
                    ) : relation == "dad" ? (
                        <>
                            - ทะเบียนรับรองบุตร (ถ้ามี)<br />
                        </>
                    ) : null}

                    <br />
                    <b>3. ทรัพย์มรดก</b><br />
                    - บัญชีเงินฝาก<br />
                    - ทะเบียนรถ/ปืน<br />
                    - ใบหุ้น<br />
                    - โฉนดที่ดิน<br />
                    - สัญญาเช่าซื้อ<br />
                </div>

                <div className="col-span-6">
                    <b>4. บัญชีเครือญาติ</b><br />
                    - สำเนามรณบัตรบิดาผู้ตาย<br />
                    - สำเนามรณบัตรมารดาผู้ตาย<br />
                </div>

            </div>



        </div>
    )
}