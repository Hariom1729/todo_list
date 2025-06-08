const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (text) {
    addTodoItem(text);
    todoInput.value = '';
    todoInput.focus();
  }
});

todoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

function addTodoItem(text) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = text;

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'todo-actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actionsDiv);
  todoList.appendChild(li);

  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(li);
  });

  editBtn.addEventListener('click', () => {
    if (li.classList.contains('editing')) return;

    li.classList.add('editing');

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = span.textContent;

    li.insertBefore(input, span);
    li.removeChild(span);

    editBtn.textContent = 'Save';
    editBtn.classList.add('save-btn');

    input.focus();

    editBtn.onclick = () => {
      const newText = input.value.trim();
      if (newText) {
        span.textContent = newText;
        li.insertBefore(span, input);
        li.removeChild(input);
        li.classList.remove('editing');

        editBtn.textContent = 'Edit';
        editBtn.classList.remove('save-btn');

        editBtn.onclick = () => editBtn.dispatchEvent(new Event('click'));
      } else {
        alert('Task cannot be empty!');
        input.focus();
      }
    };

    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        editBtn.click();
      }
    });
  });
}
