import { observer } from 'mobx-react';
import { utilsNumber } from '~/utils';

type PriceProps = {
    totalPrice: number;
    projectSize: number;
    isTotalPrice: boolean;
    className: string;
    templateDuration?: number;
};

export const Price = observer((props: PriceProps) => {
    const consultantValue = props.templateDuration && props.isTotalPrice
        ? props.templateDuration / 30 * props.totalPrice
        : props.totalPrice;

    const contractorValue = props.isTotalPrice
        ? props.totalPrice
        : props.totalPrice / props.projectSize;

    const value = props.templateDuration ? consultantValue : contractorValue;

    return (
        <p className={props.className}>
            {utilsNumber.toCurrency(value, 0, 0)}
        </p>
    );
});
