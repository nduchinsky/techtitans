import { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import styles from './AddressInputs.module.scss';
import { FaAngleDown } from 'react-icons/fa6';

interface AddressInputProps {
  onSubmit: () => void;
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

    const formData = {
      street1,
      street2,
      city,
      state,
      zip,
    };

    setIsSubmitting(true); // Start loading

    try {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage or wherever it's saved
      const response = await axios.post('http://localhost:3000/api/listings', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in the headers
        },
      });
      console.log('Listing created successfully:', response.data);
      // Reset the form fields after success
      setStreet1('');
      setStreet2('');
      setCity('');
      setState('');
      setZip('');
      onSubmit(); // Call the onSubmit callback to handle the next steps (e.g., close modal)
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
