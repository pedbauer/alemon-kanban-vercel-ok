import React, { useState } from 'react';

const initialColumns = {
  "A Fazer": [],
  "Em Andamento": [],
  "Concluído": [],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setColumns({
      ...columns,
      "A Fazer": [...columns["A Fazer"], { id: Date.now(), title: newTask }],
    });
    setNewTask('');
  };

  const moveTask = (task, from, to) => {
    setColumns(prev => {
      const updatedFrom = prev[from].filter(t => t.id !== task.id);
      const updatedTo = [...prev[to], task];
      return { ...prev, [from]: updatedFrom, [to]: updatedTo };
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '1rem' }}>
      {Object.entries(columns).map(([columnName, tasks]) => (
        <div key={columnName}>
          <h2>{columnName}</h2>
          <div style={{ background: '#f0f0f0', minHeight: '200px', padding: '0.5rem' }}>
            {tasks.map(task => (
              <div key={task.id} style={{ background: 'white', padding: '0.5rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>{task.title}</span>
                <div>
                  {columnName !== "A Fazer" && (
                    <button onClick={() => moveTask(task, columnName, "A Fazer")}>◀️</button>
                  )}
                  {columnName !== "Concluído" && (
                    <button onClick={() => moveTask(task, columnName, "Concluído")}>✅</button>
                  )}
                  {columnName === "A Fazer" && (
                    <button onClick={() => moveTask(task, columnName, "Em Andamento")}>▶️</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
        <input
          placeholder="Nova tarefa..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={addTask}>Adicionar</button>
      </div>
    </div>
  );
}