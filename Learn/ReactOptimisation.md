# Guide Complet : React useMemo et useCallback

## 📚 Introduction : Pourquoi l'Optimisation ?

Avant de plonger dans **useMemo** et **useCallback**, il faut comprendre un concept fondamental : **React re-rend les composants souvent, parfois inutilement**.

### Le Problème de Performance

Imagine que tu as une application avec :
- Un champ de recherche
- Une liste de 10 000 produits à filtrer
- Un bouton de thème (clair/sombre)

**Sans optimisation** : Chaque fois que tu changes le thème, React va :
1. Re-calculer le filtrage des 10 000 produits (alors que la recherche n'a pas changé !)
2. Re-créer toutes les fonctions
3. Re-rendre tous les composants enfants

**Avec optimisation** : React peut éviter ces calculs inutiles et améliorer drastiquement les performances.

---

## 🎯 Les 2 Hooks d'Optimisation

| Hook | Mémorise | Utilisation |
|------|----------|-------------|
| **useMemo** | Une **valeur calculée** | Calculs coûteux, objets, tableaux |
| **useCallback** | Une **fonction** | Fonctions passées en props |

### La Règle d'Or

**⚠️ N'optimise PAS prématurément !**

Ces hooks ajoutent de la complexité et **ne sont pas toujours bénéfiques**. Utilise-les seulement quand :
1. Tu as un problème de performance mesuré
2. Tu passes des props à des composants mémorisés avec `React.memo`
3. Tu as des calculs vraiment coûteux (milliers d'itérations)
4. Une valeur/fonction est utilisée comme dépendance d'un autre hook

---

## 💎 Partie 1 : useMemo

### Qu'est-ce que useMemo ?

**useMemo** permet de **mémoriser le résultat d'un calcul** pour éviter de le refaire à chaque rendu.

### Syntaxe

```jsx
const memoizedValue = useMemo(() => {
  // Calcul coûteux
  return calculateExpensiveValue(a, b);
}, [a, b]); // Dépendances
```

**Comment ça marche ?**
1. Au premier rendu : React exécute la fonction et stocke le résultat
2. Aux rendus suivants : React vérifie si `a` ou `b` ont changé
   - Si oui → Re-calcule
   - Si non → Retourne la valeur stockée

---

## 📊 useMemo : Exemples Pratiques

### Exemple 1 : Calcul Coûteux (Nombres Premiers)

```jsx
import { useState, useMemo } from 'react';

function PrimeCalculator() {
  const [number, setNumber] = useState(100);
  const [theme, setTheme] = useState('light');
  
  // ❌ SANS useMemo - Recalcule à chaque changement de theme !
  const primes = calculatePrimes(number);
  
  // ✅ AVEC useMemo - Recalcule uniquement si number change
  const primes = useMemo(() => {
    console.log('Calcul des nombres premiers...');
    return calculatePrimes(number);
  }, [number]);
  
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <input 
        type="number" 
        value={number} 
        onChange={(e) => setNumber(Number(e.target.value))} 
      />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <p>Nombres premiers trouvés : {primes.length}</p>
    </div>
  );
}

function calculatePrimes(max) {
  const primes = [];
  for (let i = 2; i <= max; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
}
```

**Résultat** :
- Sans useMemo : Le calcul se fait même quand on change le thème (inutile !)
- Avec useMemo : Le calcul ne se fait que quand `number` change

---

### Exemple 2 : Filtrage de Liste

```jsx
function ProductList({ searchTerm }) {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 1000, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 500, category: 'Electronics' },
    { id: 3, name: 'Desk', price: 300, category: 'Furniture' },
    // ... 10 000 produits
  ]);
  
  const [sortOrder, setSortOrder] = useState('asc');
  
  // ✅ Mémorise le filtrage et le tri
  const filteredProducts = useMemo(() => {
    console.log('Filtrage et tri des produits...');
    
    // Filtrage
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Tri
    filtered.sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.price - b.price 
        : b.price - a.price;
    });
    
    return filtered;
  }, [products, searchTerm, sortOrder]);
  
  return (
    <div>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Tri : {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
      
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Exemple 3 : Égalité Référentielle pour React.memo

**Le problème** : En JavaScript, deux objets/tableaux identiques ne sont jamais égaux.

```jsx
const obj1 = { name: 'Alice' };
const obj2 = { name: 'Alice' };
console.log(obj1 === obj2); // false !
```

**Impact sur React.memo** :

```jsx
// Composant enfant optimisé avec React.memo
const ExpensiveComponent = React.memo(({ config }) => {
  console.log('ExpensiveComponent rendu !');
  return <div>Config: {config.theme}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ PROBLÈME : Nouvel objet à chaque rendu
  const config = { theme: 'dark', lang: 'fr' };
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent config={config} />
      {/* ExpensiveComponent se re-rend même si config est identique ! */}
    </>
  );
}
```

**Solution avec useMemo** :

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  // ✅ SOLUTION : Mémorise l'objet
  const config = useMemo(() => ({
    theme: 'dark',
    lang: 'fr'
  }), []); // Pas de dépendances = toujours le même objet
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent config={config} />
      {/* ExpensiveComponent ne se re-rend pas ! */}
    </>
  );
}
```

---

## 🔄 Partie 2 : useCallback

### Qu'est-ce que useCallback ?

**useCallback** est identique à useMemo, mais **spécialisé pour les fonctions**.

```jsx
// Ces deux lignes sont ÉQUIVALENTES :
const memoizedFunction = useCallback(() => doSomething(a, b), [a, b]);
const memoizedFunction = useMemo(() => () => doSomething(a, b), [a, b]);
```

**useCallback** est juste un raccourci syntaxique plus propre.

### Syntaxe

```jsx
const memoizedCallback = useCallback(() => {
  // Logique de la fonction
  doSomething(a, b);
}, [a, b]); // Dépendances
```

---

## 🎨 useCallback : Exemples Pratiques

### Exemple 1 : Éviter les Re-renders Inutiles

```jsx
const Button = React.memo(({ onClick, children }) => {
  console.log(`Button "${children}" rendu`);
  return <button onClick={onClick}>{children}</button>;
});

function Counter() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // ❌ SANS useCallback - Nouvelle fonction à chaque rendu
  const increment = () => setCount(c => c + 1);
  
  // ✅ AVEC useCallback - Même fonction entre les rendus
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Pas de dépendances
  
  return (
    <>
      <p>Count: {count}</p>
      <p>Other: {otherState}</p>
      
      <Button onClick={increment}>Increment</Button>
      <Button onClick={() => setOtherState(o => o + 1)}>Other</Button>
      
      {/* Sans useCallback : les deux boutons se re-rendent quand otherState change */}
      {/* Avec useCallback : seul le bouton "Other" se re-rend */}
    </>
  );
}
```

---

### Exemple 2 : Fonction en Dépendance de useEffect

```jsx
function SearchComponent({ category }) {
  const [results, setResults] = useState([]);
  
  // ❌ SANS useCallback - Boucle infinie !
  const fetchResults = () => {
    fetch(`/api/search?category=${category}`)
      .then(res => res.json())
      .then(setResults);
  };
  
  useEffect(() => {
    fetchResults();
  }, [fetchResults]); // ⚠️ fetchResults change à chaque rendu !
  
  // ✅ AVEC useCallback - Stabilité de la référence
  const fetchResults = useCallback(() => {
    fetch(`/api/search?category=${category}`)
      .then(res => res.json())
      .then(setResults);
  }, [category]); // Nouvelle fonction seulement si category change
  
  useEffect(() => {
    fetchResults();
  }, [fetchResults]); // ✅ Fonctionne correctement
  
  return <div>{/* Affichage des résultats */}</div>;
}
```

**Explication** :
- Sans useCallback : `fetchResults` est une nouvelle fonction à chaque rendu
- useEffect voit une nouvelle dépendance → se déclenche → provoque un rendu → boucle infinie !
- Avec useCallback : `fetchResults` reste la même tant que `category` ne change pas

---

### Exemple 3 : Passer des Callbacks aux Enfants

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: false },
  ]);
  
  // ✅ Mémorise les fonctions pour éviter re-renders des TodoItem
  const toggleTodo = useCallback((id) => {
    setTodos(todos => 
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Pas de dépendances car on utilise la forme fonctionnelle de setState
  
  const deleteTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
}

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  console.log(`TodoItem ${todo.id} rendu`);
  
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});
```

**Résultat** : Seul le TodoItem qui change se re-rend, pas toute la liste !

---

## ⚠️ Erreurs Courantes et Pièges

### ❌ Erreur 1 : Optimiser Trop Tôt

```jsx
// ❌ INUTILE - Ce calcul est instantané
const doubled = useMemo(() => count * 2, [count]);

// ✅ MIEUX - Garde ça simple
const doubled = count * 2;
```

**Règle** : Si le calcul prend moins de 1ms, n'utilise pas useMemo.

---

### ❌ Erreur 2 : Oublier les Dépendances

```jsx
function SearchBar({ initialValue }) {
  const [query, setQuery] = useState('');
  
  // ❌ MAUVAIS - initialValue devrait être une dépendance
  const resetQuery = useCallback(() => {
    setQuery(initialValue);
  }, []); // ⚠️ Toujours utilise la première valeur d'initialValue !
  
  // ✅ BON
  const resetQuery = useCallback(() => {
    setQuery(initialValue);
  }, [initialValue]);
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={resetQuery}>Reset</button>
    </>
  );
}
```

**Solution** : Utilise le plugin ESLint `eslint-plugin-react-hooks` qui t'alerte automatiquement.

---

### ❌ Erreur 3 : Créer des Objets dans les Dépendances

```jsx
// ❌ MAUVAIS - L'objet options change à chaque rendu !
const fetchData = useCallback(() => {
  fetch('/api', { method: 'POST', body: JSON.stringify({ name, age }) });
}, [{ name, age }]); // ⚠️ Nouvel objet à chaque fois

// ✅ BON - Utilise les valeurs primitives
const fetchData = useCallback(() => {
  fetch('/api', { method: 'POST', body: JSON.stringify({ name, age }) });
}, [name, age]);
```

---

### ❌ Erreur 4 : Utiliser sans React.memo

```jsx
// ❌ INUTILE - ExpensiveComponent n'est pas mémorisé
function Parent() {
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  
  return <ExpensiveComponent onClick={handleClick} />;
}

// ✅ BON - Combine avec React.memo
const ExpensiveComponent = React.memo(({ onClick }) => {
  // ...
});
```

**Règle** : useCallback n'est utile que si le composant enfant utilise `React.memo`.

---

## 🎯 Quand Utiliser useMemo et useCallback ?

### ✅ Utilise useMemo pour :

1. **Calculs vraiment coûteux** (boucles sur milliers d'éléments)
```jsx
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]);
```

2. **Éviter la recréation d'objets/tableaux** passés à `React.memo`
```jsx
const config = useMemo(() => ({ theme, lang }), [theme, lang]);
return <MemoizedChild config={config} />;
```

3. **Valeurs dérivées complexes**
```jsx
const stats = useMemo(() => {
  return {
    total: items.reduce((sum, item) => sum + item.price, 0),
    average: items.reduce((sum, item) => sum + item.price, 0) / items.length,
    max: Math.max(...items.map(item => item.price))
  };
}, [items]);
```

---

### ✅ Utilise useCallback pour :

1. **Fonctions passées à des composants mémorisés**
```jsx
const handleClick = useCallback(() => doSomething(), []);
return <MemoizedButton onClick={handleClick} />;
```

2. **Fonctions en dépendances de hooks**
```jsx
const fetchData = useCallback(() => {
  fetch('/api').then(setData);
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

3. **Éviter les re-créations de fonctions dans des listes**
```jsx
const handleDelete = useCallback((id) => {
  setItems(items => items.filter(item => item.id !== id));
}, []);
```

---

### 🚫 N'utilise PAS pour :

- Calculs simples (additions, multiplications)
- Composants sans enfants mémorisés
- "Par précaution" ou "au cas où"
- Optimisation prématurée sans mesure

---

## 🔬 Mesurer les Performances

### Avec React DevTools Profiler

1. Installe React DevTools
2. Ouvre l'onglet "Profiler"
3. Clique sur "Record"
4. Effectue des interactions
5. Analyse les temps de rendu

```jsx
// Ajoute des logs pour mesurer
console.time('calculation');
const result = calculateExpensiveValue();
console.timeEnd('calculation');
// calculation: 250ms

// Si > 50ms → Considère useMemo
```

---

## 🎓 Exemple Complet : Dashboard Optimisé

```jsx
import { useState, useMemo, useCallback, memo } from 'react';

// Composant enfant optimisé
const StatCard = memo(({ title, value, onClick }) => {
  console.log(`StatCard "${title}" rendu`);
  return (
    <div onClick={onClick} style={{ border: '1px solid #ccc', padding: '20px' }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '24px' }}>{value}</p>
    </div>
  );
});

function Dashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 1000, sold: 50 },
    { id: 2, name: 'Phone', price: 500, sold: 120 },
    { id: 3, name: 'Tablet', price: 300, sold: 80 },
    // ... beaucoup plus de produits
  ]);
  
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  
  // ✅ Calculs coûteux mémorisés
  const stats = useMemo(() => {
    console.log('Calcul des statistiques...');
    
    const filteredProducts = filter === 'all' 
      ? products 
      : products.filter(p => p.sold > 100);
    
    return {
      totalRevenue: filteredProducts.reduce((sum, p) => sum + (p.price * p.sold), 0),
      totalSold: filteredProducts.reduce((sum, p) => sum + p.sold, 0),
      avgPrice: filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length,
      topProduct: filteredProducts.sort((a, b) => b.sold - a.sold)[0]?.name || 'N/A'
    };
  }, [products, filter]);
  
  // ✅ Fonctions mémorisées
  const handleCardClick = useCallback((statName) => {
    console.log(`Clicked on ${statName}`);
  }, []);
  
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);
  
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', padding: '20px' }}>
      <h1>Dashboard</h1>
      
      <div>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
        
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('bestsellers')}>Best Sellers</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <StatCard
          title="Revenue Total"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          onClick={() => handleCardClick('revenue')}
        />
        <StatCard
          title="Produits Vendus"
          value={stats.totalSold}
          onClick={() => handleCardClick('sold')}
        />
        <StatCard
          title="Prix Moyen"
          value={`$${stats.avgPrice.toFixed(2)}`}
          onClick={() => handleCardClick('avgPrice')}
        />
        <StatCard
          title="Top Produit"
          value={stats.topProduct}
          onClick={() => handleCardClick('topProduct')}
        />
      </div>
    </div>
  );
}

export default Dashboard;
```

**Résultat** :
- Changer le thème ne recalcule pas les stats ✅
- Les StatCards ne se re-rendent que si leurs props changent ✅
- Les calculs ne se font que quand `products` ou `filter` changent ✅

---

## 📝 Checklist d'Optimisation

### Avant d'optimiser :
- [ ] As-tu mesuré les performances avec le Profiler ?
- [ ] Le problème est-il vraiment lié à des re-calculs/re-renders ?
- [ ] Est-ce que d'autres solutions sont possibles (restructurer les composants) ?

### Pour useMemo :
- [ ] Le calcul prend-il plus de 1ms ?
- [ ] La valeur est-elle passée à un composant `React.memo` ?
- [ ] Les dépendances sont-elles correctes ?
- [ ] Évites-tu les objets/tableaux dans les dépendances ?

### Pour useCallback :
- [ ] La fonction est-elle passée à un composant `React.memo` ?
- [ ] La fonction est-elle une dépendance d'un autre hook ?
- [ ] Les dépendances sont-elles correctes ?
- [ ] Utilises-tu la forme fonctionnelle de setState quand possible ?

---

## 🚀 Alternatives et Optimisations Modernes

### React Compiler (Expérimental)

React 19 introduit un **compilateur automatique** qui optimise sans hooks manuels :

```jsx
// Avant - Manuel
const memoizedValue = useMemo(() => compute(a, b), [a, b]);

// Après - Automatique avec React Compiler
const memoizedValue = compute(a, b); // Compilateur gère l'optimisation
```

### Autres Techniques d'Optimisation

1. **Lazy Loading**
```jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

2. **Code Splitting**
```jsx
const routes = [
  { path: '/', component: lazy(() => import('./Home')) },
  { path: '/about', component: lazy(() => import('./About')) }
];
```

3. **Virtualisation** (react-window, react-virtualized)
```jsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={35}
>
  {Row}
</FixedSizeList>
```

---

## 🎯 Résumé : Les Règles d'Or

### useMemo
- **Quoi** : Mémorise une **valeur calculée**
- **Quand** : Calculs coûteux, objets/tableaux pour React.memo
- **Comment** : `useMemo(() => valeur, [deps])`

### useCallback
- **Quoi** : Mémorise une **fonction**
- **Quand** : Props pour React.memo, dépendances de hooks
- **Comment** : `useCallback(() => {}, [deps])`

### Philosophie
1. **Ne pas optimiser prématurément**
2. **Mesurer avant d'optimiser**
3. **Combiner avec React.memo pour l'efficacité**
4. **Toujours déclarer les dépendances correctement**
5. **Préférer la simplicité à l'optimisation excessive**

---

## 📚 Ressources Complémentaires

- [Documentation React useMemo](https://react.dev/reference/react/useMemo)
- [Documentation React useCallback](https://react.dev/reference/react/useCallback)
- [When to useMemo and useCallback - Kent C. Dodds](https://kentcdodds.com/blog/usememo-and-usecallback)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [Formation BeginReact de Melvynx](https://codelynx.dev/beginreact)

---

## 🎉 Conclusion

**useMemo** et **useCallback** sont des outils puissants pour optimiser les performances React, mais ils ne sont pas magiques. Utilise-les avec discernement :

✅ **Mesure** d'abord avec le Profiler  
✅ **Optimise** seulement ce qui est lent  
✅ **Combine** avec React.memo pour un impact maximal  
✅ **Privilégie** la lisibilité du code  

L'optimisation prématurée est la racine de tous les maux. Code d'abord pour la clarté, optimise ensuite pour la performance quand c'est nécessaire !
