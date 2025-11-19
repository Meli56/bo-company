# Guide Complet : React useEffect

## 📚 Introduction

Le hook `useEffect` est l'un des hooks les plus importants et les plus utilisés en React. Il permet de gérer les **effets de bord** (side effects) dans les composants fonctionnels.

### Qu'est-ce qu'un effet de bord ?

Un effet de bord est une opération qui interagit avec le monde extérieur au composant React :
- Appels API / Fetch de données
- Manipulation directe du DOM
- Abonnements (subscriptions)
- Timers (setTimeout, setInterval)
- Logs console
- LocalStorage
- Connexion WebSocket

---

## 🎯 Syntaxe de Base

```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Code de l'effet de bord
}, [dépendances]);
```

**useEffect** prend 2 paramètres :
1. **Une fonction callback** : contient la logique de votre effet
2. **Un tableau de dépendances** (optionnel) : contrôle quand l'effet est exécuté

---

## 🔄 Les 3 Comportements Principaux

### 1️⃣ Sans tableau de dépendances
```jsx
useEffect(() => {
  console.log('Exécuté après CHAQUE rendu');
});
```
**⚠️ Attention** : L'effet s'exécute après chaque rendu du composant. À éviter dans la plupart des cas !

### 2️⃣ Avec tableau vide []
```jsx
useEffect(() => {
  console.log('Exécuté UNE SEULE fois après le montage');
}, []);
```
**✅ Usage typique** : Parfait pour le chargement initial de données (fetch API).

### 3️⃣ Avec des dépendances
```jsx
useEffect(() => {
  console.log('Exécuté quand userId change');
}, [userId]);
```
**✅ Usage typique** : L'effet se déclenche uniquement quand `userId` change.

---

## 💡 Exemples Pratiques

### Exemple 1 : Mise à jour du titre de la page
```jsx
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  
  return <h1>{title}</h1>;
}
```

### Exemple 2 : Fetch de données au montage
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Se déclenche quand userId change
  
  if (loading) return <p>Chargement...</p>;
  return <div>{user?.name}</div>;
}
```

### Exemple 3 : Timer / Compteur
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count => count + 1);
    }, 1000);
    
    // Fonction de nettoyage (cleanup)
    return () => clearTimeout(timer);
  }, []);
  
  return <p>Compteur : {count}</p>;
}
```

---

## 🧹 La Fonction de Nettoyage (Cleanup)

La fonction de nettoyage est **essentielle** pour éviter les fuites mémoire. Elle s'exécute :
- Avant chaque nouvelle exécution de l'effet
- Quand le composant est démonté (unmount)

### Exemple : Écouter un événement
```jsx
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Ajout de l'écouteur
    window.addEventListener('scroll', handleScroll);
    
    // Nettoyage : retirer l'écouteur
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Une seule fois au montage
  
  return <p>Scroll Y: {scrollY}px</p>;
}
```

### Exemple : Abonnement / WebSocket
```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    
    // Nettoyage important !
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  
  return <div>Chat Room: {roomId}</div>;
}
```

---

## ⚠️ Erreurs Courantes et Pièges

### ❌ Erreur 1 : Modifier le state directement dans useEffect sans dépendances
```jsx
// MAUVAIS
useEffect(() => {
  setCount(count + 1); // Boucle infinie !
});
```

### ❌ Erreur 2 : Oublier des dépendances
```jsx
// MAUVAIS
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    fetchResults(query).then(setResults);
  }, []); // ❌ query devrait être dans les dépendances !
}
```

### ✅ Correction
```jsx
useEffect(() => {
  fetchResults(query).then(setResults);
}, [query]); // ✅ query est bien déclaré
```

### ❌ Erreur 3 : Ne pas nettoyer les abonnements
```jsx
// MAUVAIS - fuite mémoire !
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);
  // ❌ Pas de nettoyage !
}, []);

// BON
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(interval); // ✅ Nettoyage
}, []);
```

---

## 📝 Les Règles d'Or

### Règle 1 : Un useEffect par effet de bord
Ne combinez pas plusieurs effets dans un seul useEffect. Créez-en un par logique.

```jsx
// ❌ MAUVAIS
useEffect(() => {
  fetchUserData();
  updatePageTitle();
  trackAnalytics();
}, []);

// ✅ BON
useEffect(() => {
  fetchUserData();
}, []);

useEffect(() => {
  updatePageTitle();
}, [title]);

useEffect(() => {
  trackAnalytics();
}, [page]);
```

### Règle 2 : Toujours déclarer les dépendances
Utilisez le plugin ESLint `eslint-plugin-react-hooks` pour vous aider.

```jsx
// La règle vous alertera si vous oubliez des dépendances
useEffect(() => {
  console.log(userId, userName);
}, [userId, userName]); // ✅ Toutes les variables utilisées sont déclarées
```

### Règle 3 : Pas de setState direct à la racine
```jsx
// ❌ MAUVAIS
useEffect(() => {
  setTitle(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// ✅ BON - Utilisez une variable calculée
const title = `${firstName} ${lastName}`;
```

### Règle 4 : Toujours nettoyer vos effets
Si vous créez un abonnement, un timer, un écouteur d'événement, **nettoyez-le** !

---

## 🎓 Cas d'Usage Avancés

### Fetch avec Abort Controller (annulation)
```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController();
    
    fetch(`/api/search?q=${query}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(setResults)
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });
    
    // Annule la requête si le composant se démonte
    return () => controller.abort();
  }, [query]);
  
  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}
```

### Debouncing avec useEffect
```jsx
function SearchInput() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Attend 500ms avant de mettre à jour
    
    return () => clearTimeout(timer);
  }, [query]);
  
  useEffect(() => {
    if (debouncedQuery) {
      // Effectuer la recherche
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

---

## 🚀 Optimisations et Performance

### useEffect vs useLayoutEffect
- **useEffect** : Exécuté **après** le rendu (asynchrone)
- **useLayoutEffect** : Exécuté **avant** la peinture (synchrone)

```jsx
// useLayoutEffect pour des mesures DOM ou animations
useLayoutEffect(() => {
  const height = ref.current.offsetHeight;
  // Faire quelque chose avec la hauteur avant le rendu
}, []);
```

### Éviter les re-rendus inutiles
```jsx
// Utilisez useCallback pour mémoriser les fonctions
const fetchData = useCallback(() => {
  fetch('/api/data').then(setData);
}, []); // Ne change jamais

useEffect(() => {
  fetchData();
}, [fetchData]); // Maintenant safe !
```

---

## 📊 Schéma du Cycle de Vie

```
Montage du composant
       ↓
Premier rendu
       ↓
useEffect s'exécute
       ↓
[État change]
       ↓
Cleanup de l'ancien effet (si présent)
       ↓
Nouveau rendu
       ↓
useEffect s'exécute (si dépendances changées)
       ↓
[Composant se démonte]
       ↓
Cleanup final
```

---

## 🎯 Résumé et Checklist

✅ **Toujours déclarer les dépendances**  
✅ **Un useEffect par effet de bord**  
✅ **Nettoyer les abonnements, timers, événements**  
✅ **Éviter de setState directement à la racine**  
✅ **Utiliser ESLint pour les hooks React**  
✅ **Tester le cleanup lors du démontage**  
✅ **Préférer les calculs dérivés aux useEffect**  

---

## 📚 Ressources Complémentaires

- [Documentation officielle React](https://react.dev/reference/react/useEffect)
- [Formation BeginReact de Melvynx](https://codelynx.dev/beginreact)
- Plugin ESLint : `eslint-plugin-react-hooks`

---

## 🎉 Conclusion

Le hook `useEffect` est puissant mais nécessite une bonne compréhension pour éviter les bugs.