import { EventInput } from "@fullcalendar/core";
import { IEmployeeInfo } from "./IEmployeeInfo";

export interface ICalendarState {
  events: calendarEvent[];
  currentActiveStartDate: Date;
  currentActiveEndDate: Date;
  isEventDetailsOpen: boolean;
  currentSelectedEvent: EventInput;
  employeeInfo: IEmployeeInfo;
}

export interface calendarEvent {
  title: string;
  start: string;
  end: string;
  id: string;
}
