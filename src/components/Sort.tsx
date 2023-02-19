import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setSort, SortPropertyEnum } from '../redux/slices/filterSlices';

export const sortList: SortItem[] = [
  { name: 'популярности(DESC)', property: SortPropertyEnum.RAITNG_DESC },
  { name: 'популярности(ASC)', property: SortPropertyEnum.RAITNG_ASC },
  { name: 'цене(DESC)', property: SortPropertyEnum.PRICE_DESC },
  { name: 'цене(ASC)', property: SortPropertyEnum.PIRCE_ASC },
  { name: 'алфавиту(DESC)', property: SortPropertyEnum.TITILE_DESC },
  { name: 'алфавиту(ASC)', property: SortPropertyEnum.TITLE_ASC },
];

type SortItem = {
  name: string;
  property: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector(selectFilter);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const onClickItemList = (obj: SortItem) => {
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _e = e as PopupClick;
      if (sortRef.current && !_e.path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickItemList(obj)}
                className={sort.property == obj.property ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
