import { User } from "@microsoft/microsoft-graph-types";
import { MSGraphClientV3, GraphRequest } from "@microsoft/sp-http-msgraph";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IEmployeeInfo } from "../webparts/calendar/components/interfaces/IEmployeeInfo";

export class UserService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  private getClient = async (): Promise<MSGraphClientV3> => {
    return await this.context.msGraphClientFactory.getClient("3");
  };

  public getMyInformation = async (): Promise<User> => {
    const client = await this.getClient();
    const request: GraphRequest = client.api("/me");
    const employeeInfo: User = await request.get();
    return Promise.resolve(employeeInfo);
  };

  public getMyTimeZone = async (): Promise<string> => {
    const client = await this.getClient();
    const request: GraphRequest = client.api("/me/mailboxSettings");
    const response = await request.get();
    return Promise.resolve(response.timeZone);
  };

  public getEmployeeInfo = async (): Promise<IEmployeeInfo> => {
    const [myInformation, myTimeZone] = await Promise.all([
      this.getMyInformation(),
      this.getMyTimeZone(),
    ]);
    const employeeInformation = {} as IEmployeeInfo;
    employeeInformation.eMail = myInformation.mail;
    employeeInformation.id = myInformation.id;
    employeeInformation.officeLocation = myInformation.officeLocation;
    employeeInformation.displayName = myInformation.displayName;
    employeeInformation.timezone = myTimeZone;
    return Promise.resolve(employeeInformation);
  };
}
