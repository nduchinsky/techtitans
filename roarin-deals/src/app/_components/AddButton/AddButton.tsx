import styles from './AddButton.module.scss';
import plus from '../../../../public/images/add-button.svg';

export default function AddButton(){
    return(
        <div className={styles.buttonContainer}>
            <img src={plus} alt="Add Post"/>
        </div>
    );
}