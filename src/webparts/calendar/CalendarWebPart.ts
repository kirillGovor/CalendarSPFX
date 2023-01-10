import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";


import Calendar from "./components/Calendar";
import { ICalendarProps } from "./components/interfaces/ICalendarProps";
import { GraphService } from "../../services/GraphService";

export interface ICalendarWebPartProps {}

export default class CalendarWebPart extends BaseClientSideWebPart<ICalendarWebPartProps> {
  private graphService: GraphService;

  public render(): void {
    const element: React.ReactElement<ICalendarProps> = React.createElement(
      Calendar,
      {
        context: this.context,
        graphService: this.graphService,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve, _reject) => {
      this.graphService = new GraphService(this.context);
      resolve(undefined);
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
}
