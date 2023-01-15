import React from "react";
import { ReactElement, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventContentArg } from "@fullcalendar/core";
import {
  MessageBar,
  MessageBarType,
  Spinner,
} from "office-ui-fabric-react";

import EventContent from "./EventContent/EventContent";
import { ICalendarProps } from "./interfaces/ICalendarProps";
import styles from "./Calendar.module.scss";

const Calendar = ({ graphService }: ICalendarProps): ReactElement => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [state, setState] = React.useState({
    events: [],
    currentActiveStartDate: null,
    currentActiveEndDate: null,
    isEventDetailsOpen: false,
    currentSelectedEvent: null,
    employeeInfo: null,
  });

  const resetError = (): void => setError(undefined);

  const fetchData = async (): Promise<void> => {
    const calendarEvents = await graphService.getCalendarEvents();
    setState({ ...state, events: calendarEvents || [] });
  };

  const deleteEvent = async (id: string): Promise<void> => {
    const result = await graphService.deleteEvent(id);
    const isError = result.statusCode !== 200;

    setError(isError ? result?.code : undefined);

    if (!isError) await fetchData();
  };

  useEffect((): void => {
    // eslint-disable-next-line no-void
    void fetchData();
  }, []);

  return (
    <div className={styles.calendar}>
      <h1>Calendar</h1>
      {state.events.length ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={state.events}
          eventContent={(eventInfo: EventContentArg) => (
            <EventContent eventInfo={eventInfo} onDelete={deleteEvent} />
          )}
        />
      ) : (
        <Spinner label="I am definitely loading..." />
      )}
      {error && (
        <MessageBar
          onDismiss={resetError}
          dismissButtonAriaLabel="Close"
          messageBarType={MessageBarType.error}
          isMultiline={false}
          ariaLabel={error}
        >
          {error}
        </MessageBar>
      )}
    </div>
  );
};

export default Calendar;
