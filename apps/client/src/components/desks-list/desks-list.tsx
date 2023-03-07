import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDesks } from "../../store/desks-actions";
import { AppDispatch, RootState } from "../../store";
import DesksListItem from "../desks-list-item/desks-list-item";
import { fetchReservations } from "../../store/reservations-actions";
import { Reservation, Desk } from "../../interfaces";
import DeskCreateForm from "../desk-create-form/desk-create-form";

export default function DesksList() {
  const dispatch: AppDispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const desks: Array<Desk> = useSelector(
    (state: RootState) => state.desks.items
  );
  const selectedDate = useSelector((state: RootState) => state.date.selected);
  const reservations: Array<Reservation> = useSelector(
    (state: RootState) => state.reservations.items
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const isAdmin = useSelector(
    (state: RootState) => state.user.userType.isAdmin
  );
  const isUserAbleToReserve = isAdmin
    ? true
    : !reservations.find((item) => item.user.id === userId);

  useEffect(() => {
    dispatch(fetchReservations(selectedDate));
  }, [selectedDate, dispatch]);

  const addFormHandler = () => {
    setShowAddForm(true);
  };

  const hideAddFormHandler = () => {
    setShowAddForm(false);
  };

  useEffect(() => {
    dispatch(fetchDesks());
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Desks List</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all desks and reservation on selected day.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {isAdmin ? (
            <button
              type="button"
              onClick={addFormHandler}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add desk
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
            >
              Add desk
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 pb-60">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {desks.map(({ id, name, description }) => (
                    <DesksListItem
                      id={id}
                      name={name}
                      description={description}
                      key={id}
                      reservation={reservations.find((el) => el.desk.id === id)}
                      isUserAbleToReserve={isUserAbleToReserve}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showAddForm && <DeskCreateForm onClose={hideAddFormHandler} />}
    </div>
  );
}
