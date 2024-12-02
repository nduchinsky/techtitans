// ContactUs.tsx

import React from 'react';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';
import styles from './contactUs.module.scss';

const ContactUs: React.FC = () => {
  return (
    <div>
      <PlainHeader />
      <div className={styles.container}>
        <iframe
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAoNAVQ1UREYwVExINTY2NU5PQTlGSzlaSTQ0MVBORi4u&embed=true"
          className={styles.iframe}
          allowFullScreen
          title="Contact Us Form"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
