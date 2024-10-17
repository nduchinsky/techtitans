import { useState } from 'react';
import styles from './PopupInputs.module.scss'

interface PopupInputsProps{
  onClick: () => void;
}

const PopupInputs: React.FC<PopupInputsProps> = ({ onClick }) => {

  // States to hold input values
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      price,
    };
    
    // Resetting form fields
    setName('');
    setDescription('');
    setPrice('');
  };
    return(
      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <input
              type="text"
              id="name"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div>
            <input
              type="text"
              id="description"
              value={description}
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div>
            <input
              type="number"
              id="price"
              value={price}
              placeholder='Selling Price'
              onChange={(e) => setPrice(e.target.value)}
              required
              className={styles.input}
            />
          </div>
      </form>
      <div className={styles.tagsContainer}>
        <p className={styles.tagsContainerLabel}>Apply relevant tags</p>
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitButton} onClick={onClick}>
          Save and Upload
        </button>
      </div>
    </div>
  );
}

export default PopupInputs;