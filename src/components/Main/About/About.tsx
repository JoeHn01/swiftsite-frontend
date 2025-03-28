'use client'

import React, { useState } from 'react';
import styles from './About.module.css';
import Button from '@/components/Button/Button';
import ContactPopup from '@/components/Main/About/ContactPopup/ContactPopup';

const About: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const teamMembers = [
    { name: 'John Doe', title: 'Founder & CEO', image: 'ceo.jpg' },
    { name: 'Jane Smith', title: 'Marketing Director', image: 'md.jpg' },
  ];

  return (
    <div id="about" className={styles.about}>
      <div className={styles.aboutContent}>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <p className={styles.aboutDescription}>
          We are a team of passionate individuals dedicated to our company mission. We have a combined experience of 10 years in the software industry, and we are committed to providing our clients with the highest quality of service.
        </p>
      </div>
      <div className={styles.aboutTeam}>
        <h2>Our Team</h2>
        <div className={styles.team}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <img src={member.image} alt={`Team Member ${index + 1}`} className={styles.teamImage} />
              <h3 className={styles.teamMemberName}>{member.name}</h3>
              <p className={styles.teamMemberTitle}>{member.title}</p>
            </div>
          ))}
        </div>
        <Button variant='primary' onClick={() => setPopupOpen(true)}>Contact Us Today</Button>
      </div>
      <ContactPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

export default About;
