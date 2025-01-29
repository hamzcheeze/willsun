'use client';

import { motion } from "framer-motion";
import NavLink from "./NavLink";

export default function Hero() {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: i * 0.5, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: i * 0.5, duration: 0.01 },
            },
        }),
    };

    const image: React.CSSProperties = {
        maxWidth: "80vw",
    }

    const shape: React.CSSProperties = {
        strokeWidth: 10,
        strokeLinecap: "round",
        fill: "transparent",
    }

    return (
        <section>
            <div className="custom-screen pt-28 text-gray-600">
                <div className="space-y-5 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl">
                        สร้างเอกสารจัดการมรดก
                        <br />
                        ได้ด้วยตัวคุณเอง
                    </h1>
                    <p className="max-w-xl mx-auto">
                        ลดเวลา ลดความยุ่งยาก ด้วยระบบอัตโนมัติที่ช่วยจัดการเอกสารกฎหมายอย่างมืออาชีพ ประหยัดค่าใช้จ่ายและถูกต้องตามข้อกำหนดของศาลไทย
                    </p>
                    <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
                        <NavLink
                            href="/start"
                            className="text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 text-lg"
                        >
                            เริ่มต้นใช้งาน
                        </NavLink>
                        <NavLink
                            href="#"
                            className="text-gray-700 border hover:bg-gray-50 text-lg"
                            scroll={false}
                        >
                            ข้อกำหนด
                        </NavLink>
                    </div>
                    <div className="flex items-center justify-center">
                        <motion.svg
                            width="900"
                            height="900"
                            viewBox="-100 0 600 600"
                            initial="hidden"
                            animate="visible"
                            style={image}
                        >
                            <motion.path
                                d="M 100 50 h 200 v 300 h -200 v -300"
                                stroke="#000000"
                                variants={draw}
                                custom={1}
                                rx={30}
                                style={shape}
                            />

                            {/* Document lines */}
                            <motion.line
                                x1="120"
                                y1="80"
                                x2="280"
                                y2="80"
                                stroke="#000000"
                                variants={draw}
                                custom={2.75}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="100"
                                x2="280"
                                y2="100"
                                stroke="#000000"
                                variants={draw}
                                custom={3}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="125"
                                x2="280"
                                y2="125"
                                stroke="#000000"
                                variants={draw}
                                custom={3.25}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="150"
                                x2="280"
                                y2="150"
                                stroke="#000000"
                                variants={draw}
                                custom={3.5}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="175"
                                x2="280"
                                y2="175"
                                stroke="#000000"
                                variants={draw}
                                custom={3.75}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="200"
                                x2="280"
                                y2="200"
                                stroke="#000000"
                                variants={draw}
                                custom={4}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="225"
                                x2="280"
                                y2="225"
                                stroke="#000000"
                                variants={draw}
                                custom={4.25}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="250"
                                x2="280"
                                y2="250"
                                stroke="#000000"
                                variants={draw}
                                custom={4.5}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="275"
                                x2="280"
                                y2="275"
                                stroke="#000000"
                                variants={draw}
                                custom={4.75}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="300"
                                x2="280"
                                y2="300"
                                stroke="#000000"
                                variants={draw}
                                custom={5}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                            <motion.line
                                x1="120"
                                y1="325"
                                x2="280"
                                y2="325"
                                stroke="#000000"
                                variants={draw}
                                custom={5.25}
                                style={{
                                    strokeWidth: 2,
                                    strokeLinecap: "round",
                                }}
                            />
                        </motion.svg>
                    </div>
                </div>
            </div>
        </section>
    );
}