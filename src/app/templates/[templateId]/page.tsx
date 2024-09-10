'use client'

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LiaSpinnerSolid } from "react-icons/lia";
import TemplateContainer from "@/components/Templates/TemplateContainer/TemplateContainer";

interface TemplateData {
    name: string;
    description: string;
}

export default function TemplateView({
    params,
}: { params: { templateId: string } }) {
    const [template, setTemplate] = useState<TemplateData | null>(null);

    useEffect(() => {
        async function fetchTemplateData() {
            try {
                const response = await fetch(`http://localhost:3000/templates/${params.templateId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(`Error: ${errorData.message}`);
                }
                const data = await response.json();
                setTemplate({ name: data.name, description: data.description });
            } catch (error) {
                toast.error('A network error occured!');
            }
        }
        fetchTemplateData();
    }, [params.templateId]);

    if (!template) {
        return (
            <div className="spinner-container">
                <LiaSpinnerSolid className="spinner" />
            </div>
        );
    }

    return (
        <TemplateContainer templateName={template.name} templateDescription={template.description} />
    );
};
