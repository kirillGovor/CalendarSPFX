import * as React from "react";
import {
  ColumnDefinition,
  createColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  RowState,
  TableCell,
  TableCellActions,
  TableCellLayout,
} from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";
import { CalendarAdd20Regular } from "@fluentui/react-icons";
import { IListProps, Item } from "../interfaces/IList";

const List = (props: IListProps): React.ReactElement => {
  const columns: ColumnDefinition<Item>[] = React.useMemo(
    () => [
      createColumn<Item>({
        columnId: "Title",
        renderHeaderCell: () => {
          return "";
        },
        renderCell: (item) => {
          return (
            <TableCell>
              <TableCellLayout>{item?.title}</TableCellLayout>
              <TableCellActions>
                <Button
                  icon={<CalendarAdd20Regular />}
                  appearance="subtle"
                  onClick={() => props.onCalendarAddClick(item.id)}
                />
              </TableCellActions>
            </TableCell>
          );
        },
      }),
      createColumn<Item>({
        columnId: "Date",
        renderHeaderCell: () => {
          return "";
        },
        renderCell: (item) => {
          return <TableCellLayout>{item?.date}</TableCellLayout>;
        },
      }),
      createColumn<Item>({
        columnId: "Day",
        renderHeaderCell: () => {
          return "";
        },
        renderCell: (item) => {
          return <TableCellLayout>{item.day}</TableCellLayout>;
        },
      }),
    ],
    [props.items]
  );

  return (
    <>
      <DataGrid
        items={props.items}
        columns={columns}
        sortable={false}
        getRowId={(item: Item) => item.id}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }: ColumnDefinition<Item>) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: RowState<Item>) => (
            <DataGridRow key={rowId}>
              {({ renderCell }: ColumnDefinition<Item>) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};

export default List;
