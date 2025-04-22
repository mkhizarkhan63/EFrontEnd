import type { PropsWithChildren } from 'react';
import { Button } from '../Button';
import { If } from '../If';

type Props = PropsWithChildren<{
    header: JSX.Element;
    details?: JSX.Element;
    description: JSX.Element;
    isCollapsed: boolean;
    border: string;
    id: number;
    setCollapsed: (id: number) => void;
}>;

export const HeaderSwitch = ({
    header,
    details,
    description,
    children,
    isCollapsed,
    border,
    id,
    setCollapsed,
}: Props) => (
    <div className="table-switch" data-is-collapsed={isCollapsed}>
        <div className="table-switch__heading" data-border-color={border}>
            <div className="table-switch__col">
                <div className="table-switch__title">
                    <Button
                        color="white"
                        isCircle={true}
                        centerImg="dropdown-up"
                        onClick={() => setCollapsed(id)}
                    />
                    {header}
                </div>
                <If condition={isCollapsed}>
                    {description}
                </If>
            </div>
            <div className="table-switch__details" data-is-hidden={!isCollapsed}>
                {details}
            </div>
        </div>
        <If condition={!isCollapsed}>
            <div className="table-switch__extended">
                {children}
            </div>
        </If>
    </div>
);
