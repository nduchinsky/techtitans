'use client';

import React, { useState } from 'react';
import styles from './faq.module.scss';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';

const faqs = [
  {
    question: "What is Roarin-Deals?",
    answer:
      "Roarin-Deals is an online marketplace for Mizzou students, by Mizzou students.",
  },
  {
    question: "How do I create an account?",
    answer:
      "You can create an account by clicking on the 'Register' link on the login page and filling out the required information.",
  },
  {
    question: "Is Roarin-Deals available to the general public?",
    answer:
      "No, Roarin-Deals is exclusive to students, faculty, and staff of the University of Missouri System.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach out to our customer support team via the 'Contact Us' page or email us at support@roarin-deals.com.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Currently, all payments are handled between the seller and the buyer. Roarin' Deals does not provide any payment processor.",
  },
];

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <PlainHeader />
      <div className={styles.pageContainer}>
        <div className={styles.faqContainer}>
          <h2 className={styles.faqHeader}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                className={`${styles.faqItem} ${
                  activeIndex === index ? styles.active : ''
                }`}
                key={index}
              >
                <div
                  className={styles.question}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </div>
                <div className={styles.answer}>{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
