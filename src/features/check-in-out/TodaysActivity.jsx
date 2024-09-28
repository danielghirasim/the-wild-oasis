import styled from 'styled-components';

import Heading from '../../ui/Heading.jsx';
import Row from '../../ui/Row.jsx';
import { useTodaysActivity } from './useTodayActivity.js';
import TodayItem from './TodayItem.jsx';

const StyledTodaysActivity = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodaysActivity() {
  const { todaysActivity, isLoading } = useTodaysActivity();

  return (
    <StyledTodaysActivity>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading && todaysActivity.length > 0 ? (
        <TodayList>
          {todaysActivity.map((activity) => (
            <TodayItem key={activity.id} activity={activity} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No activity today...</NoActivity>
      )}
    </StyledTodaysActivity>
  );
}

export default TodaysActivity;
