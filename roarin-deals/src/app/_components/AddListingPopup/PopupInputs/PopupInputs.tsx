import { useState } from 'react';
import styles from './PopupInputs.module.scss';

interface PopupInputsProps {
  onClick: () => void;
}

const PopupInputs: React.FC<PopupInputsProps> = ({ onClick }) => {
  // States to hold input values
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]); // Track multiple active tags

  const handleClick = (tag: string) => {
    // Check if the tag is already active
    if (activeTags.includes(tag)) {
      // If it is, remove it from the active tags
      setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
    } else {
      // If it isn't, add it to the active tags
      setActiveTags([...activeTags, tag]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name,
      description,
      price,
      tags: activeTags, // Include the array of active tags in the form data
    };

    // Handle the submission logic here (e.g., send formData to an API)

    // Resetting form fields
    setName('');
    setDescription('');
    setPrice('');
    setActiveTags([]); // Reset the active tags after submission
    onClick(); // Call the onClick function after submission
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <input
            type="text"
            id="title"
            placeholder='Post Title'
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
            placeholder='Short Post Description'
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

        <div className={styles.tagsContainer}>
          {['Furniture', 'Electronics', 'Books', 'Clothing', 'Home Goods', 'Miscellaneous'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleClick(tag)} // Pass the tag name to identify it
              type="button" // Prevent form submission when clicking tag buttons
              className={`${activeTags.includes(tag) ? styles.tagActive : styles.tag}`} // Check if the current tag is active
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Save and Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupInputs;
