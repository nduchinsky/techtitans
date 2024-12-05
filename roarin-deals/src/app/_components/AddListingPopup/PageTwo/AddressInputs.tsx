import { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import styles from './AddressInputs.module.scss';
import { FaAngleDown } from 'react-icons/fa6';

interface AddressInputProps {
  onSubmit: (addressData: {
    address1: string;
    address2: string | null;
    city: string;
    state: string;
    zip: string;
  }) => void;
}

const AddressInputs: React.FC<AddressInputProps> = ({ onSubmit }) => {
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state for submit button

  const handlePageTwoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const addressData = {
      address1: street1,
      address2: street2 || null, // Ensure address2 can be null
      city: city,
      state: state,
      zip: zip,
    };

    console.log('Address data being sent:', addressData); // Log the address data

    setIsSubmitting(true); // Start loading

    try {
      // Pass the address data to the parent component
      onSubmit(addressData);
    } catch (error) {
      console.error('Error creating listing:', error);
      // Handle error (e.g., show a message to the user)
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headers}>
        <h2 className={styles.headerOne}>Please input the desired pick up address</h2>
        <h3 className={styles.headerTwo}>Potential buyers will only be able to see the ZIP code radius</h3>
      </div>
      <form onSubmit={handlePageTwoSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="street1"
            placeholder="Address Line 1"
            value={street1}
            onChange={(e) => setStreet1(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="street2"
            value={street2}
            placeholder="Address Line 2"
            onChange={(e) => setStreet2(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.lineThree}>
          <input
            type="text"
            id="city"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            required
            className={styles.cityInput}
          />

          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className={styles.stateInput}
          >
            <option value="" disabled>
              State
            </option>
            <option value="MO">MO</option>
          </select>
          <FaAngleDown className={styles.stateIcon} />
        </div>

        <div className={styles.inputContainer}>
          <input
            type="number"
            id="zip"
            value={zip}
            placeholder="ZIP"
            onChange={(e) => setZip(e.target.value)}
            required
            className={styles.zipInput}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressInputs;
