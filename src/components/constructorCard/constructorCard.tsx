import React, {useRef} from "react";
import styles from './constructorCard.module.css';

import cn from 'classnames';
import { useDrop, useDrag } from "react-dnd";

import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
    key?: string
    moveCard?: any,
    handleClose?: any
    idx?: number,
    item: any
}

interface IHoverItem {
    id: string,
    idx: number,
    index: number
}

const ConstructorCard: React.FC<IProps> = (props) => {
    const {item, handleClose, idx, moveCard } = props;
    const {id} = item;
    const ref = useRef<HTMLDivElement | null>(null);


    const [ { handlerId }, drop] = useDrop({
        accept: `ingridientCard`,
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId(),
            }
          },
        hover: (item: any, monitor) => {
            if (!ref.current) {
                return
            }
            
            const dragIndex = item.idx;
            const hoverIndex: number | undefined = idx;

            if(dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < (hoverIndex as number) && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > (hoverIndex as number) && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })


    const [{ isDragging }, drag] = useDrag({
        type: `ingridientCard`,
        item: () => {
            return { id, idx }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div className={cn(styles.wrap, 'mb-4', opacity)} ref={ref} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleClose(item.id)}
            />
        </div>
    )

}

export default ConstructorCard;