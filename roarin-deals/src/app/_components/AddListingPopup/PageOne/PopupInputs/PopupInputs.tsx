import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PopupInputs.module.scss';
import { FaDollarSign } from 'react-icons/fa';
import { FaAngleDown } from "react-icons/fa6";
import AddressInputs from '../../PageTwo/AddressInputs';
import checkIfUserIsMobile from '../../../../../../_utils/checkIfUserIsMobile';
import AddImageContainer from '../AddImageContainer/AddImageContainer';
import axios from 'axios';  // Add axios for making HTTP requests

interface PopupInputsProps {
  onClick: () => void;
}

const page1Variants = {
  initial: {
    x: 0,
    opacity: 1,
  },
  in: {
    x: 0,
    opacity: 1,
  },
  out: {
    x: '-100%',
    opacity: 0,
  },
};

const page2Variants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  in: {
    x: 0,
    opacity: 1,
  },
  out: {
    x: '-100%',
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8,
};

const PopupInputs: React.FC<PopupInputsProps> = ({ onClick }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [condition, setCondition] = useState("");
  const [showPageTwo, setShowPageTwo] = useState(false);
  const [showPageOne, setShowPageOne] = useState(true);
  const [showAddImageContainer, setShowAddImageContainer] = useState(false);

  // Address input state
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const isUserMobile = checkIfUserIsMobile(400);

  const handleTagClick = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const handlePageOneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPageOne(false);
    if (isUserMobile) {
      setShowAddImageContainer(true);
    } else {
      setShowPageTwo(true);
    }
  };

  const handlePageTwoSubmit = async (addressData: any) => {
    const formData = {
      title: name,
      description: description,
      price: price,
      condition: condition,
      tags: activeTags, // Send tags as an array
      ...addressData // Include address data
    };

    console.log('Form data being sent:', formData); // Log the form data

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/listings', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Listing created successfully", response.data);
      onClick();
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  const handleImageContainerSubmit = () => {
    setShowAddImageContainer(false);
    setShowPageTwo(true);
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {showPageOne && (
          <motion.div
            key="pageOne"
            initial="initial"
            animate="in"
            exit="out"
            variants={page1Variants}
            transition={pageTransition}
            className={styles.pageContainer}
          >
            <form onSubmit={handlePageOneSubmit} className={styles.formContainer}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="title"
                  placeholder="Post Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="description"
                  value={description}
                  placeholder="Short Post Description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <FaDollarSign className={styles.iconStyles} />
                <input
                  type="number"
                  id="price"
                  value={price}
                  placeholder="Selling Price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className={styles.inputSellingPrice}
                />
              </div>
              <div className={styles.inputContainer}>
                <select
                  id="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  required
                  className={`${styles.conditionInput} ${condition ? styles.selected : ""}`}
                >
                  <option value="" disabled>Condition</option>
                  <option value="New">New</option>
                  <option value="Like new">Like new</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
                <FaAngleDown className={styles.conditionIcon} />
              </div>
              <div className={styles.tagsContainer}>
                {['Furniture', 'Electronics', 'Books', 'Clothing', 'Home Goods', 'Miscellaneous'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      type="button"
                      className={`${activeTags.includes(tag) ? styles.tagActive : styles.tag}`}
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
              <div className={styles.buttonContainer}>
                {isUserMobile ? (
                  <button type="submit" className={styles.submitButton}>
                    Upload Images
                  </button>
                ) : (
                  <button type="submit" className={styles.submitButton}>
                    &#43; Add Pickup Address
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPageTwo && (
          <motion.div
            key="pageTwo"
            initial="initial"
            animate="in"
            exit="out"
            variants={page2Variants}
            transition={pageTransition}
            className={styles.pageContainer}
          >
            <AddressInputs onSubmit={handlePageTwoSubmit} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddImageContainer && (
          <motion.div
            key="pageTwo"
            initial="initial"
            animate="in"
            exit="out"
            variants={page2Variants}
            transition={pageTransition}
            className={styles.pageContainer}
          >
            <AddImageContainer />
            <button className={styles.imagePageSubmit} onClick={handleImageContainerSubmit}>&#43; Add Pickup Address</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopupInputs;
