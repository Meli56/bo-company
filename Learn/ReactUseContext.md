# Guide Complet : React useContext et Zustand

## 📚 Introduction : Le Problème de la Gestion d'État

### Qu'est-ce que le "Prop Drilling" ?

Imagine que tu organises une fête d'anniversaire. Au lieu de passer le gâteau de personne en personne jusqu'à l'invité d'honneur (comme les props), tu le places au centre de la table pour que tout le monde puisse y accéder directement.

**Le Prop Drilling** : C'est quand tu dois passer des props à travers plusieurs composants juste pour qu'elles arrivent au composant final qui en a besoin.

```jsx
// ❌ Prop Drilling - MAUVAIS
function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />; // On passe user
}

function Navigation({ user }) {
  return <UserMenu user={user} />; // On passe encore user
}

function UserMenu({ user }) {
  return <div>{user.name}</div>; // Enfin utilisé ici !
}
```

**Solutions modernes** :
1. **useContext** - Pour les données qui changent rarement
2. **Zustand** - Pour les états globaux complexes avec mises à jour fréquentes

---

## 🎯 Partie 1 : useContext

### Qu'est-ce que useContext ?

**useContext** est un hook React qui permet de partager des données globalement dans ton application sans avoir à passer des props à chaque niveau.

### Concepts Clés

**Context = Bulle de données**
- Crée une "bulle" qui contient des données
- Tous les composants à l'intérieur peuvent y accéder
- Peu importe leur profondeur dans l'arbre

---

## 🔧 useContext : Syntaxe et Utilisation

### Étape 1 : Créer le Context

```jsx
import { createContext } from 'react';

// Créer le Context avec une valeur par défaut
const ThemeContext = createContext('light');
```

### Étape 2 : Fournir les Données (Provider)

```jsx
import { useState, createContext } from 'react';

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <MainContent />
      <Footer />
    </ThemeContext.Provider>
  );
}
```

### Étape 3 : Consommer les Données (useContext)

```jsx
import { useContext } from 'react';

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Thème actuel : {theme}
    </button>
  );
}
```

---

## 💡 Exemple Complet : Système de Thème

```jsx
import React, { useState, useContext, createContext } from 'react';

// 1. Créer le Context
const ThemeContext = createContext();

// 2. Créer un Provider custom
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Créer un hook custom pour faciliter l'utilisation
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  
  return context;
};

// 4. Utiliser dans les composants
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <h1>Mon Site</h1>
      <button onClick={toggleTheme}>
        Passer en mode {theme === 'light' ? 'sombre' : 'clair'}
      </button>
    </header>
  );
}

function MainContent() {
  const { theme } = useTheme();
  
  return (
    <main style={{ color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Contenu principal</p>
    </main>
  );
}
```

---

## 🎨 Pattern Avancé : Compound Component avec Context

```jsx
import React, { useState, useContext, createContext } from 'react';

const ToggleContext = createContext();

// Provider principal
export const ToggleProvider = ({ children }) => {
  const [value, setValue] = useState('off');
  
  const toggle = () => {
    setValue(value === 'on' ? 'off' : 'on');
  };
  
  return (
    <ToggleContext.Provider value={{ value, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

// Composant Button
export const ToggleButton = () => {
  const { value, toggle } = useContext(ToggleContext);
  
  return (
    <button 
      onClick={toggle}
      style={{
        padding: '10px',
        backgroundColor: value === 'on' ? 'green' : 'red',
        color: 'white'
      }}
    >
      {value === 'on' ? 'ON' : 'OFF'}
    </button>
  );
};

// Composant Content conditionnel
export const ToggleContent = ({ value: targetValue, children }) => {
  const { value } = useContext(ToggleContext);
  
  if (value !== targetValue) return null;
  
  return (
    <div style={{ padding: '10px', border: '1px solid black' }}>
      {children}
    </div>
  );
};

// Utilisation
export const App = () => (
  <div>
    <ToggleProvider>
      <ToggleButton />
      <ToggleContent value="on">
        <p>Contenu visible quand ON</p>
      </ToggleContent>
      <ToggleContent value="off">
        <p>Contenu visible quand OFF</p>
      </ToggleContent>
    </ToggleProvider>
  </div>
);
```

---

## ⚠️ Problèmes de Performance avec useContext

### Le Problème

**Chaque changement de valeur du Context re-rend TOUS les composants qui utilisent ce Context**, même s'ils n'utilisent qu'une petite partie des données.

```jsx
// ❌ PROBLÈME DE PERFORMANCE
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alice' });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');
  
  return (
    <AppContext.Provider value={{ user, theme, language, setUser, setTheme, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

// Ce composant se re-rend même si seul theme change !
function UserProfile() {
  const { user } = useContext(AppContext); // Re-render à chaque changement
  return <div>{user.name}</div>;
}
```

### Solutions

**Solution 1** : Séparer les Contexts
```jsx
const UserContext = createContext();
const ThemeContext = createContext();
const LanguageContext = createContext();

// Maintenant chaque composant ne s'abonne qu'à ce dont il a besoin
```

**Solution 2** : Utiliser Zustand (meilleure option pour états complexes)

---

## 🐻 Partie 2 : Zustand

### Pourquoi Zustand ?

Zustand est une bibliothèque de gestion d'état **ultra-simple** et **performante** qui résout les problèmes de useContext.

**Avantages** :
- ✅ Pas de Provider nécessaire
- ✅ Pas de re-renders inutiles
- ✅ Syntaxe ultra-simple
- ✅ Fonctionne hors de React
- ✅ DevTools intégrés
- ✅ TypeScript friendly

---

## 🚀 Zustand : Installation et Concepts

### Installation

```bash
npm install zustand
# ou
yarn add zustand
```

### Concept : Le Store

Un **store** Zustand est un objet qui contient :
1. **L'état** (state)
2. **Les actions** pour modifier l'état

---

## 🔨 Créer un Store Zustand

### Store Simple

```jsx
import { create } from 'zustand';

// Créer le store
const useCounterStore = create((set) => ({
  // État
  count: 0,
  
  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Utiliser dans un composant
function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Store avec TypeScript

```typescript
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

---

## 💎 Zustand : Patterns Avancés

### 1. Sélecteurs Optimisés

```jsx
// ✅ BON - Ne re-render que si count change
function Counter() {
  const count = useCounterStore((state) => state.count);
  return <p>Count: {count}</p>;
}

// ❌ MAUVAIS - Re-render à chaque changement du store
function Counter() {
  const store = useCounterStore();
  return <p>Count: {store.count}</p>;
}
```

### 2. Actions Asynchrones

```jsx
const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  
  fetchUser: async (userId) => {
    set({ loading: true, error: null });
    
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

// Utilisation
function UserProfile({ userId }) {
  const { user, loading, fetchUser } = useUserStore();
  
  useEffect(() => {
    fetchUser(userId);
  }, [userId, fetchUser]);
  
  if (loading) return <p>Chargement...</p>;
  return <div>{user?.name}</div>;
}
```

### 3. Middleware - Persist (LocalStorage)

```jsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'light',
      language: 'fr',
      
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-settings', // Nom dans localStorage
    }
  )
);
```

### 4. DevTools

```jsx
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
);
```

---

## 🎯 Exemple Complet : Todo App avec Zustand

```jsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Store
const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      
      addTodo: (text) => set((state) => ({
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text,
            completed: false,
          }
        ]
      })),
      
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),
      
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),
      
      clearCompleted: () => set((state) => ({
        todos: state.todos.filter(todo => !todo.completed)
      })),
      
      // Getter computed
      completedCount: () => get().todos.filter(todo => todo.completed).length,
    }),
    {
      name: 'todo-storage',
    }
  )
);

// Composants
function TodoApp() {
  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo />
      <TodoList />
      <TodoStats />
    </div>
  );
}

function AddTodo() {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nouvelle tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

function TodoStats() {
  const todos = useTodoStore((state) => state.todos);
  const completedCount = useTodoStore((state) => state.completedCount());
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  
  return (
    <div>
      <p>Total : {todos.length} | Complétées : {completedCount}</p>
      <button onClick={clearCompleted}>Effacer les complétées</button>
    </div>
  );
}
```

---

## 🔄 Zustand + Context : Le Meilleur des Deux Mondes

Pour des stores isolés par composant (ex: plusieurs instances d'un même composant), tu peux combiner Zustand et Context.

```jsx
import { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';

// Créer le store
const createCounterStore = () => createStore((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Context pour le store
const CounterContext = createContext(null);

// Provider
export function CounterProvider({ children }) {
  const storeRef = useRef();
  
  if (!storeRef.current) {
    storeRef.current = createCounterStore();
  }
  
  return (
    <CounterContext.Provider value={storeRef.current}>
      {children}
    </CounterContext.Provider>
  );
}

// Hook custom
export function useCounter(selector) {
  const store = useContext(CounterContext);
  if (!store) throw new Error('Missing CounterProvider');
  return useStore(store, selector);
}

// Utilisation - Chaque CounterProvider a son propre state !
function App() {
  return (
    <>
      <CounterProvider>
        <Counter />
      </CounterProvider>
      
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </>
  );
}
```

---

## 📊 Comparaison : useContext vs Zustand

| Critère | useContext | Zustand |
|---------|-----------|---------|
| **Setup** | Provider requis | Aucun Provider |
| **Performance** | Re-render tous les consommateurs | Re-render optimisés |
| **Simplicité** | Verbeux | Très simple |
| **Hors React** | Non | Oui ✅ |
| **DevTools** | Non natif | Oui ✅ |
| **TypeScript** | Moyen | Excellent ✅ |
| **Cas d'usage** | Thème, Auth, Config | État complexe, mises à jour fréquentes |

---

## 🎓 Quand Utiliser Quoi ?

### ✅ Utilise **useContext** pour :
- Thème de l'application
- Authentification (user, token)
- Configuration globale (langue, préférences)
- Données qui changent rarement
- Petites applications

### ✅ Utilise **Zustand** pour :
- État global complexe
- Données avec mises à jour fréquentes
- Gestion de formulaires complexes
- Cache de données API
- État partagé entre plusieurs features
- Grandes applications

### 🚫 N'utilise PAS de gestion d'état globale pour :
- Props simples (1-2 niveaux)
- État local d'un composant
- Données qui ne sont utilisées que dans un seul endroit

---

## 🛠️ Best Practices

### useContext
```jsx
// ✅ BON
// 1. Créer des hooks customs
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// 2. Séparer les contexts par domaine
const AuthContext = createContext();
const ThemeContext = createContext();
const LanguageContext = createContext();

// 3. Utiliser useMemo pour éviter re-renders
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
```

### Zustand
```jsx
// ✅ BON
// 1. Séparer les stores par domaine
const useAuthStore = create(...);
const useCartStore = create(...);
const useSettingsStore = create(...);

// 2. Utiliser des sélecteurs
const user = useAuthStore((state) => state.user);

// 3. Ne pas stocker de données dérivées
// ❌ MAUVAIS
const store = create((set) => ({
  items: [],
  itemsCount: 0, // Dérivé !
}));

// ✅ BON
const store = create((set) => ({
  items: [],
  getItemsCount: () => get().items.length,
}));

// 4. Grouper les actions liées
const useStore = create((set) => ({
  user: null,
  login: async (credentials) => { /* ... */ },
  logout: () => set({ user: null }),
  updateProfile: (data) => { /* ... */ },
}));
```

---

## 🎯 Résumé et Checklist

### useContext
✅ Comprendre le prop drilling  
✅ Créer un Context avec createContext  
✅ Wrapper avec Provider  
✅ Consommer avec useContext  
✅ Créer des hooks customs  
✅ Attention aux re-renders  

### Zustand
✅ Installation avec npm/yarn  
✅ Créer un store avec create  
✅ Utiliser des sélecteurs optimisés  
✅ Actions synchrones et asynchrones  
✅ Middleware (persist, devtools)  
✅ Combiner avec Context si besoin  

---

## 📚 Ressources Complémentaires

- [Documentation useContext](https://react.dev/reference/react/useContext)
- [Documentation Zustand](https://github.com/pmndrs/zustand)
- [Guide useContext de Melvynx](https://codelynx.dev/posts/guide-usecontext)
- [Formation BeginReact](https://codelynx.dev/beginreact)

---

## 🎉 Conclusion

**useContext** et **Zustand** sont deux outils complémentaires pour gérer l'état dans React :

- **useContext** : Parfait pour les données simples et peu changeantes (thème, auth)
- **Zustand** : Idéal pour les états complexes avec des mises à jour fréquentes

Le choix dépend de ton cas d'usage. Pour des applications de production, Zustand est souvent le meilleur choix pour sa simplicité et ses performances.
