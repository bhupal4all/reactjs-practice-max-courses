import { forwardRef } from "react";

const Input = function ({label, textarea, ...props}, ref) {
  const classes = "2-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="uppercase font-semibold text-stone-500">{label}</label>
      {textarea ? <textarea ref={ref} className={classes} {...props} /> : <input ref={ref} className={classes} type="text" {...props} />}
    </p>
  );
}

export default forwardRef(Input);