export default function InputForm({
    labelName,
    id,
    type,
    required = false,
    placeholder,
    value,
    onChange,
}) {
    return (
        <div className="flex items-center justify-center gap-x-5">
            <label htmlFor={id} className="w-24">
                {labelName}:
            </label>
            <input
                type={type}
                id={id}
                name={id}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-64 border-none rounded"
            />
        </div>
    );
}
