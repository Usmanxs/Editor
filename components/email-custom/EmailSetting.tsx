"use client";
import { useSelectedElement } from "@/app/email-editor/Provider";
import { useEmailTemplate } from "@/app/email-editor/Provider";
import { useState, useEffect } from "react";

const ElementSetting = () => {
    const { selectedElement, setSelectedElement } = useSelectedElement() as { 
        selectedElement: { layout?: { id?: any }, index: number } | null, 
        setSelectedElement: (element: any) => any 
    };
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    
    const [settings, setSettings] = useState<any>(null);

    // Update settings state when a new element is selected
    useEffect(() => {
        if (!selectedElement?.layout?.id) {
            setSettings(null);
            return;
        }

        // Find the selected element in emailTemplate
        const foundElement = emailTemplate.find(
            (el: { id: number }) => el.id === selectedElement.layout?.id
        );

        if (foundElement) {
            setSettings(foundElement[selectedElement.index] || {});
            console.log("Found Element:", foundElement);
        } else {
            setSettings(null);
        }
    }, [selectedElement, emailTemplate]);

    if (!selectedElement || !settings) return <div className="p-4 text-lg font-bold">No element selected</div>;

    // Function to update settings
    const updateSetting = (key: string, value: any) => {
        setSettings((prev: any) => ({ ...prev, [key]: value }));

        // Update emailTemplate state
        setEmailTemplate((prevTemplate: any) =>
            prevTemplate.map((col: any) =>
                col.id === selectedElement.layout?.id
                    ? { ...col, [selectedElement.index]: { ...col[selectedElement.index], [key]: value } }
                    : col
            )
        );
    };

    // Function to handle image uploads
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                updateSetting("imageUrl", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-lg font-bold">Element Settings</h2>

            {/* Background Color */}
            <label className="block mt-2">Background Color:</label>
            <input
                type="color"
                className="w-full p-2 border"
                value={settings.style?.backgroundColor || "#ffffff"}
                onChange={(e) => updateSetting("style", { ...settings.style, backgroundColor: e.target.value })}
            />

            {/* Text Content */}
            {settings.type === "text" && (
                <>
                    <label className="block mt-2">Text Content:</label>
                    <textarea
                        className="w-full p-2 border"
                        value={settings.content || ""}
                        onChange={(e) => updateSetting("content", e.target.value)}
                    />

                    <label className="block mt-2">Font Size (px):</label>
                    <input
                        type="number"
                        className="w-full p-2 border"
                        value={parseInt(settings.style?.fontSize) || 16}
                        onChange={(e) => updateSetting("style", { ...settings.style, fontSize: `${e.target.value}px` })}
                    />

                    <label className="block mt-2">Text Color:</label>
                    <input
                        type="color"
                        className="w-full p-2 border"
                        value={settings.style?.color || "#333"}
                        onChange={(e) => updateSetting("style", { ...settings.style, color: e.target.value })}
                    />

                    <label className="block mt-2">Text Alignment:</label>
                    <select
                        className="w-full p-2 border"
                        value={settings.style?.textAlign || "left"}
                        onChange={(e) => updateSetting("style", { ...settings.style, textAlign: e.target.value })}
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </>
            )}

            {/* Button Settings */}
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
                </>
            )}

            {/* Image & Logo Settings */}
            {settings.type === "image" || settings.type === "logo" ? (
                <>
                    <label className="block mt-2">Image URL:</label>
                    <input
                        type="text"
                        className="w-full p-2 border"
                        value={settings.imageUrl || ""}
                        onChange={(e) => updateSetting("imageUrl", e.target.value)}
                    />

                    <label className="block mt-2">Upload Image:</label>
                    <input type="file" className="w-full p-2 border" accept="image/*" onChange={handleImageUpload} />

                    <label className="block mt-2">Width (px):</label>
                    <input
                        type="number"
                        className="w-full p-2 border"
                        value={parseInt(settings.style?.width) || 80}
                        onChange={(e) => updateSetting("style", { ...settings.style, width: `${e.target.value}px` })}
                    />
                </>
            ) : null}

            {/* Divider Settings */}
            {settings.type === "divider" && (
                <>
                    <label className="block mt-2">Divider Color:</label>
                    <input
                        type="color"
                        className="w-full p-2 border"
                        value={settings.style?.borderTop?.split(" ")[2] || "#000000"}
                        onChange={(e) => updateSetting("style", { ...settings.style, borderTop: `2px solid ${e.target.value}` })}
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
