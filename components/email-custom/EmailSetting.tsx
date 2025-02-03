"use client";
import { useSelectedElement } from "@/app/email-editor/Provider";
import { useEmailTemplate } from "@/app/email-editor/Provider";
import { useState, useEffect } from "react";

const ElementSetting = () => {
    const { selectedElement, setSelectedElement } = useSelectedElement() as { selectedElement: { layout: { id: string }, index: number } | null, setSelectedElement: (element: any) => void };
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    
    const [settings, setSettings] = useState<any>(null);

    // Update settings state when a new element is selected
    useEffect(() => {
        if (selectedElement) {
            setSettings(emailTemplate[selectedElement.layout.id]?.[selectedElement.index] || {});
        }
    }, [selectedElement]);

    if (!selectedElement || !settings) return <div className="p-4">No element selected</div>;

    // Function to update settings
    const updateSetting = (key: string, value: string) => {
        setSettings((prev: any) => ({ ...prev, [key]: value }));

        // Update emailTemplate state
        setEmailTemplate((prevTemplate: any) =>
            prevTemplate.map((col: any) =>
                col.id === selectedElement.layout.id
                    ? { ...col, [selectedElement.index]: { ...col[selectedElement.index], [key]: value } }
                    : col
            )
        );
    };

    return (
        <div className="w-full p-4  ">
            <h2 className="text-lg font-semibold">Element Settings</h2>
            
            {settings.type === "text" && (
                <>
                    <label className="block mt-2">Text Content:</label>
                    <textarea
                        className="w-full p-2 border"
                        value={settings.content || ""}
                        onChange={(e) => updateSetting("content", e.target.value)}
                    />

                    <label className="block mt-2">Font Size:</label>
                    <input
                        type="number"
                        className="w-full p-2 border"
                        value={settings.style?.fontSize || 16}
                        onChange={(e) => updateSetting("style", { ...settings.style, fontSize: e.target.value + "px" })}
                    />
                    
                    <label className="block mt-2">Text Color:</label>
                    <input
                        type="color"
                        className="w-full p-2 border"
                        value={settings.style?.color || "#333"}
                        onChange={(e) => updateSetting("style", { ...settings.style, color: e.target.value })}
                    />
                </>
            )}

            {settings.type === "button" && (
                <>
                    <label className="block mt-2">Button Text:</label>
                    <input
                        type="text"
                        className="w-full p-2 border"
                        value={settings.content || ""}
                        onChange={(e) => updateSetting("content", e.target.value)}
                    />

                    <label className="block mt-2">Button Color:</label>
                    <input
                        type="color"
                        className="w-full p-2 border"
                        value={settings.style?.backgroundColor || "#007BFF"}
                        onChange={(e) => updateSetting("style", { ...settings.style, backgroundColor: e.target.value })}
                    />
                    
                    <label className="block mt-2">Button URL:</label>
                    <input
                        type="text"
                        className="w-full p-2 border"
                        value={settings.url || ""}
                        onChange={(e) => updateSetting("url", e.target.value)}
                    />
                </>
            )}

            {settings.type === "image" && (
                <>
                    <label className="block mt-2">Image URL:</label>
                    <input
                        type="text"
                        className="w-full p-2 border"
                        value={settings.imageUrl || ""}
                        onChange={(e) => updateSetting("imageUrl", e.target.value)}
                    />
                    
                    <label className="block mt-2">Width:</label>
                    <input
                        type="number"
                        className="w-full p-2 border"
                        value={settings.style?.width.replace("px", "") || 100}
                        onChange={(e) => updateSetting("style", { ...settings.style, width: e.target.value + "px" })}
                    />
                </>
            )}

            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white"
                onClick={() => setSelectedElement(null)}
            >
                Close
            </button>
        </div>
    );
};

export default ElementSetting;
