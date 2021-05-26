import {getComparator, stableSort} from "../../helpers/sort-help";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TableBody from "@material-ui/core/TableBody";
import React from "react";

const BodyTable = ({
                       data,
                       order,
                       orderBy,
                       page,
                       rowsPerPage,
                       selected,
                       setSelected
                   }) => {

    const handleClick = (event, name) => {
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
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (<TableBody>
        {stableSort(data, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((el, index) => {
                const isItemSelected = isSelected(el.order_number);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                    <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={el.order_number}
                        selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={isItemSelected}
                                inputProps={{'aria-labelledby': labelId}}
                                onClick={(event) => handleClick(event, el.order_number)}
                            />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                            <div className="cell-info">
                                <div className="cell-info-1">
                                    {`# ${el.order_number}`}
                                </div>
                                <div className="cell-info-2">
                                    {
                                        `Ordered: ${new Date(el.order_details.date).toDateString().slice(4)}`
                                    }
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="cell-info">
                                <div className="cell-info-1">
                                    <div className="status">
                                        <FiberManualRecordIcon fontSize="small" color="primary"/>
                                        <div>{el.status}</div>
                                    </div>
                                </div>
                                <div className="cell-info-2">
                                    {
                                        `Updated: ${new Date(el.shipping_details.date).toDateString().slice(4)}`
                                    }
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="cell-info">
                                <div className="cell-info-1">
                                    {el.customer.address.line1}
                                </div>
                                <div className="cell-info-2">
                                    {`${el.customer.address.city}, US ${el.customer.address.zip}`}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="cell-info-1">
                                {`$${el.order_details.value}`}
                            </div>
                            <div className="cell-info-2">
                                USD
                            </div>
                        </TableCell>
                        <TableCell>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                            >
                                <MoreVertIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                );
            })}
        {emptyRows > 0 && (
            <TableRow style={{height: (53) * emptyRows}}>
                <TableCell colSpan={6}/>
            </TableRow>
        )}
    </TableBody>)
};
export default BodyTable;