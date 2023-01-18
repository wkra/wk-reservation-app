import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { dateActions } from '../../store/date';

export default function Datepicker() {
  const dispatch: AppDispatch = useDispatch();
  const date = useSelector((state: RootState) => state.date.selected);

  const selected = dayjs(date);

  const onChangeHandler = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      dispatch(dateActions.setDate(formattedDate));
    }
  };

  return (
    <DatePicker value={selected} onChange={onChangeHandler} showNow={true} />
  );
}
