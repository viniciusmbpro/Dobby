let projects = [];
let currentProjectId = null;

document.getElementById('new-project').addEventListener('click', createNewProject);
document.getElementById('save').addEventListener('click', saveProject);

function saveProjectsToLocalStorage() {
    localStorage.setItem('paintProjects', JSON.stringify(projects));
}

function loadProjectsFromLocalStorage() {
    const storedProjects = localStorage.getItem('paintProjects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
        loadProjectsList();
    }
}

function createNewProject() {
    const newProject = {
        id: Date.now(),
        name: `Projeto ${projects.length + 1}`,
        data: null
    };
    projects.push(newProject);
    saveProjectsToLocalStorage();
    loadProjectsList();
    alert('Novo projeto criado!');
}

function saveProject() {
    if (currentProjectId === null) {
        alert('Nenhum projeto selecionado.');
        return;
    }
    const dataURL = canvas.toDataURL();
    const projectIndex = projects.findIndex(p => p.id === currentProjectId);
    projects[projectIndex].data = dataURL;
    saveProjectsToLocalStorage();
    alert('Projeto salvo com sucesso!');
}

function loadProjectsList() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.addEventListener('click', function() {
            loadProject(project.id);
        });
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function(e) {
            e.stopPropagation();
            editProjectName(project.id);
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteProject(project.id);
        });
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        projectsList.appendChild(li);
    });
}

function loadProject(id) {
    currentProjectId = id;
    const project = projects.find(p => p.id === id);
    const img = new Image();
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };
    img.src = project.data;
}

function editProjectName(id) {
    const newName = prompt('Digite o novo nome do projeto:');
    if (newName) {
        const projectIndex = projects.findIndex(p => p.id === id);
        projects[projectIndex].name = newName;
        saveProjectsToLocalStorage();
        loadProjectsList();
    }
}

function deleteProject(id) {
    const confirmDelete = confirm('Você tem certeza que quer deletar este projeto?');
    if (confirmDelete) {
        projects = projects.filter(p => p.id !== id);
        saveProjectsToLocalStorage();
        loadProjectsList();
    }
}

window.onload = function() {
    loadProjectsFromLocalStorage();
};
