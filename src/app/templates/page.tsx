'use client'

import React, { useEffect, useState } from 'react';
import Hero from "@/components/Templates/Hero/Hero";
import styles from "../page.module.css";
import { LiaSpinnerSolid } from "react-icons/lia";
import TemplateGrid from "@/components/Templates/TemplateGrid/TemplateGrid";

type Template = {
  _id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
};

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('http://localhost:3000/templates');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <LiaSpinnerSolid className="spinner" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const categories = Array.from(new Set(templates.map(template => template.categoryId)));

  return (
    <main className={styles.main}>
      <Hero />
      {categories.map(category => (
        <TemplateGrid
          key={category}
          title={`${category} Templates`}
          templates={templates.filter(template => template.categoryId === category)}
        />
      ))}
    </main>
  );
}
