import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, useTransition } from 'react';
import { createContext } from 'react';

// Контекст для заданий 9 и 10
const MyContext = createContext(null);

// Общие стили
const baseStyles = {
  container: { padding: '20px', fontFamily: 'Arial' },
  section: { marginBottom: '20px', border: '1px solid #ccc', padding: '10px', fontFamily: 'Arial' },
  h1: { fontSize: '24px', margin: '10px 0' },
  button: { margin: '5px', padding: '5px 10px' },
  input: { margin: '5px', padding: '5px' },
  nav: { display: 'flex', flexDirection: 'column' },
  link: { textDecoration: 'none', color: 'blue', margin: '5px 0' },
  activeLink: { fontWeight: 'bold', color: 'brown' },
  control: { display: 'flex', gap: '10px' },
  main: { display: 'flex', gap: '20px' },
};

// Задание 4: Изменение тайтла страницы
const Task4 = () => {
  useEffect(() => {
    document.title = 'React Task 4';
  }, []);
  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>4: Изменение тайтла</h1>
      <p>Тайтл страницы изменён на "React Task 4"</p>
    </div>
  );
};

// Задание 5: Запись имени в localStorage
const Task5 = () => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    localStorage.setItem('username_task5', username);
  }, [username]);
  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>5: Запись имени в localStorage</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Введите имя"
        style={baseStyles.input}
      />
      <p>Имя сохраняется в localStorage (ключ: username_task5)</p>
    </div>
  );
};

// Задание 6: Смена фона и показ/скрытие блока
const Task6 = () => {
  const [bgColor, setBgColor] = useState('white');
  const [isBlockVisible, setIsBlockVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (sectionRef.current && sectionRef.current.contains(e.target)) {
        setBgColor(bgColor === 'white' ? 'lightgray' : 'white');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [bgColor]);

  const toggleBlock = (e) => {
    e.stopPropagation();
    setIsBlockVisible(!isBlockVisible);
  };

  return (
    <div ref={sectionRef} style={{ ...baseStyles.section, backgroundColor: bgColor }}>
      <h1 style={baseStyles.h1}>6: Смена фона и показ/скрытие блока</h1>
      <p>Кликните внутри секции, чтобы сменить фон</p>
      <button onClick={toggleBlock} style={baseStyles.button}>
        {isBlockVisible ? 'Скрыть блок' : 'Показать блок'}
      </button>
      {isBlockVisible && (
        <div style={{ background: 'lightblue', padding: '10px', marginTop: '10px' }}>
          Этот блок показывается/скрывается по кнопке
        </div>
      )}
    </div>
  );
};

// Задание 9: Передача возраста через контекст
const Task9 = () => {
  const Parent = () => <Daughter />;
  const Daughter = () => {
    const age = useContext(MyContext);
    return (
      <div>
        <p>Возраст из контекста: {age}</p>
        <Grandson />
      </div>
    );
  };
  const Grandson = () => {
    const age = useContext(MyContext);
    return <p>Возраст / 2: {age / 2}</p>;
  };
  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>9: Передача возраста через контекст</h1>
      <MyContext.Provider value={42}>
        <Parent />
      </MyContext.Provider>
    </div>
  );
};

// Задание 10: Обновление контекста
const Task10 = () => {
  const [age, setAge] = useState(50);
  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>10: Обновление контекста</h1>
      <MyContext.Provider value={age}>
        <p>Текущий возраст: {age}</p>
        <button onClick={() => setAge(age - 2)} style={baseStyles.button}>
          Уменьшить на 2
        </button>
      </MyContext.Provider>
    </div>
  );
};

// Задание 12: Добавление ! с useState и useRef
const Task12 = () => {
  const [textState, setTextState] = useState('text');
  const [textRefDisplay, setTextRefDisplay] = useState('text');
  const textRef = useRef('text');

  const handleRefClick = () => {
    textRef.current += '!';
    setTextRefDisplay(textRef.current);
  };

  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>12: Добавление ! с useState и useRef</h1>
      <p onClick={() => setTextState(textState + '!')} style={{ cursor: 'pointer' }}>
        {textState} (useState, кликните)
      </p>
      <p>{textRefDisplay} (useRef)</p>
      <button onClick={handleRefClick} style={baseStyles.button}>
        Добавить ! (useRef)
      </button>
    </div>
  );
};

// Задание 13: Фокус и очистка инпута
const Task13 = () => {
  const inputRef = useRef(null);
  const handleFocusClear = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = '';
    }
  };
  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>13: Фокус и очистка инпута</h1>
      <input ref={inputRef} style={baseStyles.input} placeholder="Введите текст" />
      <button onClick={handleFocusClear} style={baseStyles.button}>
        Фокус и очистка
      </button>
    </div>
  );
};

// Задание 14: useMemo для оптимизации
const Task14 = () => {
  const [text, setText] = useState('react');
  const [num, setNum] = useState(0);
  const triple = (n) => {
    let start = performance.now();
    while (performance.now() - start < 500) {}
    return n * 3;
  };
  const resultWithMemo = useMemo(() => triple(num), [num]);
  const resultWithoutMemo = triple(num);

  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>14: useMemo для оптимизации</h1>
      <p onClick={() => setText(text + '!')} style={{ cursor: 'pointer' }}>
        {text} (кликните)
      </p>
      <p onClick={() => setNum(num + 1)} style={{ cursor: 'pointer' }}>
        Без useMemo: {resultWithoutMemo} (кликните)
      </p>
      <p onClick={() => setNum(num + 1)} style={{ cursor: 'pointer' }}>
        С useMemo: {resultWithMemo} (кликните)
      </p>
    </div>
  );
};

// Задание 15: memo для предотвращения рендера
const Task15 = () => {
  const [name, setName] = useState('');
  const TextWithoutMemo = () => {
    console.log('Text without memo rendered');
    return <p>long text (без memo)</p>;
  };
  const TextWithMemo = React.memo(() => {
    console.log('Text with memo rendered');
    return <p>long text (с memo)</p>;
  });

  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>15: memo для предотвращения рендера</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите имя"
        style={baseStyles.input}
      />
      <TextWithoutMemo />
      <TextWithMemo />
      <p>Откройте консоль, чтобы увидеть разницу в рендеринге</p>
    </div>
  );
};

// Задание 16: useCallback для стабильной функции
const Task16 = () => {
  const [text, setText] = useState('text');
  const [products, setProducts] = useState([]);
  const addProductWithoutCallback = () => setProducts([...products, `Product ${products.length + 1}`]);
  const addProductWithCallback = useCallback(() => setProducts((prev) => [...prev, `Product ${prev.length + 1}`]), []);

  const ProductsWithoutMemo = ({ addItem }) => {
    console.log('Products without memo rendered');
    return (
      <div>
        <ul>{products.map((item, i) => <li key={i}>{item}</li>)}</ul>
        <button onClick={addItem} style={baseStyles.button}>
          Add Product (без memo)
        </button>
      </div>
    );
  };

  const ProductsWithMemo = React.memo(({ addItem }) => {
    console.log('Products with memo rendered');
    return (
      <div>
        <ul>{products.map((item, i) => <li key={i}>{item}</li>)}</ul>
        <button onClick={addItem} style={baseStyles.button}>
          Add Product (с memo и useCallback)
        </button>
      </div>
    );
  });

  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>16: useCallback для стабильной функции</h1>
      <p onClick={() => setText(text + '!')} style={{ cursor: 'pointer' }}>
        {text} (кликните)
      </p>
      <ProductsWithoutMemo addItem={addProductWithoutCallback} />
      <ProductsWithMemo addItem={addProductWithCallback} />
      <p>Откройте консоль, чтобы увидеть разницу в рендеринге</p>
    </div>
  );
};

// Задание 17: useTransition для фильтрации
const Task17 = () => {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState('');
  const products = ['Product 1', 'Product 2', 'Item 3', 'Item 4'];
  const filteredProducts = useMemo(
    () => products.filter((p) => p.toLowerCase().includes(filterTerm.toLowerCase())),
    [filterTerm]
  );

  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>17: useTransition для фильтрации</h1>
      <input
        value={filterTerm}
        onChange={(e) => startTransition(() => setFilterTerm(e.target.value))}
        placeholder="Фильтр продуктов"
        style={baseStyles.input}
      />
      {isPending && <p>Обновление...</p>}
      <ul>{filteredProducts.map((p, i) => <li key={i}>{p}</li>)}</ul>
    </div>
  );
};

// Задания 22-47: React Router (упрощённая рабочая версия)
const Task22_to_47 = () => {
  const [pathname, setPathname] = useState('/');
  const [students, setStudents] = useState([]);

  const getStudent = (id) => students.find((s) => s.id === id) || null;

  const createStudent = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).slice(2, 8);
    const newStudent = { id, name: `Student ${id}` };
    setStudents([newStudent, ...students]);
    setPathname(`/students/${id}`);
  };

  const updateStudent = (id, updates) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    setPathname(`/students/${id}`);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    setPathname('/');
  };

  const Root = () => (
    <div style={baseStyles.main}>
      <div id="menu">
        <form onSubmit={createStudent}>
          <button type="submit" style={baseStyles.button}>Add Student</button>
        </form>
        {students.length ? (
          <nav style={baseStyles.nav}>
            {students.map((student) => (
              <a
                key={student.id}
                href={`/students/${student.id}`}
                style={pathname === `/students/${student.id}` ? baseStyles.activeLink : baseStyles.link}
                onClick={(e) => {
                  e.preventDefault();
                  setPathname(`/students/${student.id}`);
                }}
              >
                {student.name || <i>Unnamed</i>}
              </a>
            ))}
          </nav>
        ) : (
          <p><i>No students here...</i></p>
        )}
      </div>
    </div>
  );

  const Student = ({ student }) => (
    <div>
      <h2>Student Details</h2>
      <p>Name: {student?.name || <i>unnamed</i>}</p>
      <p>Surname: {student?.surname || <i>unknown</i>}</p>
      <p>Year: {student?.year || <i>unknown</i>}</p>
      <p>Specialty: {student?.specialty || <i>unknown</i>}</p>
      <div style={baseStyles.control}>
        <button onClick={() => setPathname(`/students/${student.id}/edit`)} style={baseStyles.button}>Edit</button>
        <button onClick={() => deleteStudent(student.id)} style={baseStyles.button}>Delete</button>
      </div>
      <a href="/" style={baseStyles.link} onClick={(e) => { e.preventDefault(); setPathname('/'); }}>
        Back to Home
      </a>
    </div>
  );

  const EditStudent = ({ student }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updates = Object.fromEntries(formData);
      updateStudent(student.id, updates);
    };
    return (
      <form onSubmit={handleSubmit}>
        <h2>Edit Student</h2>
        <div>
          <label>Name: </label>
          <input defaultValue={student?.name} name="name" style={baseStyles.input} />
        </div>
        <div>
          <label>Surname: </label>
          <input defaultValue={student?.surname} name="surname" style={baseStyles.input} />
        </div>
        <div>
          <label>Year: </label>
          <input defaultValue={student?.year} name="year" style={baseStyles.input} />
        </div>
        <div>
          <label>Specialty: </label>
          <input defaultValue={student?.specialty} name="specialty" style={baseStyles.input} />
        </div>
        <button type="submit" style={baseStyles.button}>Save</button>
        <a href={`/students/${student.id}`} style={baseStyles.link} onClick={(e) => { e.preventDefault(); setPathname(`/students/${student.id}`); }}>
          Cancel
        </a>
      </form>
    );
  };

  const Index = () => (
    <div>
      <p>Hi, React Router!</p>
      <p>This is an application for my students :)</p>
      <a href="/" style={baseStyles.link} onClick={(e) => { e.preventDefault(); setPathname('/'); }}>
        Back to Home
      </a>
    </div>
  );

  const studentId = pathname.split('/')[2];
  const currentStudent = getStudent(studentId);

  return (
    <div style={baseStyles.section}>
      <h1 style={baseStyles.h1}>22-47: React Router</h1>
      {pathname === '/' && <Root />}
      {pathname === '/index' && <Index />}
      {pathname.startsWith('/students/') && !pathname.endsWith('/edit') && currentStudent && <Student student={currentStudent} />}
      {pathname.endsWith('/edit') && currentStudent && <EditStudent student={currentStudent} />}
      {pathname.startsWith('/students/') && !currentStudent && !pathname.endsWith('/edit') && (
        <div>
          <h2>404 Not Found</h2>
          <p>Студент не найден</p>
          <a href="/" style={baseStyles.link} onClick={(e) => { e.preventDefault(); setPathname('/'); }}>
            Back to Home
          </a>
        </div>
      )}
    </div>
  );
};

// Основной компонент
const App = () => (
  <div style={baseStyles.container}>
    <Task4 />
    <Task5 />
    <Task6 />
    <Task9 />
    <Task10 />
    <Task12 />
    <Task13 />
    <Task14 />
    <Task15 />
    <Task16 />
    <Task17 />
    <Task22_to_47 />
  </div>
);

export default App;