import React from "react";
import { ReactElement, useCallback, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventContentArg } from "@fullcalendar/core";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";

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

  const resetError = useCallback(() => setError(undefined), []);

  const fetchData = useCallback(async () => {
    const calendarEvents = await graphService.getCalendarEvents();
    setState({ ...state, events: calendarEvents || [] });
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    const result = await graphService.deleteEvent(id);
    const isError = result.statusCode !== 200;

    setError(isError ? result?.code : undefined);

    if (!isError) await fetchData();
  }, []);
  useEffect((): void => {
    // eslint-disable-next-line no-void
    void fetchData();
  }, []);

  return (
    <div className={styles.calendar}>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={state.events}
        eventContent={(eventInfo: EventContentArg) => (
          <EventContent eventInfo={eventInfo} onDelete={deleteEvent} />
        )}
      />
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
