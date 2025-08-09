import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({onAddProject, onCancel}) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dueDateRef = useRef(null);
  const modalRef = useRef();

  function handleSave() {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const dueDate = dueDateRef.current.value;

    if (name.trim() === '' || description.trim() === '' || dueDate.trim() === ''){
      modalRef.current.open();
      return;
    } 
    
    onAddProject({
      name: name,
      description: description,
      dueDate: dueDate
    });
  }

  return (
    <div className="w-[35rem]">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li><button onClick={onCancel} className="px-4 py-2 rounded-md text-stone-800 hover:text-stone-950">Cancel</button></li>
        <li><button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
      </menu>

      <div>
        <Input ref={nameRef} label="Name" />
        <Input ref={descriptionRef} label="Description" textarea />
        <Input ref={dueDateRef} label="Due Date" type="date"/>
      </div>

      <Modal ref={modalRef} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-500 my-4 uppercase">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops, you forgot to enter valid input</p>
        <p className="text-stone-600 mb-4">Please ensure that valid input for all</p>
      </Modal>
    </div>
  );
}
