import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectState(pState => {
      return {
        ...pState,
        selectedProjectId: null
      }
    })
  }

  function handleAddProject(data) {
    setProjectState(pState => {
      const newProject = {
        ...data,
        id: Math.random()
      }

      return {
        ...pState,
        selectedProjectId: undefined,
        projects: [...pState.projects, newProject]
      }
    });
  } 

  function handleCancelAddProject() {
    setProjectState(pState => {
      return {
        ...pState,
        selectedProjectId: undefined
      }
    });
  }

  let content = null;
  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartNewProject={handleStartAddProject} />
  } else if (projectState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} onCancel={handleCancelAddProject}/>
  }

  let totalProject;
  if (projectState.projects && projectState.projects.length>0){
    totalProject = <h3>total projects: {projectState.projects.length}</h3>
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar projects={projectState.projects} onStartNewProject={handleStartAddProject} />
        {content}
        {totalProject}
      </main>
    </>
  );
}

export default App;
