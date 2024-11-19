import { useState } from 'react';
import styles from './AddressInputs.module.scss';

interface PopupInputsProps {
  onClick: () => void;
}

const AddressInputs: React.FC<PopupInputsProps> = ({ onClick }) => {
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handlePageTwoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      street1,
      street2,
      city,
      state,
      zip
    };

    setStreet1('');
    setStreet2('');
    setCity('');
    setState('');
    setZip('');
    onClick();
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handlePageTwoSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="street1"
            placeholder="Address Line 1"
            value={street1}
            onChange={(e) => setStreet1(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            id="street2"
            value={street2}
            placeholder="Address Line 2"
            onChange={(e) => setStreet2(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            id="city"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputContainer}>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          >
          <option value="" disabled>State</option>
          <option value="MO">MO</option>
        </select>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="number"
            id="zip"
            value={zip}
            placeholder="ZIP"
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Save & Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressInputs;
