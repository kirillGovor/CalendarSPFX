
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { GraphService } from "../../../../services/GraphService";

export interface ICalendarProps {
  context: WebPartContext;
  graphService: GraphService;
}
