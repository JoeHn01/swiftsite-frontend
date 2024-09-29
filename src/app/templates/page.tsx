'use client';

import React, { useEffect, useState } from 'react';
import Error from 'next/error';
import Hero from "@/components/Templates/Hero/Hero";
import styles from "../page.module.css";
import { LiaSpinnerSolid } from "react-icons/lia";
import TemplateGrid from "@/components/Templates/TemplateGrid/TemplateGrid";
import toast from 'react-hot-toast';

type Template = {
  _id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
};

type Category = {
  _id: string;
  name: string;
};

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('http://localhost:3000/templates');
        if (!response.ok) {
          setError(true);
          return;
        }
        const data = await response.json();
        setTemplates(data);
      } catch {
        toast.error('A network error occurred!');
        setError(true);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const uniqueCategoryIds = Array.from(new Set(templates.map(template => template.categoryId)));

    const fetchCategoryNames = async () => {
      const categoryData: { [key: string]: string } = {};

      for (const categoryId of uniqueCategoryIds) {
        try {
          const response = await fetch(`http://localhost:3000/categories/${categoryId}`);
          if (response.ok) {
            const data: Category = await response.json();
            categoryData[categoryId] = data.name;
          } else {
            toast.error(`Failed to fetch category with id: ${categoryId}`);
          }
        } catch (error) {
          toast.error(`Error fetching category: ${categoryId}`);
        }
      }

      setCategories(categoryData);
    };

    if (templates.length > 0) {
      fetchCategoryNames();
    }
  }, [templates]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (templates.length === 0) {
    return (
      <div className="spinner-container">
        <LiaSpinnerSolid className="spinner" />
      </div>
    );
  }

  const uniqueCategoryIds = Array.from(new Set(templates.map(template => template.categoryId)));

  return (
    <main className={styles.main}>
      <Hero />
      {uniqueCategoryIds.map(categoryId => (
        <TemplateGrid
          key={categoryId}
          title={`${categories[categoryId]} Templates`}
          templates={templates.filter(template => template.categoryId === categoryId)}
        />
      ))}
    </main>
  );
}
