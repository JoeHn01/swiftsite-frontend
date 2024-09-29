'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import TemplateGrid from '../../Templates/TemplateGrid/TemplateGrid';
import styles from './Templates.module.css';
import toast from 'react-hot-toast';
import { LiaSpinnerSolid } from "react-icons/lia";
import Error from 'next/error';

interface Template {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('http://localhost:3000/templates/featured');
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

  return (
    <div id="templates" className={styles.templates}>
      <TemplateGrid title="Featured Templates" templates={templates} />
      <div className={styles.buttonContainer}>
        <Link href="templates">
          <Button variant='primary'>Browse All Templates</Button>
        </Link>
      </div>
    </div>
  );
};

export default Templates;
