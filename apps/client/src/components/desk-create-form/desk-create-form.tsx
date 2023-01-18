import {useState, ChangeEvent, FormEvent} from 'react';
import Modal from '../UI/modal/modal';
import {addDesk} from '../../store/desks-actions';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';

/* eslint-disable-next-line */
export interface AddDeskFormProps {
  onClose: () => void,
}

export function DeskCreateForm(props: AddDeskFormProps) {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState(10);


  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }

  const changeDescriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value)
  }

  const changeOrderHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrder(parseInt(e.target.value))
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    await dispatch(addDesk(name, description, order))
    props.onClose();
  }
  return (
      <Modal onClose={props.onClose}>
        <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Add desk
        </h2>
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                value={name}
                onChange={changeNameHandler}
                id="name"
                name="name"
                type="text"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                rows={4}
                name="description"
                id="description"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                value={description}
                onChange={changeDescriptionHandler}
              />
            </div>
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700">
              Sort Order
            </label>
            <div className="mt-1">
              <input
                value={order}
                onChange={changeOrderHandler}
                id="order"
                name="order"
                type="number"
                step="1"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add desk
            </button>
          </div>
        </form>
      </Modal>
  );
}

export default DeskCreateForm;
