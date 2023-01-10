import React from "react";
import { ReactElement, useCallback, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventContentArg } from "@fullcalendar/core";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";

import EventContent from "./EventContent/EventContent";
import { ICalendarProps } from "./interfaces/ICalendarProps";
import { ICalendarState } from "./interfaces/ICalendarState";
import styles from "./Calendar.module.scss";

const Calendar = (props: ICalendarProps): ReactElement => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [state, setState] = React.useState<ICalendarState>({
    events: [],
    currentActiveStartDate: null,
    currentActiveEndDate: null,
    isEventDetailsOpen: false,
    currentSelectedEvent: null,
    employeeInfo: null,
  });

  const resetError = useCallback(() => setError(undefined), []);

  const fetchData = useCallback(async () => {
    const calendarEvents = await props.graphService.getCalendarEvents();
    setState({ ...state, events: calendarEvents || [] });
  }, []);

  const deleteEvent = async (id: string): Promise<void> => {
    const result = await props.graphService.deleteEvent(id);

    setError(result.statusCode !== 200 ? result?.code : undefined);
  };

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
