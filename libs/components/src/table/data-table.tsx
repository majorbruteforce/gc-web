import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from '../scrollbar/scrollbar';
import Table from '@mui/material/Table';
import { emptyRows, TableEmptyRows, TableHeadCustom, TablePaginationCustom, useTable } from './index';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Iconify from '../iconify';
import CustomPopover, { usePopover } from '../custom-popover';
import MenuItem from '@mui/material/MenuItem';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import EmptyContent from '../empty-content';
import { Box } from '@mui/material';

const RowActions = ({
	actions,
	row,
	renderActionComponent,
}: {
	actions: RowAction<any>[];
	row: any;
	renderActionComponent: (data: any) => JSX.Element;
}) => {
	const popover = usePopover();

	return (
		<TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
			{renderActionComponent ? renderActionComponent(row) : null}

			{Boolean(actions?.length) && (
				<IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
					<Iconify icon="eva:more-vertical-fill" />
				</IconButton>
			)}

			<CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ minWidth: 140 }}>
				{actions.map((eachAction, index) => (
					<MenuItem
						key={index}
						onClick={() => {
							eachAction.onClick?.(row);
							popover.onClose();
						}}
						sx={eachAction.sx}
						disabled={typeof eachAction.disabled === 'function' ? eachAction.disabled(row) : eachAction.disabled}
					>
						{eachAction.icon}
						{eachAction.label}
					</MenuItem>
				))}
			</CustomPopover>
		</TableCell>
	);
};

type Column<T, A = string> = {
	key: A;
	label: string;
	width?: number;
	align?: 'left' | 'right' | 'center';
	renderCell?: (value: T, key: A) => JSX.Element | string | number;
};

type RowAction<T> = {
	label: string;
	icon?: string | JSX.Element;
	onClick?: (data: T) => void;
	sx?: SxProps<Theme>;
	disabled?: boolean | ((data: T) => boolean);
};

interface DataTableProps<T> {
	columns: Column<T>[];
	rows: T[];
	total?: number;
	loading?: boolean;
	onPaginate?: (page: number, rowsPerPage: number) => void;
	actions?: RowAction<T>[];
	renderActionComponent?: (data: T) => JSX.Element;
	toolbar?: JSX.Element;
	noDataMessage?: string;
}

interface NoDataTableProps {
	notFound: boolean;
	sx?: SxProps<Theme>;
	title?: string;
}

const TableNoData = ({ notFound, sx, title = 'No Data' }: NoDataTableProps) => (
	<TableRow>
		{notFound ? (
			<TableCell colSpan={12}>
				<EmptyContent
					filled
					title={title} // Use the title prop
					sx={{
						py: 10,
						...sx,
					}}
				/>
			</TableCell>
		) : (
			<TableCell colSpan={12} sx={{ p: 0 }} />
		)}
	</TableRow>
);

const DataTable = ({
	columns,
	rows,
	total,
	loading,
	onPaginate,
	actions,
	renderActionComponent,
	toolbar,
	noDataMessage = 'No data found',
}: DataTableProps<any>) => {
	const table = useTable();

	useEffect(() => {
		onPaginate?.(table.page, table.rowsPerPage);
	}, [table.rowsPerPage, table.page]);

	return (
		<Card>
			{toolbar}
			<Box sx={{ overflowX: 'auto', display: 'flex', flexDirection: 'column', height: 'auto' }}>
				<TableContainer sx={{ position: 'relative', minWidth: 'auto', maxHeight: 'none' }}>
					{' '}
					{/* Remove maxHeight constraint */}
					<Scrollbar>
						<Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 'auto' }}>
							<TableHeadCustom
								headLabel={[
									...columns.map((each) => ({
										id: each.key,
										label: each.label,
										minWidth: each.width,
										align: each.align,
									})),
									actions?.length ? { id: '', width: 88 } : null,
								].filter(Boolean)}
							/>

							<TableBody>
								{rows.length > 0 ? (
									rows.map((eachRow, index) => (
										<TableRow hover key={eachRow._id || eachRow.id}>
											{columns.map((eachColumn) => (
												<TableCell
													key={eachColumn.key + '-' + eachRow._id || eachRow.id}
													align={eachColumn.align || 'left'}
												>
													{eachColumn.key === 'slNo'
														? table.page * table.rowsPerPage + 1 + index
														: eachColumn.renderCell
														? eachColumn.renderCell(eachRow, eachColumn.key)
														: eachRow[eachColumn.key]}
												</TableCell>
											))}
											{Boolean(actions?.length || renderActionComponent) && (
												<RowActions
													actions={actions || []}
													row={eachRow}
													renderActionComponent={renderActionComponent}
												/>
											)}
										</TableRow>
									))
								) : (
									<TableNoData notFound={!loading && !total} title={noDataMessage} sx={{ py: 10 }} />
								)}
								<TableEmptyRows emptyRows={emptyRows(table.page, table.rowsPerPage, total || 0)} />
							</TableBody>
						</Table>
					</Scrollbar>
				</TableContainer>
			</Box>
			{onPaginate && (
				<TablePaginationCustom
					count={total || 0}
					page={table.page}
					rowsPerPage={table.rowsPerPage}
					onPageChange={table.onChangePage}
					onRowsPerPageChange={table.onChangeRowsPerPage}
				/>
			)}
		</Card>
	);
};

export default DataTable;
