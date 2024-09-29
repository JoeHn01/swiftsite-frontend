'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactPopup.module.css';
import toast from 'react-hot-toast';
import Button from '@/components/Button/Button';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .required('Message is required'),
  });

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
    toast.success('Message sent successfully!')
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Contact Us</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <Field type="text" name="name" id="name" className={styles.input} />
                <div className={styles.errorContainer}>
                  <ErrorMessage name="name" component="div" className={styles.error} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <Field type="email" name="email" id="email" className={styles.input} />
                <div className={styles.errorContainer}>
                  <ErrorMessage name="email" component="div" className={styles.error} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <Field as="textarea" name="message" id="message" className={styles.textarea} />
                <div className={styles.errorContainer}>
                  <ErrorMessage name="message" component="div" className={styles.error} />
                </div>
              </div>
              <Button variant='primary' type="submit">Send</Button>
            </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ContactPopup;
