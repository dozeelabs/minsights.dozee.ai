import React, { useState } from "react";
import Link from "next/link";

type Props = {
    operatorName: string;
    tabs: { tabTitle: string; tabPath: string }[];

};
function LeftMenu({ operatorName, tabs }: Props) {
    const [menu, setMenu] = useState(false);

    return (
        <>
            <div className="left-2	absolute">
                <span
                    className="text-white p-2 cursor-pointer"
                    onClick={() => {
                        setMenu(true);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-12"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </div>
            <aside
                className={`fixed top-0  w-[200px] h-full z-50 bg-white shadow-lg p-2 duration-300  ${menu ? "left-[0px]" : "left-[-210px]"
                    }`}>
                <div className="flex flex-col ">
                    <div className="p-1 flex justify-end ">
                        <button
                            className="cursor-pointer "
                            onClick={() => setMenu(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="p-1">
                        <p className="font-semibold text-lg">
                            Hello {operatorName ? operatorName : ''},
                        </p>
                    </div>
                    <div
                        className="p-1 flex flex-col gap-4 mt-12 mb-12"
                        onClick={() => setMenu(false)}>
                        {tabs.map((tab, index) => {
                            return (
                                <span
                                    key={index}
                                    className="font-semibold text-lg bg-blue-theme  rounded-lg p-2 text-center cursor-pointer">
                                    <Link href={tab.tabPath}>{tab.tabTitle}</Link>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </aside>
        </>
    );
}
export default LeftMenu;
