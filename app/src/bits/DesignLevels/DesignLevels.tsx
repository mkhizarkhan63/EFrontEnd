import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import type { FloorLevelType } from '~/models';
import { hook } from '~/utils';
import { If } from '../If';

type Props = {
    levelItems: FloorLevelType[];
    hide?: () => void;
};

const DesignItem = observer(({ floorLevel }: { floorLevel: FloorLevelType }) => {
    const roomsData = floorLevel.rooms.map((item, index) => (
        <p
            key={`${item.type}-${item.count}-${index}`}
            className="design-item__room"
        >
            <If condition={() => item.count > 1}>
                {item.count}&nbsp;x&nbsp;
            </If>
            {lang.dict.enum('roomType', item.type)}
        </p>
    ));

    const getFloor = () => {
        const floorType = lang.dict.enum('floorType', floorLevel.type);

        if (floorLevel.type !== E.FloorType.floor) {
            return floorType;
        }

        switch (floorLevel.level) {
            case 1:
                return lang.dict.get('firstFloor');
            case 2:
                return lang.dict.get('secondFloor');
            case 3:
                return lang.dict.get('thirdFloor');
            default:
                return `${floorType} no. ${floorLevel.level}`;
        }
    };

    return (
        <div className="design-item">
            <div className="design-item__left">
                <p className="design-item__floor-type">
                    {getFloor()}
                </p>
                <p className="design-item__floor-size">
                    {lang.dict.format('squareMetersFormat', [floorLevel.size])}
                </p>
            </div>
            <div className="design-item__right">
                {roomsData}
            </div>
        </div>
    );
});

export const DesignLevels = observer((props: Props) => {
    const ref = hook.useClickOutside(() => props.hide?.());

    const designItemsData = props.levelItems.map((item, index) => (
        <DesignItem
            key={`level-${item.type}-${index}`}
            floorLevel={item}
        />
    ));

    return (
        <div
            className="design-levels"
            ref={ref}
        >
            <div className="design-levels__items">
                {designItemsData}
            </div>
        </div>
    );
});
