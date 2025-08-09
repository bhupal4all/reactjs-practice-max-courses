import Button from './Button';
export default function Sidebar({projects, onStartNewProject}) {

  return <>
  <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
    <h2 className="mb-8 text-center font-bold uppercase md:text-xl">Your Projects</h2>
    <div className="flex flex-col space-y-2">
      <Button onClick={onStartNewProject}>+ Add Project</Button>
    </div>
    <ul className="mt-8">
      {projects.map(project => <li>
        <button className="w-full text-left px-2 py-1 my-2 rounded-sm bg-stone-600 text-stone-400 hover:text-stone:200">{project.name}</button>
      </li>)}
    </ul>
  </aside>
  </>;
}