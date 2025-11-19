# React Component et JSX - Commencement

---

## 📋 Plan 

### Introduction 

Objectif : comprendre comment fonctionne un composant React, comment on écrit le rendu avec JSX, comment on structure une application simple.

### Pourquoi utiliser React ? 

**Les problèmes du développement web traditionnel :**
- Manipulation directe du DOM complexe et peu maintenable
- Code difficile à organiser dans les grandes applications
- Difficulté à réutiliser du code

**Les avantages de React :**
- **Composants réutilisables** : Créer des "briques" de code modulaires
- **DOM virtuel** : React optimise les modifications de la page automatiquement
- **Déclaratif** : On décrit ce qu'on veut afficher, React s'occupe du "comment"
- **Écosystème riche** : Nombreuses bibliothèques et outils disponibles

---

## 🚀 Création d'une application React 

### Mise en place de l'environnement

**Outil utilisé :** Create React App (CRA)
```bash
npx create-react-app mon-app
cd mon-app
npm start
```

**Structure d'un projet React :**
- `public/` : Fichiers statiques (HTML, images)
- `src/` : Code source de l'application
  - `App.js` : Composant principal
  - `index.js` : Point d'entrée de l'application
- `package.json` : Gestion des dépendances

**Concepts clés :**
- Node.js et npm permettent de gérer les dépendances
- Le serveur de développement recharge automatiquement l'application à chaque modification

---

## 🧩 C'est quoi un composant ? 

### Définition
Un **composant** est une fonction JavaScript qui retourne du code ressemblant à du HTML (JSX). C'est une brique réutilisable de votre interface.

### Analogie
Pensez à un composant comme à une recette de cuisine :
- Vous définissez une fois comment faire un gâteau (le composant)
- Vous pouvez ensuite réutiliser cette recette plusieurs fois
- Vous pouvez personnaliser avec différents ingrédients (les props)

### Exemple simple
```jsx
function Bienvenue() {
  return <h1>Bonjour, bienvenue sur mon site !</h1>;
}
```

**Points importants :**
- Un composant commence toujours par une **majuscule**
- Un composant retourne **un seul élément parent** (ou un Fragment)
- Les composants peuvent être imbriqués les uns dans les autres

---

## ⚙️ ReactDOM.render 

### Le rôle de ReactDOM

**ReactDOM** est le pont entre React et le navigateur web. Il permet d'afficher (ou "rendre") un composant React dans la page HTML.

### Comment ça fonctionne ?

```jsx
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Explication :**
1. On récupère l'élément HTML avec l'id "root" dans `public/index.html`
2. On crée une "racine" React à cet endroit
3. On y affiche notre composant `<App />`

**Schéma mental :**
- Le fichier HTML contient un `<div id="root"></div>` vide
- React "injecte" tout le contenu de l'application dans ce div
- Une fois rendu, React gère toutes les mises à jour automatiquement

---

## 📝 Le JSX 

### Qu'est-ce que le JSX ?

**JSX** = JavaScript XML. C'est une extension de JavaScript qui permet d'écrire du code ressemblant à du HTML directement dans JavaScript.

### Règles importantes

**1. Un seul élément parent**
```jsx
// ❌ Incorrect
return (
  <h1>Titre</h1>
  <p>Paragraphe</p>
);

// ✅ Correct avec une div
return (
  <div>
    <h1>Titre</h1>
    <p>Paragraphe</p>
  </div>
);

// ✅ Correct avec un Fragment
return (
  <>
    <h1>Titre</h1>
    <p>Paragraphe</p>
  </>
);
```

**2. Utiliser des accolades pour du JavaScript**
```jsx
const nom = "Marie";
return <h1>Bonjour {nom} !</h1>;
```

**3. className au lieu de class**
```jsx
// ❌ Incorrect
<div class="container">...</div>

// ✅ Correct
<div className="container">...</div>
```

**4. Les balises auto-fermantes doivent avoir un slash**
```jsx
// ✅ Correct
<img src="photo.jpg" />
<input type="text" />
```

### JSX est transpilé

Le JSX est converti en JavaScript standard par des outils comme Babel :
```jsx
// Ce que vous écrivez
<h1>Bonjour</h1>

// Ce que le navigateur reçoit
React.createElement('h1', null, 'Bonjour')
```

---

## 🔧 Les composants en pratique 

### Créer et utiliser des composants

**Composant simple :**
```jsx
function Bouton() {
  return <button>Cliquez-moi</button>;
}
```

**Utiliser le composant :**
```jsx
function App() {
  return (
    <div>
      <h1>Mon Application</h1>
      <Bouton />
      <Bouton />
      <Bouton />
    </div>
  );
}
```

### Composants avec props (propriétés)

Les **props** permettent de passer des données à un composant :

```jsx
function Bouton(props) {
  return <button>{props.texte}</button>;
}

function App() {
  return (
    <div>
      <Bouton texte="Enregistrer" />
      <Bouton texte="Annuler" />
      <Bouton texte="Supprimer" />
    </div>
  );
}
```

**Avec déstructuration (plus propre) :**
```jsx
function Bouton({ texte, couleur }) {
  return <button style={{ backgroundColor: couleur }}>{texte}</button>;
}
```

### Composition de composants

Vous pouvez imbriquer des composants :
```jsx
function Tweet({ auteur, message }) {
  return (
    <div className="tweet">
      <ProfilUtilisateur nom={auteur} />
      <ContenuTweet texte={message} />
      <BarreActions />
    </div>
  );
}
```

**Bonnes pratiques :**
- Un composant = une responsabilité
- Réutilisez au maximum vos composants
- Nommez clairement vos composants et props

---

## 🪝 C'est quoi les Hooks ? 

### Introduction aux Hooks

Les **Hooks** sont des fonctions spéciales qui permettent d'utiliser des fonctionnalités React dans les composants fonctionnels.

### Pourquoi les Hooks ?

**Avant les Hooks :**
- Il fallait utiliser des "class components" pour gérer l'état et le cycle de vie
- Code plus complexe et verbeux

**Avec les Hooks :**
- Code plus simple et lisible
- Tout peut être fait avec des fonctions
- Meilleure réutilisation de la logique

### Le Hook principal : useState

**useState** permet d'ajouter un état (state) à un composant :

```jsx
import { useState } from 'react';

function Compteur() {
  // Déclare une variable d'état "count" avec valeur initiale 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquer
      </button>
    </div>
  );
}
```

**Syntaxe :**
```jsx
const [valeur, fonctionPourModifier] = useState(valeurInitiale);
```

### Règles des Hooks

1. Les Hooks commencent toujours par "use" (useState, useEffect, etc.)
2. Utilisez les Hooks **uniquement au niveau racine** du composant
3. N'utilisez pas les Hooks dans des boucles, conditions ou fonctions imbriquées

---

## 💡 Les Hooks en pratique 

### Exemples pratiques avec useState

**1. Gérer un formulaire**
```jsx
function FormulaireContact() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  
  return (
    <form>
      <input 
        value={nom} 
        onChange={(e) => setNom(e.target.value)}
        placeholder="Votre nom"
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
      />
      <p>Bonjour {nom}, votre email est {email}</p>
    </form>
  );
}
```

**2. Afficher/masquer du contenu**
```jsx
function Accordeon() {
  const [estOuvert, setEstOuvert] = useState(false);
  
  return (
    <div>
      <button onClick={() => setEstOuvert(!estOuvert)}>
        {estOuvert ? 'Masquer' : 'Afficher'}
      </button>
      {estOuvert && <p>Contenu de l'accordéon</p>}
    </div>
  );
}
```

**3. Gérer une liste**
```jsx
function ListeDeTaches() {
  const [taches, setTaches] = useState([]);
  const [nouvelleTache, setNouvelleTache] = useState('');
  
  const ajouterTache = () => {
    setTaches([...taches, nouvelleTache]);
    setNouvelleTache('');
  };
  
  return (
    <div>
      <input 
        value={nouvelleTache}
        onChange={(e) => setNouvelleTache(e.target.value)}
      />
      <button onClick={ajouterTache}>Ajouter</button>
      <ul>
        {taches.map((tache, index) => (
          <li key={index}>{tache}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ⚖️ La règle des states 

### Principe fondamental

**Ne JAMAIS modifier directement le state !** Toujours utiliser la fonction de mise à jour.

### ❌ À éviter
```jsx
const [utilisateur, setUtilisateur] = useState({ nom: 'Marie', age: 25 });

// ❌ INCORRECT - modification directe
utilisateur.age = 26;

// ❌ INCORRECT - React ne détectera pas le changement
setUtilisateur(utilisateur);
```

### ✅ La bonne méthode
```jsx
// ✅ CORRECT - créer un nouvel objet
setUtilisateur({ ...utilisateur, age: 26 });
```

### Pourquoi cette règle ?

React compare les références des objets pour détecter les changements. Si vous modifiez directement l'objet, React ne voit pas de changement et ne met pas à jour l'interface.

### Exemples pratiques

**Avec des tableaux :**
```jsx
const [fruits, setFruits] = useState(['Pomme', 'Banane']);

// ❌ INCORRECT
fruits.push('Orange');
setFruits(fruits);

// ✅ CORRECT
setFruits([...fruits, 'Orange']);
```

**Avec des objets imbriqués :**
```jsx
const [utilisateur, setUtilisateur] = useState({
  nom: 'Marie',
  adresse: { ville: 'Paris', codePostal: '75001' }
});

// ✅ CORRECT
setUtilisateur({
  ...utilisateur,
  adresse: { ...utilisateur.adresse, ville: 'Lyon' }
});
```

---

## 📋 Les formulaires 

### Formulaires contrôlés

En React, on préfère les **composants contrôlés** : React contrôle la valeur des champs du formulaire via le state.

### Exemple complet

```jsx
function FormulaireInscription() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    accepteCGU: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Données du formulaire:', formData);
    // Ici : envoyer les données à un serveur
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nom"
        value={formData.nom}
        onChange={handleChange}
        placeholder="Nom"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="motDePasse"
        type="password"
        value={formData.motDePasse}
        onChange={handleChange}
        placeholder="Mot de passe"
      />
      <label>
        <input
          name="accepteCGU"
          type="checkbox"
          checked={formData.accepteCGU}
          onChange={handleChange}
        />
        J'accepte les CGU
      </label>
      <button type="submit">S'inscrire</button>
    </form>
  );
}
```

### Points clés

1. **Utiliser `e.preventDefault()`** dans le `onSubmit` pour éviter le rechargement de la page
2. **Lier chaque input au state** avec `value` et `onChange`
3. **Utiliser l'attribut `name`** pour identifier les champs
4. **Les checkbox utilisent `checked`** au lieu de `value`

### Validation

```jsx
const [erreurs, setErreurs] = useState({});

const valider = () => {
  const nouvellesErreurs = {};
  
  if (formData.nom.length < 2) {
    nouvellesErreurs.nom = 'Le nom doit contenir au moins 2 caractères';
  }
  
  if (!formData.email.includes('@')) {
    nouvellesErreurs.email = 'Email invalide';
  }
  
  setErreurs(nouvellesErreurs);
  return Object.keys(nouvellesErreurs).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (valider()) {
    // Soumettre le formulaire
  }
};
```

---

## 🧹 Clean Code 

### Bonnes pratiques en React

#### 1. Organisation des fichiers
```
src/
├── components/
│   ├── Bouton.jsx
│   ├── Formulaire.jsx
│   └── Navigation.jsx
├── pages/
│   ├── Accueil.jsx
│   └── Contact.jsx
└── App.jsx
```

#### 2. Nommage clair
- **Composants** : PascalCase (`MonComposant`)
- **Fonctions** : camelCase (`handleClick`, `fetchData`)
- **Props** : descriptives (`utilisateur` plutôt que `data`)

#### 3. Composants petits et réutilisables
```jsx
// ❌ Composant trop gros
function PageProfil() {
  return (
    <div>
      {/* 200 lignes de code... */}
    </div>
  );
}

// ✅ Découpé en petits composants
function PageProfil() {
  return (
    <div>
      <EnTete />
      <InformationsUtilisateur />
      <ListePublications />
      <Pied />
    </div>
  );
}
```

#### 4. Extraction de la logique
```jsx
// Custom Hook pour réutiliser la logique
function useFormulaire(valeursInitiales) {
  const [valeurs, setValeurs] = useState(valeursInitiales);
  
  const handleChange = (e) => {
    setValeurs({
      ...valeurs,
      [e.target.name]: e.target.value
    });
  };
  
  return [valeurs, handleChange];
}

// Utilisation
function MonFormulaire() {
  const [valeurs, handleChange] = useFormulaire({ nom: '', email: '' });
  // ...
}
```

#### 5. Commentaires utiles
```jsx
// ✅ Bon commentaire : explique le "pourquoi"
// On utilise setTimeout pour éviter les appels API trop fréquents
const debounce = (func, delay) => { /* ... */ };

// ❌ Mauvais commentaire : explique le "quoi" (évident)
// Définit count à 0
const [count, setCount] = useState(0);
```

#### 6. Éviter la répétition (DRY - Don't Repeat Yourself)
```jsx
// ❌ Répétition
<button onClick={() => setCount(count + 1)}>Plus</button>
<button onClick={() => setCount(count - 1)}>Moins</button>
<button onClick={() => setCount(0)}>Reset</button>

// ✅ Composant réutilisable
function BoutonCompteur({ action, texte }) {
  return <button onClick={action}>{texte}</button>;
}
```

---

## 🎯 Concepts clés à retenir

### 1. **React = Composants**
Tout est composant en React. Pensez modulaire et réutilisable.

### 2. **JSX = JavaScript + HTML**
Le JSX permet d'écrire du HTML dans JavaScript, mais avec des règles spécifiques.

### 3. **Props = Communication**
Les props permettent de passer des données d'un composant parent à un composant enfant.

### 4. **State = Mémoire**
Le state permet à un composant de "se souvenir" d'informations et de réagir aux changements.

### 5. **Hooks = Superpouvoir**
Les Hooks (comme useState) donnent des fonctionnalités supplémentaires aux composants.

### 6. **Immutabilité = Règle d'or**
Ne jamais modifier directement le state, toujours créer une nouvelle copie.

---

## 📚 Ressources recommandées

- Documentation officielle React : [react.dev](https://react.dev)
- Formation BeginReact de Melvynx
- GitHub de Melvynx : exercices pratiques disponibles

---

## 💪 Exercices pratiques suggérés

### Débutant
1. Créer un composant "Carte de visite" avec nom, métier et photo
2. Faire un compteur avec boutons +1 et -1
3. Créer une todo-list simple (ajouter/afficher des tâches)

### Intermédiaire
1. Formulaire d'inscription avec validation
2. Filtre de recherche pour une liste de produits
3. Système d'onglets interactifs

### Avancé
1. Clone simplifié de Twitter
2. Application de notes avec CRUD complet
3. Dashboard avec graphiques et données dynamiques

---

## ✅ Checklist de compréhension

Vous avez compris ce cours si vous pouvez :

- [ ] Expliquer ce qu'est React et pourquoi l'utiliser
- [ ] Créer un nouveau projet React
- [ ] Créer un composant fonctionnel simple
- [ ] Expliquer ce qu'est le JSX et ses règles
- [ ] Passer des props à un composant
- [ ] Utiliser useState pour gérer un état local
- [ ] Respecter la règle d'immutabilité du state
- [ ] Créer un formulaire contrôlé
- [ ] Organiser votre code de manière propre


*Document créé à partir du cours "React Component et JSX en 1 heure (1/5)" par Melvynx*