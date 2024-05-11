import { useDispatch } from 'react-redux';
import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { fetchChangeCurrency } from '../../reduxState/operations.js';

export const ExchangeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const {value} = event.target.elements.currency;

    const [amount, from, , to] = value.split(' ');

    dispatch(fetchChangeCurrency({amount, from, to}));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format 15 USD in UAH"
        className={styles.input}
        pattern={'^\\d+(\\.\\d{1,2})?\\s[a-zA-Z]{3}\\sin\\s[a-zA-Z]{3}$'}
        name="currency"
      />
    </form>
  );
};
