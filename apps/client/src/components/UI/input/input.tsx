export interface ComponentProps {
  onChange: (event: any) => void;
  value: string | number;
  label: string;
  name: string;
  id: string;
  placeholder: string;
}

export default function Input(props: ComponentProps) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type="text"
          placeholder={props.placeholder}
          required
          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
