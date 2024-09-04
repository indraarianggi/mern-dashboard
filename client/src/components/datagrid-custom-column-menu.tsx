import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
  GridColumnMenuContainerProps,
} from "@mui/x-data-grid";

export const DataGridCustomColumnMenu = ({
  colDef,
  hideMenu,
  open,
}: GridColumnMenuContainerProps) => {
  return (
    <GridColumnMenuContainer colDef={colDef} hideMenu={hideMenu} open={open}>
      <GridColumnMenuFilterItem colDef={colDef} onClick={hideMenu} />
      <GridColumnMenuHideItem colDef={colDef} onClick={hideMenu} />
    </GridColumnMenuContainer>
  );
};
