import React, { ReactElement } from "react";
import { EventContentArg } from "@fullcalendar/core";
import { IconButton } from "@fluentui/react/lib/Button";
import styles from "./EventContent.module.scss";

interface IEventContentProps {
  eventInfo: EventContentArg;
  onDelete: (id: string) => Promise<void>;
}

const EventContent = (props: IEventContentProps): ReactElement => (
  <span className={styles.event} key={props.eventInfo.event.id}>
    <b>{props.eventInfo?.timeText}</b>
    <p
      className={styles.title}
      aria-label={props.eventInfo?.event?.title}
      tabIndex={0}
    >
      {props.eventInfo?.event?.title}
    </p>
    <IconButton
      onClick={() => props.onDelete(props.eventInfo.event.id)}
      className={styles.icon}
      size={10}
      iconProps={{ iconName: "Delete" }}
      title="Delete"
      ariaLabel="Delete"
    />
  </span>
);

export default EventContent;
