export interface IListProps {
	items: IItem[];
	onCalendarAddClick: (itemId: number) => void;
	onDownloadItems: () => void;
	showDownload: boolean;
	showFixedOptional: boolean;
	title: string;
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

// type ActionCell = {
// 	icon: JSX.Element;
// };

export type IItem = {
	Title: TitleCell;
	Date: DateCell;
	Day: DayCell;
	Type: TypeCell;
	Id: number;
};
export interface I {
	Id: number;
	Title: string;
	Date: Date;
	Location: string;
	Optional: boolean;
}
