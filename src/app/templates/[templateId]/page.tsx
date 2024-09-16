'use client';

import { useEffect, useState } from 'react';
import Error from 'next/error';
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
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTemplateData() {
      try {
        const response = await fetch(`http://localhost:3000/templates/${params.templateId}`);
        if (!response.ok) {
          setError(true);
          return;
        }
        const data = await response.json();
        setTemplate({ name: data.name, description: data.description });
      } catch (error) {
        toast.error('A network error occurred!');
        setError(true);
      }
    }
    fetchTemplateData();
  }, [params.templateId]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!template) {
    return (
      <div className="spinner-container">
        <LiaSpinnerSolid className="spinner" />
      </div>
    );
  }

  return (
    <TemplateContainer
      templateName={template.name}
      templateDescription={template.description}
    />
  );
}
