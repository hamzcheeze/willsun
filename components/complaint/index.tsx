'use client';

import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
import styles from './complaint.module.css';

interface CaseData {
    black: string;
    year: string;
    courtName: string;
    content: string;
    plaintiff: string;
}

// Define props interface for the component
interface A4pageProps {
    caseData?: CaseData;
}

export const Complaint: React.FC<A4pageProps> = ({ caseData }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    // const reactToPrintFn = useReactToPrint({ contentRef });
    // const [inputValue, setInputValue] = useState('');
    // const maxLength = 50;
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputValue(event.target.value);
    // };

    return (
<>
            {/* <button onClick={() => reactToPrintFn()}>Print</button> */}
            <div ref={contentRef} className={styles.page}>
                <div className={styles.row}>
                    <div className={styles.leftColumn}>
                        <div className={styles.gridContainer2left}>
                            <div></div>
                            <div className={styles.circle}>⃝</div>
                            <div className={styles.title}>(๔)</div>
                            <div></div>
                            <div></div>
                            <div className={styles.title}>คำฟ้อง</div>
                            <div></div>
                        </div>
                    </div>
                    <div>
                        <img src="/symbol.png" alt="Symbol" className={styles.symbol} />
                    </div>
                    <div className={styles.rightColumn}>
                        <div className={styles.caseNumber}>
                            <div className={styles.title}>คดีหมายเลขดำที่</div>
                            <div className={styles.dashedLine}>
                                {caseData?.black}/{caseData?.year}
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
                        <div className={styles.dashedLine}>
                        </div>
                        <div className={styles.title}>เดือน</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>พุทธศักราช</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.col2}>
                        <div className={styles.title}>ความ</div>
                        <div className={styles.dashedLine}>
                            <div className={styles.courtData}>{caseData?.content}</div>
                            {/* <form>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    maxLength={maxLength}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            </form> */}
                        </div>
                    </div>
                </div>

                <div className={styles.gridBetween}>
                    <div id={styles.item1} className={styles.betweenTitle}>ระหว่าง</div>
                    <div id={styles.item2} >
                        <img src="/bracket.jpg" alt="Symbol" className={styles.bracket} />
                    </div>
                    <div id="item3"></div>
                    <div id="item4"></div>
                    <div id="item5" className={styles.dashedLineLeft}>
                        {caseData?.plaintiff}{caseData?.plaintiff.length}
                    </div>
                    <div id="item6" className={styles.title}>โจทก์</div>
                    <div id={styles.canHide} className={styles.dashedLineLeft}></div>
                    <div id={styles.canHide} className={styles.title}>ผู้ร้อง</div>
                    <div id={styles.canHide} className={styles.dashedLineLeft}></div>
                    <div id={styles.canHide} className={styles.title}>ผู้คัดค้าน</div>
                    <div id="item11" className={styles.dashedLineLeft}></div>
                    <div id="item12" className={styles.title}>จำเลย</div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.charge}>
                        <div className={styles.title}>ข้อหาหรือฐานความผิด</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.amount}>
                        <div className={styles.title}>จำนวนทุนทรัพย์</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>บาท</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>สตางค์</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.col3Tab}>
                        <div></div>
                        <div className={styles.title}>ข้าพเจ้า</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div id={styles.idNumber}>
                    <div className={styles.title}>เลขประจำตัวประชาชน</div>
                    <div id={styles.idBox}>1</div>
                    <div id={styles.idBox}>5</div>
                    <div id={styles.idBox}>2</div>
                    <div id={styles.idBox}>9</div>
                    <div id={styles.idBox}>9</div>
                    <div id={styles.idBox}>0</div>
                    <div id={styles.idBox}>0</div>
                    <div id={styles.idBox}>5</div>
                    <div id={styles.idBox}>1</div>
                    <div id={styles.idBox}>9</div>
                    <div id={styles.idBox}>5</div>
                    <div id={styles.idBox}>1</div>
                    <div id={styles.idBox}>9</div>
                    <div className={styles.title}>โจทก์</div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.race}>
                        <div className={styles.title}>เชื้อชาติ</div>
                        <div className={styles.dashedLine}>ไทย</div>
                        <div className={styles.title}>สัญชาติ</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>อาชีพ</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>อายุ</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>ปี</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>อยู่บ้านเลขที่</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>หมู่ที่</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>ถนน</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>ตรอก/ซอย</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>ตำบล/แขวง</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>อำเภอ/เขต</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>จังหวัด</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>รหัสไปรษณีย์</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>โทรศัพท์</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.fax}>
                        <div className={styles.title}>โทรสาร</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>ไปรษณีย์อิเล็กทรอนิกส์</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.col3Tab}>
                        <div></div>
                        <div className={styles.title}>ขอยื่นฟ้อง</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>
                <div className={styles.leftColumn}>
                    <div id={styles.blankSpace}>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div id={styles.idNumber}>
                    <div className={styles.title}>เลขประจำตัวประชาชน</div>
                    <div id={styles.idBox}>1</div>
                    <div id={styles.idBox}>5</div>
                    <div id={styles.idBox}>2</div>
                    <div id={styles.idBox}>9</div>
                    <div id={styles.idBox}>9</div>
                    <div id={styles.idBox}>0</div>
                    <div id={styles.idBox}>0</div>
                    <div id={styles.idBox}>0</div>
                    <div id={styles.idBox}>1</div>
                    <div id={styles.idBox}>4</div>
                    <div id={styles.idBox}>4</div>
                    <div id={styles.idBox}>1</div>
                    <div id={styles.idBox}>4</div>
                    <div className={styles.title}>จำเลย</div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.race}>
                        <div className={styles.title}>เชื้อชาติ</div>
                        <div className={styles.dashedLine}>ไทย</div>
                        <div className={styles.title}>สัญชาติ</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>อาชีพ</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>อายุ</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>ปี</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>อยู่บ้านเลขที่</div>
                        <div className={styles.dashedLine}>3/8 หมู่บ้านนักกีฬากรุงเทพมหานครอมรรัตนโกสินทร์</div>
                        <div className={styles.title}>หมู่ที่</div>
                        <div className={styles.dashedLine}>-</div>
                        <div className={styles.title}>ถนน</div>
                        <div className={styles.dashedLine}>จรัญสนิทวงศ์</div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>ตรอก/ซอย</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>ตำบล/แขวง</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>อำเภอ/เขต</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.address}>
                        <div className={styles.title}>จังหวัด</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>รหัสไปรษณีย์</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>โทรศัพท์</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div className={styles.leftColumn}>
                    <div id={styles.fax}>
                        <div className={styles.title}>โทรสาร</div>
                        <div className={styles.dashedLine}></div>
                        <div className={styles.title}>ไปรษณีย์อิเล็กทรอนิกส์</div>
                        <div className={styles.dashedLine}></div>
                    </div>
                </div>

                <div id={styles.purpose}>
                    <div className={styles.title}>มีข้อความที่จะกล่าวต่อไปนี้</div>
                </div>


            </div>
        </>
    );
};
