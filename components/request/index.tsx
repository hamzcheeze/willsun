'use client';

import { FC, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from './request.module.css';
import { useCaseStore } from "@/stores/caseStore";

const THAI_MONTHS = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
];

export const RequestForm = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const { formData, setFormData } = useCaseStore()
    const caseData = formData;

    const idNumber = caseData?.idNumber.split('') || [];
    const removeZero = caseData?.birthDate?.replace(/-0+/g, '-');
    const today = new Date();

    const calculateAge = (birthDate: string) => {
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };
    const age = caseData?.birthDate ? calculateAge(caseData.birthDate) : '';

    let [birthYear, birthMonth, birthDay] = removeZero?.split('-') || [];
    birthMonth = THAI_MONTHS[parseInt(birthMonth) - 1] || '';
    birthYear = birthYear ? (parseInt(birthYear) + 543).toString() : '';

    const nowDay = today.getDate();
    const nowMonth = today.getMonth() + 1;
    const nowThaiMonth = THAI_MONTHS[nowMonth - 1] || '';
    const nowYear = today.getFullYear() + 543;

    // const [inputValue, setInputValue] = useState('');
    // const maxLength = 50;
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputValue(event.target.value);
    // };

    return (
        <>
            {/* <br /> */}
            <button onClick={() => reactToPrintFn()}>Print</button>
            <div ref={contentRef} className={styles.page}>
                <div className={styles.row}>
                    <div className={styles.leftColumn}>
                        <div className={styles.gridContainer2left}>
                            <div></div>
                            <div className={styles.circle}>⃝</div>
                            <div className={styles.title}>(๗)</div>
                            <div></div>
                            <div></div>
                            <div className={styles.title}>คำร้อง</div>
                            <div className={styles.title}></div>
                            <div className={styles.title}></div>
                            <div className={styles.title}>ขอให้ศาลมีคำสั่งตั้งผู้ร้องเป็น</div>
                            <div className={styles.title}></div>
                            <div className={styles.title}></div>
                            <div className={styles.title}>ผู้จัดการมรดก (โดยไม่มีพินัยกรรม)</div>
                        </div>
                    </div>
                    <div>
                        <img src="/symbol.png" alt="Symbol" className={styles.symbol} />
                    </div>
                    <div className={styles.rightColumn}>
                        <div className={styles.caseNumber}>
                            <div className={styles.title}>คดีหมายเลขดำที่</div>
                            <div className={styles.dashedLine}>
                                {caseData?.blackCase}/{caseData?.year}
                            </div>
                            {/* <div className={styles.dashedLine}><center>{caseData.year = "67" ? "๖๗" : "xxx"}</center></div> */}
                            <div className={styles.title}>คดีหมายเลขแดงที่</div>
                            <div className={styles.dashedLine}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.col2}>
                        <div className={styles.title}>ศาล</div>
                        <div className={styles.dashedLine}>
                            <div className={styles.courtData}>{caseData?.courtName}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.date}>
                        <div></div>
                        <div className={styles.title}>วันที่</div>
                        <div className={styles.dashedLine}>{nowDay}</div>
                        <div className={styles.title}>เดือน</div>
                        <div className={styles.dashedLine}>{nowThaiMonth}</div>
                        <div className={styles.title}>พุทธศักราช</div>
                        <div className={styles.dashedLine}>{nowYear}</div>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.col2}>
                        <div className={styles.title}>ความ</div>
                        <div className={styles.dashedLine}>
                            <div className={styles.courtData}>{caseData?.content}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.gridBetween}>
                    <div id={styles.item1} className={styles.betweenTitle}>ระหว่าง</div>
                    <div id={styles.item2}>
                        <img src="/curly-bracket.jpg" alt="Symbol" className={styles.bracket} />
                    </div>
                    <div id="item3"></div>
                    <div id="item4"></div>
                    <div id="item5" className={styles.dashedLineLeft}>
                        {/* {caseData?.plaintiff}{caseData?.plaintiff.length} */}
                    </div>
                    <div id="item6" className={styles.title}>โจทก์</div>
                    <div className={styles.dashedLineLeft}>
                        {caseData?.title}{caseData?.firstName} {caseData?.lastName} ร้องขอให้ศาลมีคำสั่งตั้งผู้ร้องเป็นผู้จัดการมรดกของ นางรี จอยซ์ (โดยไม่มีพินัยกรรม)
                    </div>
                    <div id="appellant" className={styles.title}>ผู้ร้อง</div>
                    <div id={styles.canHide} className={styles.dashedLineLeft}></div>
                    <div id={styles.canHide} className={styles.title}></div>
                    <div id="item11" className={styles.dashedLineLeft}></div>
                    <div id="item12" className={styles.title}>จำเลย</div>
                </div>
                <br />
                <div className={styles.rightColumn}>
                    <div id={styles.col3Tab}>
                        <div></div>
                        <div className={styles.title}>ข้าพเจ้า</div>
                        <div className={styles.dashedLine}>
                            <div className={styles.courtData}>
                                {caseData?.title}{caseData?.firstName} {caseData?.lastName}
                            </div>
                        </div>
                    </div>
                </div>

                <div id={styles.idNumber}>
                    <div className={styles.title}>เลขประจำตัวประชาชน</div>
                    <div id={styles.idBox}>{idNumber?.[0] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[1] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[2] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[3] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[4] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[5] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[6] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[7] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[8] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[9] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[10] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[11] || '9'}</div>
                    <div id={styles.idBox}>{idNumber?.[12] || '9'}</div>
                    <div className={styles.title}>ผู้ร้อง</div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.race}>
                        <div className={styles.title}>เชื้อชาติ</div>
                        <div className={styles.dashedLine}>{caseData?.race}</div>
                        <div className={styles.title}>สัญชาติ</div>
                        <div className={styles.dashedLine}>{caseData?.nationality}</div>
                        <div className={styles.title}>อาชีพ</div>
                        <div className={styles.dashedLine}>{caseData?.occupation}</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.birthdate}>
                        <div className={styles.title}>เกิดวันที่</div>
                        <div className={styles.dashedLine}>{birthDay}</div>
                        <div className={styles.title}>เดือน</div>
                        <div className={styles.dashedLine}>{birthMonth}</div>
                        <div className={styles.title}>พ.ศ.</div>
                        <div className={styles.dashedLine}>{birthYear}</div>
                        <div className={styles.title}>อายุ</div>
                        <div className={styles.dashedLine}>{age}</div>
                        <div className={styles.title}>ปี</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>อยู่บ้านเลขที่</div>
                        <div className={styles.dashedLine}>{caseData?.address}</div>
                        <div className={styles.title}>หมู่ที่</div>
                        <div className={styles.dashedLine}>{caseData?.villageNo}</div>
                        <div className={styles.title}>ถนน</div>
                        <div className={styles.dashedLine}>{caseData?.road}</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>ตรอก/ซอย</div>
                        <div className={styles.dashedLine}>{caseData?.alley}</div>
                        <div className={styles.title}>ตำบล/แขวง</div>
                        <div className={styles.dashedLine}>{caseData?.subDistrict}</div>
                        <div className={styles.title}>อำเภอ/เขต</div>
                        <div className={styles.dashedLine}>{caseData?.district}</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>จังหวัด</div>
                        <div className={styles.dashedLine}>{caseData?.province}</div>
                        <div className={styles.title}>รหัสไปรษณีย์</div>
                        <div className={styles.dashedLine}>{caseData?.postalCode}</div>
                        <div className={styles.title}>โทรศัพท์</div>
                        <div className={styles.dashedLine}>{caseData?.tel}</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.fax}>
                        <div className={styles.title}>โทรสาร</div>
                        <div className={styles.dashedLine}>{caseData?.fax}</div>
                        <div className={styles.title}>ไปรษณีย์อิเล็กทรอนิกส์</div>
                        <div className={styles.dashedLine}>{caseData?.email}</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div className={styles.title}>ขอยื่นคำร้อง มีข้อความที่จะกล่าวต่อไปนี้</div>
                    <div id={styles.blankSpace}>
                        <div className={styles.dashedLine}>1</div>
                        <div className={styles.dashedLine}>2</div>
                        <div className={styles.dashedLine}>3</div>
                        <div className={styles.dashedLine}>4</div>
                        <div className={styles.dashedLine}>1</div>
                        <div className={styles.dashedLine}>2</div>
                        <div className={styles.dashedLine}>3</div>
                        <div className={styles.dashedLine}>4</div>
                        <div className={styles.dashedLine}>1</div>
                        <div className={styles.dashedLine}>2</div>
                        <div className={styles.dashedLine}>3</div>
                        <div className={styles.dashedLine}>4</div>
                        <div className={styles.dashedLine}>1</div>
                        <div className={styles.dashedLine}>2</div>
                        <div className={styles.dashedLine}>3</div>
                        <div className={styles.dashedLine}>4</div>
                        <div className={styles.dashedLine}>1</div>
                        <div className={styles.dashedLine}>2</div>
                        <div className={styles.dashedLine}>3</div>
                        <div className={styles.dashedLine}>4</div>
                        <div className={styles.dashedLine}>1</div>
                        <div className={styles.dashedLine}>2</div>
                        <div className={styles.dashedLine}>3</div>
                        <div className={styles.dashedLine}>4</div>
                        <div className={styles.dashedLine}>1</div>
                        <div className={styles.dashedLine}>2</div>
                        <div className={styles.dashedLine}>3</div>
                        <div className={styles.dashedLine}>4</div>
                        <div className={styles.dashedLine}>1</div>
                        <div className={styles.dashedLine}>2</div>
                        <div className={styles.dashedLine}>3</div>
                        <div className={styles.dashedLine}>4</div>
                    </div>
                </div>
            </div>
        </>
    );
};
