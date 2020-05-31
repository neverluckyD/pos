import React from "react";
import { Link } from 'react-router-dom';
import {
	makeStyles,
	withStyles
} from "@material-ui/core/styles";
import {
	Paper,
	Table,
	TableRow,
	TableCell,
	TableBody,
	Checkbox,
	TableSortLabel,
	TablePagination,
	Switch,
	FormControlLabel,
	TableFooter,
	IconButton
} from "@material-ui/core";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../../partials/content/Portlet";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHeader from "../../../partials/layout/TableHeader";
import CreateIcon from '@material-ui/icons/Create';

const orderHeadrow = [
	{
		id: "order_code",
		numeric: false,
		disablePadding: false,
		label: "Mã đơn hàng",
		hasSort: true
	},
	{ id: "customer", numeric: false, disablePadding: false, label: "Khách hàng" },
	{ id: "status", numeric: false, disablePadding: false, label: "Trạng thái" },
	{ id: "type", numeric: false, disablePadding: false, label: "Loại" },
	{ id: "staff", numeric: false, disablePadding: false, label: "Nhân viên" },
	{ id: "price", numeric: true, disablePadding: false, label: "Giá", hasSort: true },
	{ id: "discount", numeric: true, disablePadding: false, label: "Giảm giá", hasSort: true },
	{ id: "total", numeric: true, disablePadding: false, label: "Tổng tiền", hasSort: true },
	{ id: "payment", numeric: true, disablePadding: false, label: "Thanh toán", hasSort: true }
];

const rows = Array(27).fill({
	"order_code": 123414,
	"customer": "Nguyễn Văn A",
	"status": "Đã thanh toán",
	"type": "Đơn bán lẻ",
	"staff": "Nguyễn Văn B",
	"price": 1000000,
	"discount": 200000,
	"total": 800000,
	"paid": 500000
});

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === "desc"
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: "1rem",
  },
}))(TableCell);

export default function OrderList(props) {
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState([]);
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === "desc";
		setOrder(isDesc ? "asc" : "desc");
		setOrderBy(property);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	}

	function handleClick(event, name) {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
	}

	function handleChangeDense(event) {
		setDense(event.target.checked);
	}

	const isSelected = name => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<Portlet>
			<PortletHeader
				title="Danh sách đơn hàng"
				toolbar={(
						<PortletHeaderToolbar>
							<Link
                to="/add_order"
                className="btn btn-primary"
              >
							Tạo đơn hàng
							</Link>
						</PortletHeaderToolbar>
					)
				}
			/>

			<PortletBody>
				<div className="kt-section__content">
					<div className={classes.root}>
						<Paper className={classes.paper}>
							<div className={classes.tableWrapper}>
								<Table
									className={classes.table}
									aria-labelledby="tableTitle"
									size={dense ? "small" : "medium"}
								>
									<TableHeader
										numSelected={selected.length}
										order={order}
										orderBy={orderBy}
										onSelectAllClick={handleSelectAllClick}
										onRequestSort={handleRequestSort}
										rowCount={rows.length}
										headRow={orderHeadrow}
									/>
									<TableBody>
										{stableSort(rows, getSorting(order, orderBy))
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((row, index) => {
												const isItemSelected = isSelected(row.name);
												const labelId = `enhanced-table-checkbox-${index}`;

												return (
													<TableRow
														hover
														onClick={event =>
															handleClick(event, row.name)
														}
														role="checkbox"
														aria-checked={isItemSelected}
														tabIndex={-1}
														key={row.name}
														selected={isItemSelected}
													>
														{/* <TableCell padding="checkbox">
													<Checkbox
														checked={isItemSelected}
														inputProps={{
															"aria-labelledby": labelId
														}}
													/>
												</TableCell> */}
														<StyledTableCell
															component="th"
															id={labelId}
															scope="row"
														>
															{row.order_code}
														</StyledTableCell>
														<StyledTableCell>{row.customer}</StyledTableCell>
														<StyledTableCell>{row.status}</StyledTableCell>
														<StyledTableCell>{row.type}</StyledTableCell>
														<StyledTableCell>{row.staff}</StyledTableCell>
														<StyledTableCell align="right">{row.price}</StyledTableCell>
														<StyledTableCell align="right">{row.discount}</StyledTableCell>
														<StyledTableCell align="right">{row.total}</StyledTableCell>
														<StyledTableCell align="right">{row.paid}</StyledTableCell>
														<StyledTableCell align="right">
															<IconButton className={classes.button} aria-label="Create" color="primary" size="small">
																<CreateIcon />
															</IconButton>
															<IconButton className={classes.button} aria-label="Delete" color="secondary" size="small">
																<DeleteIcon />
															</IconButton>
														</StyledTableCell>
													</TableRow>
												);
											})}
										{emptyRows > 0 && (
											<TableRow style={{ height: 49 * emptyRows }}>
												<TableCell colSpan={6} />
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								component="div"
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								backIconButtonProps={{
									"aria-label": "Previous Page"
								}}
								nextIconButtonProps={{
									"aria-label": "Next Page"
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						</Paper>
					</div>
				</div>
			</PortletBody>
		</Portlet>
	);
}



const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 750
	},
	tableWrapper: {
		overflowX: "auto"
	},
	button: {
		margin: theme.spacing(0),
	},
}));