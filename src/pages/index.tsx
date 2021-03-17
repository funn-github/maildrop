import Dexie from "dexie";
import Head from "next/head";
import { useState } from "react";
import allComponents from "../lib/all";
import { IComponent } from "../lib/types";

export default function Index() {
    const db = new Dexie("maildrop");

    db.version(1).stores({
        pages: "++id,components",
    });

    const [inspectorPanelActive, setInspectorPanelActive] = useState(false);

    const [components, setComponents] = useState<IComponent[]>([]);

    const [activeCategory, setActiveCategory] = useState("");
    const [activeTransform, setActiveTransform] = useState(false);

    return (
        <>
            <Head>
                <title>maildrop</title>
            </Head>
            <div className="root flex flex-col h-screen">
                <header className="flex items-center h-16 p-4 shadow-md z-50">
                    <h2 className="text-xl select-none font-medium">
                        mail<span className="text-blue-500">drop</span>
                    </h2>
                </header>
                <div
                    className="editor set-height flex flex-1"
                    style={{
                        width: inspectorPanelActive ? "calc(100%)" : "calc(100% + 384px)",
                        transition: "0.15s cubic-bezier(0.4, 0, 0.2, 1) width",
                    }}
                >
                    <aside className="components-panel set-height w-96 h-full shadow-md z-10 bg-white overflow-hidden">
                        <div
                            className="flex h-full"
                            style={{
                                width: "calc(384px * 2)",
                                transform: activeTransform ? "translateX(-50%)" : "translateX(0)",
                                transition: "0.25s cubic-bezier(0.4, 0, 0.2, 1) transform",
                            }}
                        >
                            <div className="w-96 h-full p-2 inline-block">
                                <h3 className="text-2xl text-gray-700 p-2">all categories</h3>
                                {[...new Set(allComponents.map(({ category }) => category))].map((category, i) => (
                                    <p
                                        className="cursor-pointer p-2 rounded hover:bg-gray-50"
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setActiveTransform(true);
                                        }}
                                        key={i}
                                    >
                                        {category}
                                    </p>
                                ))}
                            </div>
                            <div className="w-96 h-full p-2 inline-block">
                                <h4
                                    className="text-sm text-gray-400 cursor-pointer"
                                    onClick={() => {
                                        setActiveTransform(false);
                                        setTimeout(() => setActiveCategory(""), 250);
                                    }}
                                >
                                    ← back
                                </h4>
                                {allComponents
                                    .filter(({ category }) => category === activeCategory)
                                    .map(({ name }, i) => (
                                        <div key={i}>{name} name</div>
                                    ))}
                            </div>
                        </div>
                    </aside>
                    <div className="set-height flex-1 bg-gray-100 grid place-items-center overflow-scroll">
                        <div
                            className="page bg-white mx-10"
                            style={{
                                width: "77.2727272727vh",
                                height: "100vh",
                            }}
                        ></div>
                    </div>
                    <aside className="components-panel set-height w-96 h-full shadow-md z-10 p-2 bg-white overflow-scroll"></aside>
                </div>
                <div
                    className="trigger set-height w-1 h-full bg-gray-900 fixed bottom-0 right-0 z-50"
                    onClick={() => setInspectorPanelActive(!inspectorPanelActive)}
                ></div>
            </div>
        </>
    );
}
