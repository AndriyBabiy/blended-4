import { Container, ExchangeForm, ExchangeInfo, Heading, Loader, Section } from 'components';
import { useSelector } from 'react-redux';
import { selectError, selectExchangeInfo, selectIsLoading } from '../reduxState/selectors.js';

const Home = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const exchangeInfo = useSelector(selectExchangeInfo);

  return (
    <Section>
      <Container>
        <ExchangeForm />

        {!isError && !exchangeInfo && <Heading info title="What currencies do you want to exchange?🙂" />}
        {isLoading && <Loader />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
      </Container>
    </Section>
  );
};

export default Home;
