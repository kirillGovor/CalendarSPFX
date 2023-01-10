import { calendarEvent } from "./ICalendarState";

export interface IListProps {
	items: calendarEvent[];
	onCalendarAddClick: (itemId: string) => void;
}

type TitleCell = {
	label: string;
};

type DateCell = {
	value: Date;
	label: string;
};

type DayCell = {
	label: string;
};
type TypeCell = {
	optional: boolean;
};

export type Item = {
	title: TitleCell;
	date: DateCell;
	day: DayCell;
	type: TypeCell;
	id: string;
};