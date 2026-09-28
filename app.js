/**
 * 3-Month Transformation Tracker
 * Stage 1: Core State, Storage, Navigation & Profile
 */

const STORAGE_KEY = 'transformation_tracker_v1';

// Дефолтные стартовые данные пользователя
const DEFAULT_STATE = {
  profile: {
    age: 15,
    height: 165,
    weight: 40.0,
    pullups: "1",
    pushups: "6–7",
    squats: "50+",
    plank: "1–2 мин"
  },
  weightHistory: [
    { id: 'w-init', date: new Date().toISOString().split('T')[0], weight: 40.0 }
  ],
  workouts: [
    {
      id: 'w-upper-a',
      title: 'Upper A',
      dayOfWeek: 1, // Понедельник
      dayName: 'Понедельник',
      exercises: [
        { id: 'e-1', name: 'Pull-ups / Assisted Pull-ups', sets: 3, targetReps: '5–8', targetWeight: 0 },
        { id: 'e-2', name: 'Band Row', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-3', name: 'Push-ups', sets: 3, targetReps: '6–10', targetWeight: 0 },
        { id: 'e-4', name: 'Band Curl', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-5', name: 'Band Triceps Extension', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-6', name: 'Lateral Raise', sets: 3, targetReps: '12–15', targetWeight: 0 },
        { id: 'e-7', name: 'Plank', sets: 3, targetReps: '45–60 сек', targetWeight: 0 }
      ]
    },
    {
      id: 'w-fb-a',
      title: 'Full Body A',
      dayOfWeek: 3, // Среда
      dayName: 'Среда',
      exercises: [
        { id: 'e-21', name: 'Squats', sets: 3, targetReps: '15–20', targetWeight: 0 },
        { id: 'e-22', name: 'Push-ups', sets: 3, targetReps: '6–10', targetWeight: 0 },
        { id: 'e-23', name: 'Band Row', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-24', name: 'Reverse Lunges', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-25', name: 'Glute Bridge', sets: 3, targetReps: '15', targetWeight: 0 },
        { id: 'e-26', name: 'Band Curl', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-27', name: 'Plank', sets: 3, targetReps: '45–60 сек', targetWeight: 0 }
      ]
    },
    {
      id: 'w-upper-b',
      title: 'Upper B',
      dayOfWeek: 5, // Пятница
      dayName: 'Пятница',
      exercises: [
        { id: 'e-31', name: 'Assisted Pull-ups', sets: 3, targetReps: '6–8', targetWeight: 0 },
        { id: 'e-32', name: 'Face Pull', sets: 3, targetReps: '12–15', targetWeight: 0 },
        { id: 'e-33', name: 'Push-ups', sets: 3, targetReps: '6–10', targetWeight: 0 },
        { id: 'e-34', name: 'Band Shoulder Press', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-35', name: 'Band Curl', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-36', name: 'Band Triceps Extension', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-37', name: 'Lateral Raise', sets: 3, targetReps: '12–15', targetWeight: 0 }
      ]
    },
    {
      id: 'w-fb-b',
      title: 'Full Body B',
      dayOfWeek: 0, // Воскресенье
      dayName: 'Воскресенье',
      exercises: [
        { id: 'e-41', name: 'Backpack Squat', sets: 3, targetReps: '12–15', targetWeight: 5 },
        { id: 'e-42', name: 'Push-ups', sets: 3, targetReps: '6–10', targetWeight: 0 },
        { id: 'e-43', name: 'One-arm Band Row', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-44', name: 'Backpack Romanian Deadlift', sets: 3, targetReps: '12', targetWeight: 5 },
        { id: 'e-45', name: 'Calf Raises', sets: 3, targetReps: '20', targetWeight: 0 },
        { id: 'e-46', name: 'Band Curl', sets: 3, targetReps: '10–12', targetWeight: 0 },
        { id: 'e-47', name: 'Dead Bug', sets: 3, targetReps: '10', targetWeight: 0 }
      ]
    }
  ],
  workoutLogs: [],
  dailyLogs: {}
};

// Глобальное состояние
let appState = loadState();

// -------------------------------------------------------------
// Хранилище (LocalStorage)
// -------------------------------------------------------------
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (err) {
    console.error('Ошибка загрузки данных из LocalStorage:', err);
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (err) {
    console.error('Ошибка сохранения данных:', err);
  }
}

// -------------------------------------------------------------
// Навигация по вкладкам
// -------------------------------------------------------------
function setupNavigation() {
  const navButtons = document.querySelectorAll('.bottom-nav .nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  // Активация кнопки
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Активация секции
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.toggle('active', view.id === tabId);
  });

  // Обновляем данные на вкладке при переключении
  if (tabId === 'tab-dashboard') {
    renderDashboard();
  } else if (tabId === 'tab-workouts') {
    renderWorkoutsList();
  } else if (tabId === 'tab-log') {
    renderLogTab();
  } else if (tabId === 'tab-progress') {
    renderProgressTab();
  } else if (tabId === 'tab-daily') {
    renderDailyTab();
  }
}

// -------------------------------------------------------------
// Рендеринг Dashboard
// -------------------------------------------------------------
function renderDashboard() {
  const { profile, weightHistory, workoutLogs, workouts } = appState;

  // Текущий вес
  const currentWeight = weightHistory.length > 0 
    ? weightHistory[weightHistory.length - 1].weight 
    : profile.weight;
  
  const initialWeight = weightHistory.length > 0 
    ? weightHistory[0].weight 
    : profile.weight;

  const diff = (currentWeight - initialWeight).toFixed(1);
  const diffSign = diff > 0 ? `+${diff}` : `${diff}`;

  const weightElem = document.getElementById('dashCurrentWeight');
  if (weightElem) {
    weightElem.innerHTML = `${currentWeight.toFixed(1)} <span class="stat-unit">кг</span>`;
  }

  const weightDiffElem = document.getElementById('dashWeightDiff');
  if (weightDiffElem) {
    weightDiffElem.textContent = `Старт: ${initialWeight} кг (${diffSign} кг)`;
  }

  // Ближайшая тренировка (по дню недели)
  const todayDay = new Date().getDay(); // 0 - воскресенье, 1 - понедельник...
  const upcoming = findNextWorkout(workouts, todayDay);
  if (upcoming) {
    document.getElementById('dashNextWorkout').textContent = upcoming.title;
    document.getElementById('dashNextWorkoutDay').textContent = upcoming.dayName;
  }

  // Тренировок за текущую неделю
  const weekCount = getWeekWorkoutsCount(workoutLogs);
  document.getElementById('dashWeekWorkouts').innerHTML = `${weekCount} <span class="stat-unit">из ${workouts.length}</span>`;

  // Последняя выполненная тренировка
  if (workoutLogs.length > 0) {
    const lastLog = workoutLogs[workoutLogs.length - 1];
    document.getElementById('dashLastWorkout').textContent = lastLog.workoutTitle;
    document.getElementById('dashLastWorkoutDate').textContent = formatDate(lastLog.date);
  } else {
    document.getElementById('dashLastWorkout').textContent = '—';
    document.getElementById('dashLastWorkoutDate').textContent = 'Тренировок пока нет';
  }

  // Профиль и силовые показатели
  renderProfile();

  // Графики дашборда (Этап 4)
  renderDashboardCharts();
}

function renderProfile() {
  const { profile } = appState;
  const container = document.getElementById('profileDisplay');
  if (!container) return;

  container.innerHTML = `
    <div class="profile-stat-item">
      <span class="p-label">Возраст</span>
      <span class="p-val">${profile.age} лет</span>
    </div>
    <div class="profile-stat-item">
      <span class="p-label">Рост</span>
      <span class="p-val">${profile.height} см</span>
    </div>
    <div class="profile-stat-item">
      <span class="p-label">Вес</span>
      <span class="p-val">${profile.weight} кг</span>
    </div>
    <div class="profile-stat-item">
      <span class="p-label">Подтягивания</span>
      <span class="p-val">${profile.pullups}</span>
    </div>
    <div class="profile-stat-item">
      <span class="p-label">Отжимания</span>
      <span class="p-val">${profile.pushups}</span>
    </div>
    <div class="profile-stat-item">
      <span class="p-label">Приседания</span>
      <span class="p-val">${profile.squats}</span>
    </div>
    <div class="profile-stat-item">
      <span class="p-label">Планка</span>
      <span class="p-val">${profile.plank}</span>
    </div>
  `;
}

function findNextWorkout(workouts, currentDay) {
  if (!workouts || workouts.length === 0) return null;
  // Сортируем дни относительно сегодня
  const sorted = [...workouts].sort((a, b) => {
    const diffA = (a.dayOfWeek - currentDay + 7) % 7;
    const diffB = (b.dayOfWeek - currentDay + 7) % 7;
    return diffA - diffB;
  });
  return sorted[0];
}

function getWeekWorkoutsCount(logs) {
  if (!logs || logs.length === 0) return 0;
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = now.getDay() || 7; // понедельник = 1
  startOfWeek.setDate(now.getDate() - day + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  return logs.filter(log => new Date(log.date) >= startOfWeek).length;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

const DAYS_MAP = {
  0: 'Воскресенье',
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  '-1': 'Без привязки'
};

// -------------------------------------------------------------
// Управление тренировками (Workouts CRUD)
// -------------------------------------------------------------
function renderWorkoutsList() {
  const container = document.getElementById('workoutsList');
  if (!container) return;

  if (!appState.workouts || appState.workouts.length === 0) {
    container.innerHTML = `
      <div class="placeholder-box" style="grid-column: 1 / -1;">
        Тренировки пока не созданы. Нажмите «+ Новая тренировка», чтобы добавить первую программу.
      </div>
    `;
    return;
  }

  container.innerHTML = appState.workouts.map(workout => {
    const dayLabel = DAYS_MAP[workout.dayOfWeek] || 'Без привязки';
    const exercisesHtml = workout.exercises && workout.exercises.length > 0
      ? workout.exercises.map((ex, idx) => `
          <li class="exercise-preview-item">
            <span class="exercise-preview-name">
              <span class="ex-num">${idx + 1}.</span>
              ${escapeHtml(ex.name)}
            </span>
            <span class="exercise-preview-details">
              ${ex.sets} подх. &bull; ${escapeHtml(ex.targetReps || '8-10')} ${ex.targetWeight > 0 ? `&bull; ${ex.targetWeight} кг` : ''}
            </span>
          </li>
        `).join('')
      : '<li class="exercise-preview-item"><span class="exercise-preview-details">Нет упражнений</span></li>';

    return `
      <div class="workout-card" data-id="${workout.id}">
        <div>
          <div class="workout-header">
            <div>
              <h3 class="workout-card-title">${escapeHtml(workout.title)}</h3>
              <span class="exercise-preview-details">${workout.exercises ? workout.exercises.length : 0} упражнений</span>
            </div>
            <span class="day-tag">${dayLabel}</span>
          </div>

          <ul class="exercise-preview-list">
            ${exercisesHtml}
          </ul>
        </div>

        <div class="workout-card-actions">
          <button class="btn-primary btn-sm start-workout-btn" data-id="${workout.id}">Начать</button>
          <button class="btn-outline btn-sm edit-workout-btn" data-id="${workout.id}">Изменить</button>
          <button class="btn-ghost btn-sm text-danger delete-workout-card-btn" data-id="${workout.id}">Удалить</button>
        </div>
      </div>
    `;
  }).join('');

  // Навешиваем слушатели на кнопки карточек
  container.querySelectorAll('.edit-workout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const workout = appState.workouts.find(w => w.id === id);
      if (workout) openWorkoutModal(workout);
    });
  });

  container.querySelectorAll('.delete-workout-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteWorkout(id);
    });
  });

  container.querySelectorAll('.start-workout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      startWorkoutLog(id);
    });
  });
}

function openWorkoutModal(workout = null) {
  const modal = document.getElementById('workoutModal');
  const titleElem = document.getElementById('workoutModalTitle');
  const idInput = document.getElementById('editWorkoutId');
  const titleInput = document.getElementById('workoutTitleInput');
  const daySelect = document.getElementById('workoutDaySelect');
  const deleteBtn = document.getElementById('deleteWorkoutBtn');
  const itemsContainer = document.getElementById('exerciseItemsContainer');

  itemsContainer.innerHTML = '';

  if (workout) {
    titleElem.textContent = 'Редактировать тренировку';
    idInput.value = workout.id;
    titleInput.value = workout.title;
    daySelect.value = workout.dayOfWeek !== undefined ? workout.dayOfWeek : 1;
    deleteBtn.classList.remove('hidden');

    if (workout.exercises && workout.exercises.length > 0) {
      workout.exercises.forEach((ex, idx) => {
        itemsContainer.appendChild(createExerciseRowElement(ex, idx + 1));
      });
    } else {
      itemsContainer.appendChild(createExerciseRowElement({ name: '', sets: 3, targetReps: '8–10', targetWeight: 0 }, 1));
    }
  } else {
    titleElem.textContent = 'Новая тренировка';
    idInput.value = '';
    titleInput.value = '';
    daySelect.value = '1';
    deleteBtn.classList.add('hidden');
    itemsContainer.appendChild(createExerciseRowElement({ name: '', sets: 3, targetReps: '8–10', targetWeight: 0 }, 1));
  }

  updateExerciseRowIndices();
  modal.classList.remove('hidden');
}

function closeWorkoutModal() {
  document.getElementById('workoutModal').classList.add('hidden');
}

function createExerciseRowElement(ex, index) {
  const row = document.createElement('div');
  row.className = 'exercise-edit-row';
  row.dataset.id = ex.id || ('e-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4));

  row.innerHTML = `
    <span class="ex-drag-index">${index}</span>
    <input type="text" class="ex-name-input" placeholder="Название упражнения" value="${escapeHtml(ex.name || '')}" required>
    <div style="display: flex; align-items: center; gap: 4px;">
      <input type="number" class="ex-sets-input" placeholder="Подходы" min="1" max="20" value="${ex.sets || 3}" title="Количество подходов">
      <span style="font-size:0.75rem; color:var(--text-muted);">подх</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px;">
      <input type="text" class="ex-reps-input" placeholder="Повторения" value="${escapeHtml(ex.targetReps || '8–10')}" title="Повторения (например, 8-10 или 45 сек)">
      <span style="font-size:0.75rem; color:var(--text-muted);">повт</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px;">
      <input type="number" class="ex-weight-input" placeholder="Вес" step="0.5" min="0" value="${ex.targetWeight || 0}" title="Вес снаряда в кг (0 = свой вес)">
      <span style="font-size:0.75rem; color:var(--text-muted);">кг</span>
    </div>
    <div class="ex-row-actions">
      <button type="button" class="btn-icon move-up-btn" title="Переместить выше">▲</button>
      <button type="button" class="btn-icon move-down-btn" title="Переместить ниже">▼</button>
      <button type="button" class="btn-icon delete-ex-btn" title="Удалить упражнение">&times;</button>
    </div>
  `;

  // Кнопки перемещения
  row.querySelector('.move-up-btn').addEventListener('click', () => {
    if (row.previousElementSibling) {
      row.parentNode.insertBefore(row, row.previousElementSibling);
      updateExerciseRowIndices();
    }
  });

  row.querySelector('.move-down-btn').addEventListener('click', () => {
    if (row.nextElementSibling) {
      row.parentNode.insertBefore(row.nextElementSibling, row);
      updateExerciseRowIndices();
    }
  });

  // Кнопка удаления упражнения
  row.querySelector('.delete-ex-btn').addEventListener('click', () => {
    const parent = row.parentNode;
    if (parent.children.length <= 1) {
      alert('Тренировка должна содержать хотя бы одно упражнение.');
      return;
    }
    row.remove();
    updateExerciseRowIndices();
  });

  return row;
}

function updateExerciseRowIndices() {
  const container = document.getElementById('exerciseItemsContainer');
  if (!container) return;
  const rows = container.querySelectorAll('.exercise-edit-row');
  rows.forEach((r, idx) => {
    const idxSpan = r.querySelector('.ex-drag-index');
    if (idxSpan) idxSpan.textContent = idx + 1;
  });
}

function deleteWorkout(workoutId) {
  const workout = appState.workouts.find(w => w.id === workoutId);
  if (!workout) return;

  if (confirm(`Удалить программу «${workout.title}»?`)) {
    appState.workouts = appState.workouts.filter(w => w.id !== workoutId);
    saveState();
    renderWorkoutsList();
    renderDashboard();
    closeWorkoutModal();
  }
}

function setupWorkoutManagement() {
  const addBtn = document.getElementById('addWorkoutBtn');
  const closeBtn = document.getElementById('closeWorkoutModal');
  const cancelBtn = document.getElementById('cancelWorkoutBtn');
  const deleteBtn = document.getElementById('deleteWorkoutBtn');
  const addExerciseBtn = document.getElementById('addExerciseRowBtn');
  const form = document.getElementById('workoutForm');

  addBtn?.addEventListener('click', () => openWorkoutModal(null));
  closeBtn?.addEventListener('click', closeWorkoutModal);
  cancelBtn?.addEventListener('click', closeWorkoutModal);

  deleteBtn?.addEventListener('click', () => {
    const workoutId = document.getElementById('editWorkoutId').value;
    if (workoutId) deleteWorkout(workoutId);
  });

  addExerciseBtn?.addEventListener('click', () => {
    const container = document.getElementById('exerciseItemsContainer');
    const newIdx = container.children.length + 1;
    container.appendChild(createExerciseRowElement({ name: '', sets: 3, targetReps: '8–10', targetWeight: 0 }, newIdx));
    updateExerciseRowIndices();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const workoutId = document.getElementById('editWorkoutId').value;
    const title = document.getElementById('workoutTitleInput').value.trim();
    const dayOfWeek = parseInt(document.getElementById('workoutDaySelect').value, 10);
    const dayName = DAYS_MAP[dayOfWeek] || 'Без привязки';

    const exerciseRows = document.querySelectorAll('#exerciseItemsContainer .exercise-edit-row');
    const exercises = [];

    exerciseRows.forEach((r, idx) => {
      const name = r.querySelector('.ex-name-input').value.trim();
      const sets = parseInt(r.querySelector('.ex-sets-input').value, 10) || 3;
      const targetReps = r.querySelector('.ex-reps-input').value.trim() || '8–10';
      const targetWeight = parseFloat(r.querySelector('.ex-weight-input').value) || 0;

      if (name) {
        exercises.push({
          id: r.dataset.id || ('e-' + Date.now() + '-' + idx),
          name,
          sets,
          targetReps,
          targetWeight
        });
      }
    });

    if (exercises.length === 0) {
      alert('Добавьте хотя бы одно упражнение с названием.');
      return;
    }

    if (workoutId) {
      // Обновление существующей тренировки
      const existingIdx = appState.workouts.findIndex(w => w.id === workoutId);
      if (existingIdx !== -1) {
        appState.workouts[existingIdx] = {
          ...appState.workouts[existingIdx],
          title,
          dayOfWeek,
          dayName,
          exercises
        };
      }
    } else {
      // Новая тренировка
      appState.workouts.push({
        id: 'w-' + Date.now(),
        title,
        dayOfWeek,
        dayName,
        exercises
      });
    }

    saveState();
    renderWorkoutsList();
    renderDashboard();
    closeWorkoutModal();
  });
}

// -------------------------------------------------------------
// ЭТАП 3: Запись выполненных подходов (Workout Logging)
// -------------------------------------------------------------
let activeWorkoutSession = null;

function setupLogModule() {
  const selectDropdown = document.getElementById('selectWorkoutForLog');
  const startBtn = document.getElementById('startSelectedWorkoutBtn');
  const cancelBtn = document.getElementById('cancelActiveWorkoutBtn');
  const completeBtn = document.getElementById('completeWorkoutBtn');

  startBtn?.addEventListener('click', () => {
    const selectedId = selectDropdown.value;
    if (selectedId) {
      startWorkoutLog(selectedId);
    }
  });

  cancelBtn?.addEventListener('click', cancelActiveWorkout);
  completeBtn?.addEventListener('click', completeWorkout);
}

function renderLogTab() {
  const selectDropdown = document.getElementById('selectWorkoutForLog');
  const quickList = document.getElementById('logQuickWorkoutsList');
  const emptyState = document.getElementById('logEmptyState');
  const activeView = document.getElementById('activeWorkoutView');

  // Заполняем выпадающий список
  if (selectDropdown) {
    if (!appState.workouts || appState.workouts.length === 0) {
      selectDropdown.innerHTML = '<option value="">Сначала создайте тренировку</option>';
    } else {
      selectDropdown.innerHTML = appState.workouts.map(w => `
        <option value="${w.id}">${escapeHtml(w.title)} (${DAYS_MAP[w.dayOfWeek] || 'Без дня'})</option>
      `).join('');
    }
  }

  // Заполняем быстрые кнопки выбора
  if (quickList) {
    if (!appState.workouts || appState.workouts.length === 0) {
      quickList.innerHTML = '<p class="text-muted">Программы не найдены. Создайте их во вкладке «План».</p>';
    } else {
      quickList.innerHTML = appState.workouts.map(w => `
        <button type="button" class="btn-quick-workout" data-id="${w.id}">
          <span class="qw-title">${escapeHtml(w.title)}</span>
          <span class="qw-day">${DAYS_MAP[w.dayOfWeek] || 'Без дня'} &bull; ${w.exercises ? w.exercises.length : 0} упр.</span>
        </button>
      `).join('');

      quickList.querySelectorAll('.btn-quick-workout').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          startWorkoutLog(id);
        });
      });
    }
  }

  // Переключение видимости в зависимости от активной сессии
  if (activeWorkoutSession) {
    emptyState.classList.add('hidden');
    activeView.classList.remove('hidden');
    renderActiveWorkoutView();
  } else {
    emptyState.classList.remove('hidden');
    activeView.classList.add('hidden');
  }
}

function startWorkoutLog(workoutId) {
  const workout = appState.workouts.find(w => w.id === workoutId);
  if (!workout) {
    alert('Тренировка не найдена.');
    return;
  }

  const todayStr = new Date().toISOString().split('T')[0];

  activeWorkoutSession = {
    workoutId: workout.id,
    title: workout.title,
    dayName: DAYS_MAP[workout.dayOfWeek] || 'Без привязки',
    date: todayStr,
    exercises: (workout.exercises || []).map((ex, exIdx) => {
      const setsCount = ex.sets || 3;
      const sets = [];
      for (let s = 1; s <= setsCount; s++) {
        sets.push({
          setNum: s,
          reps: '',
          weight: ex.targetWeight || 0,
          completed: false
        });
      }
      return {
        id: ex.id || `ex-${exIdx}`,
        name: ex.name,
        targetReps: ex.targetReps || '8–10',
        targetWeight: ex.targetWeight || 0,
        sets
      };
    })
  };

  switchTab('tab-log');
  renderLogTab();
}

function renderActiveWorkoutView() {
  if (!activeWorkoutSession) return;

  document.getElementById('activeWorkoutTitle').textContent = activeWorkoutSession.title;
  document.getElementById('activeWorkoutBadge').textContent = activeWorkoutSession.dayName;
  
  const dateInput = document.getElementById('logDateInput');
  if (dateInput) {
    dateInput.value = activeWorkoutSession.date;
    dateInput.onchange = (e) => {
      activeWorkoutSession.date = e.target.value;
    };
  }

  const container = document.getElementById('activeExercisesContainer');
  if (!container) return;

  container.innerHTML = activeWorkoutSession.exercises.map((ex, exIdx) => {
    const setsRowsHtml = ex.sets.map((set, sIdx) => `
      <tr class="set-row ${set.completed ? 'completed' : ''}" data-ex="${exIdx}" data-set="${sIdx}">
        <td style="width: 40px;">
          <span class="set-idx-badge">${set.setNum}</span>
        </td>
        <td>
          <input type="number" class="set-input-box rep-input" placeholder="0" min="0" max="999" value="${set.reps}">
        </td>
        <td>
          <input type="number" class="set-input-box weight-input" placeholder="0" step="0.5" min="0" value="${set.weight}">
        </td>
        <td style="width: 50px; text-align: center;">
          <button type="button" class="btn-check-set ${set.completed ? 'active' : ''}" title="Отметить выполненным">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </button>
        </td>
        <td style="width: 36px; text-align: right;">
          <button type="button" class="btn-icon delete-set-btn" title="Удалить подход">&times;</button>
        </td>
      </tr>
    `).join('');

    return `
      <div class="exercise-log-card" data-ex-idx="${exIdx}">
        <div class="exercise-log-header">
          <h3 class="exercise-log-title">${escapeHtml(ex.name)}</h3>
          <span class="exercise-log-target">Цель: ${escapeHtml(ex.targetReps)} ${ex.targetWeight > 0 ? `&bull; ${ex.targetWeight} кг` : ''}</span>
        </div>

        <table class="sets-table">
          <thead>
            <tr>
              <th>Сет</th>
              <th>Повт.</th>
              <th>Вес (кг)</th>
              <th style="text-align: center;">Готово</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${setsRowsHtml}
          </tbody>
        </table>

        <button type="button" class="btn-ghost btn-sm add-set-btn" style="margin-top: 10px;" data-ex-idx="${exIdx}">
          + Добавить подход
        </button>
      </div>
    `;
  }).join('');

  // Слушатели на поля ввода и кнопки внутри карточек упражнений
  container.querySelectorAll('.set-row').forEach(row => {
    const exIdx = parseInt(row.dataset.ex, 10);
    const setIdx = parseInt(row.dataset.set, 10);
    const repInput = row.querySelector('.rep-input');
    const weightInput = row.querySelector('.weight-input');
    const checkBtn = row.querySelector('.btn-check-set');
    const deleteBtn = row.querySelector('.delete-set-btn');

    repInput?.addEventListener('input', (e) => {
      activeWorkoutSession.exercises[exIdx].sets[setIdx].reps = e.target.value;
    });

    weightInput?.addEventListener('input', (e) => {
      activeWorkoutSession.exercises[exIdx].sets[setIdx].weight = parseFloat(e.target.value) || 0;
    });

    checkBtn?.addEventListener('click', () => {
      const current = activeWorkoutSession.exercises[exIdx].sets[setIdx].completed;
      activeWorkoutSession.exercises[exIdx].sets[setIdx].completed = !current;
      row.classList.toggle('completed', !current);
      checkBtn.classList.toggle('active', !current);
    });

    deleteBtn?.addEventListener('click', () => {
      if (activeWorkoutSession.exercises[exIdx].sets.length <= 1) {
        alert('В упражнении должен оставаться хотя бы 1 подход.');
        return;
      }
      activeWorkoutSession.exercises[exIdx].sets.splice(setIdx, 1);
      // Пересчитываем номера
      activeWorkoutSession.exercises[exIdx].sets.forEach((s, i) => s.setNum = i + 1);
      renderActiveWorkoutView();
    });
  });

  // Кнопка добавления подхода
  container.querySelectorAll('.add-set-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const exIdx = parseInt(btn.dataset.exIdx, 10);
      const exercise = activeWorkoutSession.exercises[exIdx];
      const nextNum = exercise.sets.length + 1;
      const lastWeight = exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1].weight : 0;

      exercise.sets.push({
        setNum: nextNum,
        reps: '',
        weight: lastWeight,
        completed: false
      });
      renderActiveWorkoutView();
    });
  });
}

function cancelActiveWorkout() {
  if (confirm('Отменить текущую запись тренировки? Введённые данные будут очищены.')) {
    activeWorkoutSession = null;
    document.getElementById('logWorkoutNotes').value = '';
    renderLogTab();
  }
}

function completeWorkout() {
  if (!activeWorkoutSession) return;

  // Проверяем, заполнено ли хотя бы одно повторение
  let hasAnyReps = false;
  activeWorkoutSession.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      if (s.reps && parseInt(s.reps, 10) > 0) {
        hasAnyReps = true;
      }
    });
  });

  if (!hasAnyReps) {
    if (!confirm('Вы не указали количество повторений ни для одного подхода. Всё равно сохранить тренировку?')) {
      return;
    }
  }

  const noteInput = document.getElementById('logWorkoutNotes');
  const noteText = noteInput ? noteInput.value.trim() : '';

  // Формируем чистый объект записи для истории
  const loggedWorkout = {
    id: 'log-' + Date.now(),
    workoutId: activeWorkoutSession.workoutId,
    workoutTitle: activeWorkoutSession.title,
    date: activeWorkoutSession.date || new Date().toISOString().split('T')[0],
    note: noteText,
    exercises: activeWorkoutSession.exercises.map(ex => ({
      name: ex.name,
      sets: ex.sets
        .filter(s => s.reps !== '' || s.completed)
        .map(s => ({
          setNum: s.setNum,
          reps: parseInt(s.reps, 10) || 0,
          weight: parseFloat(s.weight) || 0,
          completed: s.completed
        }))
    }))
  };

  // Сохраняем в историю
  if (!appState.workoutLogs) appState.workoutLogs = [];
  appState.workoutLogs.push(loggedWorkout);
  saveState();

  const title = activeWorkoutSession.title;
  activeWorkoutSession = null;
  if (noteInput) noteInput.value = '';

  alert(`Отлично! Тренировка «${title}» успешно завершена и сохранена в историю.`);

  // Обновляем дашборд и переходим на него
  renderDashboard();
  switchTab('tab-dashboard');
}

// -------------------------------------------------------------
// ЭТАП 4: История и прогресс (Charts & Progress Analytics)
// -------------------------------------------------------------

function renderSvgLineChart(containerId, points, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!points || points.length === 0) {
    container.innerHTML = '<div class="text-muted" style="font-size:0.82rem; padding: 24px; text-align:center;">Недостаточно данных для графика</div>';
    return;
  }

  const isMini = !!options.isMini;
  const width = isMini ? 320 : 540;
  const height = isMini ? 150 : 200;
  const padding = {
    top: 15,
    right: 20,
    bottom: isMini ? 24 : 28,
    left: isMini ? 35 : 42
  };

  const values = points.map(p => Number(p.value));
  let minVal = Math.min(...values);
  let maxVal = Math.max(...values);

  if (minVal === maxVal) {
    minVal = Math.max(0, minVal - 2);
    maxVal = maxVal + 2;
  } else {
    const margin = (maxVal - minVal) * 0.15;
    minVal = Math.max(0, minVal - margin);
    maxVal = maxVal + margin;
  }

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const getX = (idx) => {
    if (points.length === 1) return padding.left + chartW / 2;
    return padding.left + (idx / (points.length - 1)) * chartW;
  };

  const getY = (val) => {
    return padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
  };

  // Горизонтальные направляющие сетки
  const gridSteps = isMini ? 2 : 3;
  let gridLinesHtml = '';
  for (let i = 0; i <= gridSteps; i++) {
    const ratio = i / gridSteps;
    const y = padding.top + chartH * (1 - ratio);
    const valLabel = (minVal + ratio * (maxVal - minVal)).toFixed(options.decimals !== undefined ? options.decimals : 1);
    gridLinesHtml += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="svg-grid-line" />
      <text x="${padding.left - 6}" y="${y + 3}" text-anchor="end" font-size="9" fill="var(--text-muted)">${valLabel}</text>
    `;
  }

  // Расчёт точек и кривой
  const coords = points.map((p, idx) => ({ x: getX(idx), y: getY(p.value), p }));
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    pathD += ` L ${coords[i].x} ${coords[i].y}`;
  }

  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${padding.top + chartH} L ${coords[0].x} ${padding.top + chartH} Z`;
  const gradId = 'grad-' + containerId.replace(/[^a-zA-Z0-9]/g, '');

  const pointsHtml = coords.map(c => `
    <circle cx="${c.x}" cy="${c.y}" r="${isMini ? '3.5' : '4.5'}" class="svg-data-point">
      <title>${c.p.label}: ${c.p.tooltip || (c.p.value + (options.unit || ''))}</title>
    </circle>
    <text x="${c.x}" y="${height - 6}" text-anchor="middle" font-size="8.5" fill="var(--text-muted)">${c.p.label}</text>
  `).join('');

  container.innerHTML = `
    <svg class="svg-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      ${gridLinesHtml}
      <path d="${areaD}" fill="url(#${gradId})" />
      <path d="${pathD}" class="svg-data-path" />
      ${pointsHtml}
    </svg>
  `;
}

function renderDashboardCharts() {
  // 1. Мини-график веса на дашборде
  const weightPoints = (appState.weightHistory || [])
    .slice(-7)
    .map(w => ({
      label: formatDate(w.date),
      value: w.weight,
      tooltip: `${w.weight} кг`
    }));

  const countBadge = document.getElementById('dashWeightPointsCount');
  if (countBadge) {
    countBadge.textContent = `${appState.weightHistory ? appState.weightHistory.length : 0} записей`;
  }
  renderSvgLineChart('dashWeightChart', weightPoints, { isMini: true, unit: ' кг', decimals: 1 });

  // 2. Мини-график силового прогресса (например, по Push-ups или первому упражнению из логов)
  const targetExerciseName = 'Push-ups';
  const exPoints = getExerciseProgressPoints(targetExerciseName).slice(-6);

  const progSummaryElem = document.getElementById('dashProgressSummary');
  if (progSummaryElem) {
    if (exPoints.length > 0) {
      const best = Math.max(...exPoints.map(p => p.value));
      progSummaryElem.textContent = `Рекорд: ${best} повт.`;
    } else {
      progSummaryElem.textContent = 'Ждёт первой записи';
    }
  }
  renderSvgLineChart('dashProgressChart', exPoints, { isMini: true, unit: ' повт', decimals: 0 });
}

function getExerciseProgressPoints(exerciseName) {
  if (!appState.workoutLogs || appState.workoutLogs.length === 0) return [];
  const points = [];

  // Сортируем по дате по возрастанию
  const sortedLogs = [...appState.workoutLogs].sort((a, b) => new Date(a.date) - new Date(b.date));

  sortedLogs.forEach(log => {
    const ex = log.exercises?.find(e => e.name.toLowerCase().trim() === exerciseName.toLowerCase().trim());
    if (ex && ex.sets && ex.sets.length > 0) {
      // Ищем максимальное число повторений в подходе
      const maxReps = Math.max(...ex.sets.map(s => s.reps || 0));
      if (maxReps > 0) {
        points.push({
          label: formatDate(log.date),
          value: maxReps,
          tooltip: `Макс: ${maxReps} повт. (${ex.sets.length} подх.)`
        });
      }
    }
  });

  return points;
}

function setupProgressModule() {
  const addWeightForm = document.getElementById('addWeightForm');
  const dateInput = document.getElementById('weightInputDate');
  const exSelect = document.getElementById('exerciseProgressSelect');

  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  addWeightForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('weightInputDate').value;
    const val = parseFloat(document.getElementById('weightInputValue').value);
    if (!date || isNaN(val)) return;

    if (!appState.weightHistory) appState.weightHistory = [];
    appState.weightHistory.push({
      id: 'w-' + Date.now(),
      date,
      weight: val
    });

    // Сортируем по дате
    appState.weightHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
    appState.profile.weight = val; // Синхронизируем текущий вес
    saveState();

    document.getElementById('weightInputValue').value = '';
    renderProgressTab();
    renderDashboard();
  });

  exSelect?.addEventListener('change', () => {
    renderExerciseProgressDetails(exSelect.value);
  });
}

function renderProgressTab() {
  renderWeightSection();
  renderExerciseProgressSection();
  renderWorkoutHistorySection();
}

function renderWeightSection() {
  const history = appState.weightHistory || [];
  history.sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartPoints = history.map(w => ({
    label: formatDate(w.date),
    value: w.weight,
    tooltip: `${w.weight} кг`
  }));

  renderSvgLineChart('progressWeightChart', chartPoints, { isMini: false, unit: ' кг', decimals: 1 });

  // Список записей веса
  const countElem = document.getElementById('weightEntriesCount');
  if (countElem) countElem.textContent = history.length;

  const listContainer = document.getElementById('weightEntriesList');
  if (listContainer) {
    listContainer.innerHTML = history.slice().reverse().map(w => `
      <div class="weight-tag-item">
        <span>${formatDate(w.date)}: <strong>${w.weight} кг</strong></span>
        <span class="del-weight-btn" data-id="${w.id}" title="Удалить запись">&times;</span>
      </div>
    `).join('');

    listContainer.querySelectorAll('.del-weight-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        deleteWeightEntry(id);
      });
    });
  }
}

function deleteWeightEntry(weightId) {
  if (confirm('Удалить эту запись веса?')) {
    appState.weightHistory = (appState.weightHistory || []).filter(w => w.id !== weightId);
    if (appState.weightHistory.length > 0) {
      appState.profile.weight = appState.weightHistory[appState.weightHistory.length - 1].weight;
    }
    saveState();
    renderProgressTab();
    renderDashboard();
  }
}

function renderExerciseProgressSection() {
  const select = document.getElementById('exerciseProgressSelect');
  if (!select) return;

  // Собираем все уникальные названия упражнений из программ и истории
  const exerciseNamesSet = new Set();
  (appState.workouts || []).forEach(w => {
    (w.exercises || []).forEach(e => exerciseNamesSet.add(e.name));
  });
  (appState.workoutLogs || []).forEach(l => {
    (l.exercises || []).forEach(e => exerciseNamesSet.add(e.name));
  });

  const names = Array.from(exerciseNamesSet).sort();
  const currentSelected = select.value;

  select.innerHTML = names.map(n => `
    <option value="${escapeHtml(n)}" ${n === currentSelected ? 'selected' : ''}>${escapeHtml(n)}</option>
  `).join('');

  if (!select.value && names.length > 0) {
    // По умолчанию выбираем Push-ups или первое в списке
    const pushupOption = names.find(n => n.toLowerCase().includes('push-up'));
    select.value = pushupOption || names[0];
  }

  renderExerciseProgressDetails(select.value);
}

function renderExerciseProgressDetails(exerciseName) {
  if (!exerciseName) return;

  const points = getExerciseProgressPoints(exerciseName);
  renderSvgLineChart('exerciseProgressChart', points, { isMini: false, unit: ' повт', decimals: 0 });

  // Сводные карточки
  let best = '—';
  let totalSets = 0;
  let first = '—';
  let current = '—';

  // Считаем все подходы по этому упражнению
  (appState.workoutLogs || []).forEach(log => {
    const ex = log.exercises?.find(e => e.name.toLowerCase().trim() === exerciseName.toLowerCase().trim());
    if (ex && ex.sets) {
      totalSets += ex.sets.length;
    }
  });

  if (points.length > 0) {
    const values = points.map(p => p.value);
    best = Math.max(...values) + ' повт';
    first = points[0].value + ' повт (' + points[0].label + ')';
    current = points[points.length - 1].value + ' повт (' + points[points.length - 1].label + ')';
  }

  document.getElementById('progBestSet').textContent = best;
  document.getElementById('progTotalSets').textContent = totalSets;
  document.getElementById('progFirstScore').textContent = first;
  document.getElementById('progCurrentScore').textContent = current;
}

function renderWorkoutHistorySection() {
  const container = document.getElementById('workoutHistoryList');
  const countBadge = document.getElementById('totalWorkoutsCountBadge');
  if (!container) return;

  const logs = appState.workoutLogs || [];
  if (countBadge) countBadge.textContent = `Всего: ${logs.length}`;

  if (logs.length === 0) {
    container.innerHTML = `
      <div class="placeholder-box">
        История пока пуста. Завершите свою первую тренировку во вкладке «Запись».
      </div>
    `;
    return;
  }

  // Сортируем от новых к старым
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = sortedLogs.map(log => {
    const exercisesHtml = (log.exercises || []).map(ex => {
      const setsStr = (ex.sets || [])
        .map(s => `${s.setNum}-й: ${s.reps} повт ${s.weight > 0 ? `(${s.weight} кг)` : ''}`)
        .join(', ');

      return `
        <div class="history-ex-row">
          <strong>${escapeHtml(ex.name)}</strong>
          <span class="history-sets-text">${setsStr || 'нет записанных подходов'}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="history-item-card" data-id="${log.id}">
        <div class="history-header">
          <div>
            <div class="history-title">${escapeHtml(log.workoutTitle)}</div>
            <div class="history-date">${formatDate(log.date)}</div>
          </div>
          <button class="btn-ghost btn-sm text-danger del-workout-log-btn" data-id="${log.id}" title="Удалить запись из истории">&times; Удалить</button>
        </div>

        ${log.note ? `<div class="history-note">«${escapeHtml(log.note)}»</div>` : ''}

        <div class="history-exercises-summary">
          ${exercisesHtml}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.del-workout-log-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      deleteWorkoutLog(id);
    });
  });
}

function deleteWorkoutLog(logId) {
  if (confirm('Удалить эту выполненную тренировку из истории?')) {
    appState.workoutLogs = (appState.workoutLogs || []).filter(l => l.id !== logId);
    saveState();
    renderProgressTab();
    renderDashboard();
  }
}

// -------------------------------------------------------------
// ЭТАП 5: Питание, сон и режим дня (Daily Tracking)
// -------------------------------------------------------------
let currentDailyDate = new Date().toISOString().split('T')[0];

function calculateSleepMinutes(bedtime, waketime) {
  if (!bedtime || !waketime) return 0;
  const [bH, bM] = bedtime.split(':').map(Number);
  const [wH, wM] = waketime.split(':').map(Number);

  let bedTotalMin = bH * 60 + bM;
  let wakeTotalMin = wH * 60 + wM;

  if (wakeTotalMin < bedTotalMin) {
    wakeTotalMin += 24 * 60; // Переход через полночь (например, 23:00 -> 06:45)
  }

  return wakeTotalMin - bedTotalMin;
}

function formatMinutesToHours(min) {
  if (!min || min <= 0) return '—';
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  if (minutes === 0) return `${hours} ч`;
  return `${hours} ч ${minutes} м`;
}

function getAverageSleepLastWeek() {
  if (!appState.dailyLogs) return null;
  const now = new Date();
  let totalMin = 0;
  let count = 0;

  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const entry = appState.dailyLogs[dateStr];
    if (entry && entry.sleepMinutes > 0) {
      totalMin += entry.sleepMinutes;
      count++;
    }
  }

  if (count === 0) return null;
  return Math.round(totalMin / count);
}

function ensureDailyLogEntry(dateStr) {
  if (!appState.dailyLogs) appState.dailyLogs = {};
  if (!appState.dailyLogs[dateStr]) {
    appState.dailyLogs[dateStr] = {
      bedtime: '',
      waketime: '',
      sleepMinutes: 0,
      meals: {
        breakfast: false,
        lunch: false,
        dinner: false,
        snack: false
      },
      waterMl: 0,
      note: ''
    };
  }
  return appState.dailyLogs[dateStr];
}

function setupDailyModule() {
  const datePicker = document.getElementById('dailyDatePicker');
  const bedtimeInput = document.getElementById('sleepBedtime');
  const waketimeInput = document.getElementById('sleepWaketime');
  const add250Btn = document.getElementById('addWater250Btn');
  const add500Btn = document.getElementById('addWater500Btn');
  const resetWaterBtn = document.getElementById('resetWaterBtn');
  const customNoteInput = document.getElementById('dailyCustomNote');
  const chipsContainer = document.getElementById('quickNotesChips');

  if (datePicker) {
    datePicker.value = currentDailyDate;
    datePicker.addEventListener('change', (e) => {
      currentDailyDate = e.target.value || new Date().toISOString().split('T')[0];
      renderDailyTab();
    });
  }

  // Сон
  const onSleepChange = () => {
    const entry = ensureDailyLogEntry(currentDailyDate);
    entry.bedtime = bedtimeInput.value;
    entry.waketime = waketimeInput.value;
    entry.sleepMinutes = calculateSleepMinutes(entry.bedtime, entry.waketime);
    saveState();
    renderDailySleep();
  };

  bedtimeInput?.addEventListener('change', onSleepChange);
  waketimeInput?.addEventListener('change', onSleepChange);

  // Питание
  ['Breakfast', 'Lunch', 'Dinner', 'Snack'].forEach(meal => {
    const chk = document.getElementById('meal' + meal);
    chk?.addEventListener('change', () => {
      const entry = ensureDailyLogEntry(currentDailyDate);
      if (!entry.meals) entry.meals = {};
      entry.meals[meal.toLowerCase()] = chk.checked;
      saveState();
      updateMealLabelStyle(meal, chk.checked);
    });
  });

  // Вода
  add250Btn?.addEventListener('click', () => {
    const entry = ensureDailyLogEntry(currentDailyDate);
    entry.waterMl = (entry.waterMl || 0) + 250;
    saveState();
    renderDailyWater();
  });

  add500Btn?.addEventListener('click', () => {
    const entry = ensureDailyLogEntry(currentDailyDate);
    entry.waterMl = (entry.waterMl || 0) + 500;
    saveState();
    renderDailyWater();
  });

  resetWaterBtn?.addEventListener('click', () => {
    const entry = ensureDailyLogEntry(currentDailyDate);
    entry.waterMl = 0;
    saveState();
    renderDailyWater();
  });

  // Заметки
  chipsContainer?.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.note;
      const entry = ensureDailyLogEntry(currentDailyDate);
      if (entry.note && !entry.note.includes(text)) {
        entry.note += (entry.note ? ', ' : '') + text;
      } else if (!entry.note) {
        entry.note = text;
      }
      customNoteInput.value = entry.note;
      saveState();
    });
  });

  customNoteInput?.addEventListener('input', (e) => {
    const entry = ensureDailyLogEntry(currentDailyDate);
    entry.note = e.target.value.trim();
    saveState();
  });
}

function renderDailyTab() {
  const entry = ensureDailyLogEntry(currentDailyDate);

  const datePicker = document.getElementById('dailyDatePicker');
  if (datePicker) datePicker.value = currentDailyDate;

  renderDailySleep();
  renderDailyMeals();
  renderDailyWater();

  // Заметки
  const customNoteInput = document.getElementById('dailyCustomNote');
  if (customNoteInput) {
    customNoteInput.value = entry.note || '';
  }
}

function renderDailySleep() {
  const entry = ensureDailyLogEntry(currentDailyDate);
  const bedtimeInput = document.getElementById('sleepBedtime');
  const waketimeInput = document.getElementById('sleepWaketime');
  const resultElem = document.getElementById('sleepCalculatedHours');
  const avgBadge = document.getElementById('sleepAvgWeekBadge');

  if (bedtimeInput) bedtimeInput.value = entry.bedtime || '';
  if (waketimeInput) waketimeInput.value = entry.waketime || '';

  if (resultElem) {
    resultElem.textContent = formatMinutesToHours(entry.sleepMinutes);
  }

  if (avgBadge) {
    const avg = getAverageSleepLastWeek();
    avgBadge.textContent = avg ? `Среднее за неделю: ${formatMinutesToHours(avg)}` : 'Среднее за неделю: нет данных';
  }
}

function renderDailyMeals() {
  const entry = ensureDailyLogEntry(currentDailyDate);
  const meals = entry.meals || {};

  ['Breakfast', 'Lunch', 'Dinner', 'Snack'].forEach(meal => {
    const key = meal.toLowerCase();
    const isChecked = !!meals[key];
    const chk = document.getElementById('meal' + meal);
    if (chk) chk.checked = isChecked;
    updateMealLabelStyle(meal, isChecked);
  });
}

function updateMealLabelStyle(meal, isChecked) {
  const label = document.getElementById('labelMeal' + meal);
  if (label) {
    label.classList.toggle('active', isChecked);
  }
}

function renderDailyWater() {
  const entry = ensureDailyLogEntry(currentDailyDate);
  const totalDisplay = document.getElementById('waterTotalDisplay');
  const container = document.getElementById('waterCupsContainer');

  const currentMl = entry.waterMl || 0;
  if (totalDisplay) {
    totalDisplay.innerHTML = `${currentMl} <span class="stat-unit">мл</span>`;
  }

  // Пресеты порций воды
  if (container) {
    const presets = [250, 500, 750, 1000, 1250, 1500, 2000];
    container.innerHTML = presets.map(ml => `
      <button type="button" class="water-cup-btn ${currentMl >= ml ? 'filled' : ''}" data-ml="${ml}">
        ${ml >= 1000 ? (ml / 1000) + ' л' : ml + ' мл'}
      </button>
    `).join('');

    container.querySelectorAll('.water-cup-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ml = parseInt(btn.dataset.ml, 10);
        entry.waterMl = ml;
        saveState();
        renderDailyWater();
      });
    });
  }
}

// Вспомогательная функция санитизации текста
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// -------------------------------------------------------------
// Модальное окно профиля
// -------------------------------------------------------------
function setupProfileModal() {
  const modal = document.getElementById('profileModal');
  const openBtn = document.getElementById('editProfileBtn');
  const closeBtn = document.getElementById('closeProfileModal');
  const cancelBtn = document.getElementById('cancelProfileBtn');
  const form = document.getElementById('profileForm');

  const openModal = () => {
    const p = appState.profile;
    document.getElementById('profAge').value = p.age;
    document.getElementById('profHeight').value = p.height;
    document.getElementById('profWeight').value = p.weight;
    document.getElementById('profPullups').value = p.pullups || '';
    document.getElementById('profPushups').value = p.pushups || '';
    document.getElementById('profSquats').value = p.squats || '';
    document.getElementById('profPlank').value = p.plank || '';
    modal.classList.remove('hidden');
  };

  const closeModal = () => modal.classList.add('hidden');

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newWeight = parseFloat(document.getElementById('profWeight').value) || appState.profile.weight;

    appState.profile = {
      age: parseInt(document.getElementById('profAge').value) || appState.profile.age,
      height: parseInt(document.getElementById('profHeight').value) || appState.profile.height,
      weight: newWeight,
      pullups: document.getElementById('profPullups').value.trim() || '—',
      pushups: document.getElementById('profPushups').value.trim() || '—',
      squats: document.getElementById('profSquats').value.trim() || '—',
      plank: document.getElementById('profPlank').value.trim() || '—'
    };

    // Если вес изменился, добавляем запись в историю веса
    const lastWeightEntry = appState.weightHistory[appState.weightHistory.length - 1];
    const todayStr = new Date().toISOString().split('T')[0];
    if (!lastWeightEntry || lastWeightEntry.weight !== newWeight) {
      appState.weightHistory.push({
        id: 'w-' + Date.now(),
        date: todayStr,
        weight: newWeight
      });
    }

    saveState();
    renderDashboard();
    closeModal();
  });
}

// -------------------------------------------------------------
// Экспорт / Импорт / Сброс данных
// -------------------------------------------------------------
function setupDataHandlers() {
  // Экспорт
  const exportBtn = document.getElementById('exportBtn');
  exportBtn?.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `transformation_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Импорт
  const importInput = document.getElementById('importFileInput');
  importInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!imported.profile || !imported.workouts) {
          alert('Файл имеет неверный формат резервной копии.');
          return;
        }
        appState = { ...DEFAULT_STATE, ...imported };
        saveState();
        renderDashboard();
        alert('Данные успешно импортированы!');
      } catch (err) {
        alert('Ошибка при чтении JSON-файла: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // Сброс
  const resetBtn = document.getElementById('resetBtn');
  resetBtn?.addEventListener('click', () => {
    if (confirm('Сбросить все данные к исходным? Все ваши записи тренировок будут удалены.')) {
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      saveState();
      renderDashboard();
      alert('Данные сброшены к начальным значениям.');
    }
  });
}

// -------------------------------------------------------------
// Инициализация при загрузке
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupProfileModal();
  setupWorkoutManagement();
  setupLogModule();
  setupProgressModule();
  setupDailyModule();
  setupDataHandlers();
  renderDashboard();
});
