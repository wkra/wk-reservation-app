/* eslint-disable-next-line */
import {useState} from 'react';
import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid'
import ConfirmModal from '../UI/confirm-modal/confirm-modal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {addReservation, removeReservation} from '../../store/reservations-actions';
import {Reservation} from '../../interfaces';
import {removeDesk} from '../../store/desks-actions';

export interface DeskListItemProps {
  id: number
  name: string,
  description: string
  reservation: undefined | Reservation
}

export function DesksListItem(props: DeskListItemProps) {
  const dispatch: AppDispatch = useDispatch();
  const date = useSelector((state: RootState) => state.date.selected);
  const userId: number = useSelector((state: RootState) => state.user.id);
  const [isActiveReservationConfirm, setIsActiveReservationConfirm] = useState(false);
  const [isActiveReservationCancel, setIsActiveReservationCancel] = useState(false);
  const [isActiveDeskRemove, setIsActiveDeskRemove] = useState(false);

  const showReservationConfirmHandler = () => {
    setIsActiveReservationConfirm(true)
  }

  const hideReservationConfirmHandler = () => {
    setIsActiveReservationConfirm(false)
  }

  const showReservationCancelHandler = () => {
    setIsActiveReservationCancel(true)
  }

  const hideReservationCancelHandler = () => {
    setIsActiveReservationCancel(false)
  }

  const showDeskRemoveHandler = () => {
    setIsActiveDeskRemove(true)
  }

  const hideDeskRemoveHandler = () => {
    setIsActiveDeskRemove(false)
  }

  const reservationHandler = async () => {
    await dispatch(addReservation(userId, props.id, date))
    hideReservationConfirmHandler();
  }

  const removeDeskHandler = async () => {
    await dispatch(removeDesk(props.id))
    hideDeskRemoveHandler();
  }

  const removeReservationHandler = async () => {
    if (props.reservation) {
      await dispatch(removeReservation(props.reservation.id))
      hideReservationCancelHandler();
    }
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <tr key={props.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {props.name}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-500">{props.description}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {props.reservation && (
          <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                            Reserved
                          </span>
        )}
        {!props.reservation && (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Available
                          </span>
        )}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {!props.reservation &&
                  <Menu.Item>
                    {({active}) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                        onClick={showReservationConfirmHandler}
                      >
                        Reserve desk
                      </a>
                    )}
                  </Menu.Item>
                }
                {props.reservation && <Menu.Item>
                  {({active}) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                      onClick={showReservationCancelHandler}
                    >
                      Remove reservation
                    </a>
                  )}
                </Menu.Item>}
                <Menu.Item>
                  {({active}) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                      onClick={showDeskRemoveHandler}
                    >
                      Remove desk
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {isActiveReservationConfirm && <ConfirmModal
          title="Confirm reservation"
          onCancel={hideReservationConfirmHandler}
          onConfirm={reservationHandler}>
          <>
            <p className="text-sm text-gray-500">Desk: {props.name}</p>
            <p className="text-sm text-gray-500">Date: {date}</p>
          </>
        </ConfirmModal>}

        {isActiveReservationCancel && <ConfirmModal
          title="Confirm cancellation"
          onCancel={hideReservationCancelHandler}
          onConfirm={removeReservationHandler}>
          <>
            <p className="text-sm text-gray-500">Desk: {props.name}</p>
            <p className="text-sm text-gray-500">Date: {date}</p>
          </>
        </ConfirmModal>}
        {isActiveDeskRemove && <ConfirmModal
          title="Confirm desk remove"
          onCancel={hideDeskRemoveHandler}
          onConfirm={removeDeskHandler}>
          <p className="text-sm text-gray-500">Desk: {props.name}</p>
        </ConfirmModal>}

      </td>
    </tr>
  );
}

export default DesksListItem;
