declare interface IGraphCalendarWebPartStrings {
  EventsPerView: string;
  ShowRecurringEvents: string;
  StartTime: string;
  EndTime: string;
  Location: string;
  Body: string;
  Close: string;
}

declare module 'CalendarWebPartStrings' {
  const strings: IGraphCalendarWebPartStrings;
  export = strings;
}
