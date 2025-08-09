import noProjectImage from './../assets/no-projects.png';
import Button from './Button';

export default function NoProjectSelected({onStartNewProject}) {
  return <div className="mx-auto mt-24 text-center w-2/3">
    <img src={noProjectImage} alt="Empty Task List" className="size-16 object-contain mx-auto" />
    <h2 className="text-xl font-bold text-stone-500 my-4 uppercase">No Project Selected</h2>
    <p className="text-stone-400 mb-4">Select a project or get started with new one</p>
    <p className="mt-8">
      <Button onClick={onStartNewProject}>Create New Project</Button>
    </p>
  </div>;
}