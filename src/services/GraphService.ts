import { Event as IEventType } from "@microsoft/microsoft-graph-types";

import { MSGraphClientV3, GraphRequest } from "@microsoft/sp-http-msgraph";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import moment from "moment-timezone";
import { IEmployeeInfo } from "../webparts/calendar/components/interfaces/IEmployeeInfo";
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface TransformEvent {
  title: string;
  start: string;
  end: string;
  id: string;
}

export class GraphService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  private getClient = async (): Promise<MSGraphClientV3> => {
    return await this.context.msGraphClientFactory.getClient("3");
  };

  // in production I would be use transformEvents with useMemo because parsing events is expensive
  public transformEvents = (events: MicrosoftGraph.Event[]): TransformEvent[] =>
    events.map((event) => {
      const currentStartDate = moment.tz(
        event.start.dateTime,
        event.start.timeZone
      );
      const currentEndDate = moment.tz(event.end.dateTime, event.end.timeZone);

      return {
        title: event.subject,
        start: !event.isAllDay
          ? currentStartDate
              .clone()
              .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
              .format()
          : moment(currentStartDate).add(1, "d").toISOString(),
        end: !event.isAllDay
          ? currentEndDate
              .clone()
              .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
              .format()
          : moment(currentEndDate).add(1, "d").toISOString(),
        id: event.id,
      };
    });

  public getCalendarEvents = async (): Promise<TransformEvent[]> => {
    const client = await this.getClient();
    const request: GraphRequest = client.api("/me/calendar/events").select("*");
    const calendarInfo = await request.get();
    const calendarEvents: MicrosoftGraph.Event[] = calendarInfo.value;

    return this.transformEvents(calendarEvents);
  };

  public deleteEvent = async (id: string): Promise<{ code: string, statusCode: number }> => {
    const client = await this.getClient();
    const request: GraphRequest = client.api(`/me/events/{${id}}`);
    try {
      const response = await request.delete();
      return Promise.resolve(response);
    } catch (err) {
      return err;
    }
  };

  public createEvent = async (
    detail: IEventType
  ): Promise<unknown> => {
    const client = await this.getClient();
    const request: GraphRequest = client.api("/me/events");
    const response = await request.post(detail);

    return Promise.resolve(response);
  };

  public addLeaveInCalendar = async (
    employeeInfo: IEmployeeInfo,
    item: { value: string; title: string }
  ): Promise<boolean> => {
    try {
      const eventDetail: IEventType = {};
      eventDetail.subject = item.title ?? null;
      eventDetail.start = {
        dateTime: moment(item.value).format("YYYY-MM-DD") + "T00:00:00",
        timeZone: employeeInfo.timezone,
      };
      eventDetail.end = {
        dateTime: moment(item.value).format("YYYY-MM-DD") + "T23:59:59",
        timeZone: employeeInfo.timezone,
      };
      eventDetail.showAs = "oof";
      eventDetail.attendees = [
        {
          emailAddress: {
            address: employeeInfo.eMail,
            name: employeeInfo.displayName,
          },
        },
      ];

      await this.createEvent(eventDetail);
      return Promise.resolve(true);
    } catch (ex) {
      return Promise.reject(false);
    }
  };
}
