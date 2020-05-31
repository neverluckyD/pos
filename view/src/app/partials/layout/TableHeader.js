import React from "react";
import PropTypes from "prop-types";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
} from "@material-ui/core";

export default function TableHeader(props){
	const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
		onRequestSort,
		headRow
	} = props;
	
  const createSortHandler = property => event => {
    onRequestSort(event, property);
	};

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Select all desserts" }}
          />
        </TableCell> */}
        {headRow.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            {row.hasSort
            ?
              (<TableSortLabel
                active={orderBy === row.id}
                direction={order}
                onClick={createSortHandler(row.id)}
                style={{ textTransform: "upercase"}}
              >
                {row.label}
              </TableSortLabel>)
            : row.label
            }
              
          </TableCell>
        ))}
				<TableCell padding="default" align="right">
          Hành động
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};