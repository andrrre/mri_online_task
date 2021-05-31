const descendingComparator = (a, b, orderBy) => {
    let passA = '';
    let passB = '';

    switch (orderBy) {
        case 'order':
            passA = a.order_number;
            passB = b.order_number;
            break;
        case 'status':
            passA = a.status;
            passB = b.status;
            break;
        case 'customer':
            passA = `${a.customer.address.line1}, ${a.customer.address.city}`;
            passB = `${b.customer.address.line1}, ${b.customer.address.city}`;
            break;
        case 'price':
            passA = a.order_details.value;
            passB = b.order_details.value;
            break;
    }

    if (passB < passA) {
        return -1;
    }
    if (passB > passA) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

module.exports = {descendingComparator, getComparator, stableSort};