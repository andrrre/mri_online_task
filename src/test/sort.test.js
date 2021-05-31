const {descendingComparator, getComparator, stableSort} = require('../helpers/sort-help');

describe('Sort test', () => {
    const array = [
        {
            order_number: 100000,
            customer: {
                address: {
                    line1: "123 Main Street",
                    city: "Boston",
                }
            },
            order_details: {
                value: 137.11,
            },
            status: "open"
        },
        {
            order_number: 150000,
            customer: {
                address: {
                    line1: "123 MainMain Street",
                    city: "Boston",
                }
            },
            order_details: {
                value: 150,
            },
            status: "finished"
        },
        {
            order_number: 150000,
            customer: {
                address: {
                    line1: "123 MainMainMain Street",
                    city: "Boston",
                }
            },
            order_details: {
                value: 190,
            },
            status: "open"
        },
    ];

    const order = 'order';
    const status = 'status';
    const customer = 'customer';
    const price = 'price';

    const orderAsc = 'asc';
    const orderDesc = 'desc';

    const firstMore = -1;
    const secondMore = 1;
    const equal = 0;

    test('should be defined', () => {
        expect(descendingComparator).toBeDefined();
        expect(getComparator).toBeDefined();
        expect(stableSort).toBeDefined();
        expect(descendingComparator).not.toBeUndefined();
        expect(getComparator).not.toBeUndefined();
        expect(stableSort).not.toBeUndefined();
    });

    test('descendingComparator test', () => {
        expect(descendingComparator(array[0], array[1], order)).toBe(secondMore);
        expect(descendingComparator(array[1], array[2], order)).toBe(equal);
        expect(descendingComparator(array[0], array[1], status)).toBe(firstMore);
        expect(descendingComparator(array[0], array[1], customer)).toBe(secondMore);
        expect(descendingComparator(array[0], array[1], price)).toBe(secondMore);
    });

    test('stableSort test', () => {
        const sortByPriceAsc = array.sort((a, b) => a.order_details.value - b.order_details.value);
        expect(stableSort(array, getComparator(orderAsc, price))).toEqual(sortByPriceAsc);
        const sortByPriceDesc = array.sort((a, b) => -(a.order_details.value - b.order_details.value));
        expect(stableSort(array, getComparator(orderDesc, price))).toEqual(sortByPriceDesc);

        const sortByOrderDesc = array.sort((a, b) => -(a.order_number - b.order_number));
        expect(stableSort(array, getComparator(orderDesc, order))).toEqual(sortByOrderDesc);
        const sortByOrderAsc = array.sort((a, b) => a.order_number - b.order_number);
        expect(stableSort(array, getComparator(orderAsc, order))).toEqual(sortByOrderAsc);

        const sortByCustomerAsc = array.sort((a, b) => {
            return `${a.customer.address.line1}, ${a.customer.address.city}`.length - `${b.customer.address.line1}, ${b.customer.address.city}`.length
        });
        expect(stableSort(array, getComparator(orderAsc, customer))).toEqual(sortByCustomerAsc);
        const sortByCustomerDesc = array.sort((a, b) => {
            return -(`${a.customer.address.line1}, ${a.customer.address.city}`.length - `${b.customer.address.line1}, ${b.customer.address.city}`.length)
        });
        expect(stableSort(array, getComparator(orderDesc, customer))).toEqual(sortByCustomerDesc);

        const sortByStatusDesc = array.sort((a, b) => a.status.length - b.status.length);
        expect(stableSort(array, getComparator(orderDesc, status))).toEqual(sortByStatusDesc);
        const sortByStatusAsc = array.sort((a, b) => -(a.status.length - b.status.length));
        expect(stableSort(array, getComparator(orderAsc, status))).toEqual(sortByStatusAsc);
    });

});