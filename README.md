
#🧮 Calculatrice Scientifique 
## 🏗️ Architecture Technique
### 🔸 Front-end
- **HTML / CSS (Grid)** : structure et style de l’interface utilisateur.
- **JavaScript (Fetch API)** : communication asynchrone avec le serveur.
- **Responsive Design** : interface fluide adaptée aux écrans PC, tablette, mobile.
### 🔸 Back-end
- **Framework : Flask**
  - Fournit la page principale (`index.html`).
  - Expose une API REST `POST /api/calc` recevant des expressions mathématiques.
- **Librairies Python principales :**
  - [`sympy`](https://www.sympy.org) : évaluation et sécurisation des expressions mathématiques.
  - [`mpmath`](https://mpmath.org) : calculs haute précision.
  - [`pydantic`](https://docs.pydantic.dev) : validation des requêtes API.
  - [`pytest`](https://pytest.org) : tests unitaires.
## 📂 Arborescence du projet
calculator/
│
├── app.py 
│
├── calc/
│ ├── init.py
│ ├── engine.py
│ └── schemas.py
│
├── templates/
│ └── index.html
│
├── static/
│ ├── styles.css
│ └── app.js 
│
├── tests/
│ └── test_engine.py
│
├── .venv/ # Environnement virtuel
└── README.md
### 1️⃣ Cloner ou copier le projet
```bash
git clone https://github.com/<ton-compte>/calculator.git
cd calculator
2️⃣ Créer et activer l’environnement virtuel
powershell
Copy code
python -m venv .venv
. .\.venv\Scripts\Activate.ps1    # (PowerShell)
# ou
.venv\Scripts\activate            # (cmd)
3️⃣ Installer les dépendances
bash
Copy code
pip install flask sympy mpmath pydantic pytest
4️⃣ Lancer les tests
bash
Copy code
python -m pytest -q
5️⃣ Démarrer le serveur Flask
bash
Copy code
python app.py
➡️ Ouvre http://127.0.0.1:5000 dans ton navigateur.

🧠 Fonctionnalités
🧩 Calculs de base
Addition, soustraction, multiplication, division

Puissance ^, racine carrée √, factorielle !

Priorité d’opérations respectée (parenthèses incluses)

📈 Fonctions scientifiques
Catégorie	Fonctions
Trigonométriques	sin, cos, tan, asin, acos, atan
Hyperboliques	sinh, cosh, tanh
Logarithmes	ln, log(x, base)
Exponentielles	exp, pow, sqrt, cbrt
Divers	abs, floor, ceil, round
Constantes	π, e

🎛️ Modes et options
Mode Angle : deg ou rad

Précision configurable (10–80 chiffres)

Historique instantané

Bouton Ans = dernier résultat

Gestion des erreurs claires (division par zéro, domaine invalide, etc.)

💡 Bonnes pratiques intégrées
✅ Pas d’utilisation de eval() → parsing sûr via sympy.parse_expr

✅ Gestion d’exceptions et validation Pydantic

✅ Code organisé : séparation logique / interface

✅ Tests unitaires avec pytest

✅ Interface responsive (CSS Grid)

✅ Accessibilité clavier (Enter, Backspace, etc.)

🎨 Aperçu de l’interface
sql
Copy code
+-----------------------------------------------------+
| [   sin(30)+log(100,10)^2    ]   [ = ]             |
|-----------------------------------------------------|
|  7  8  9  ÷  ×  sqrt()                              |
|  4  5  6  −  +  ^                                   |
|  1  2  3  π  e  ln()                                |
|  0  00 .  (  )  AC  DEL                             |
|-----------------------------------------------------|
| Résultat : 4.5                                      |
+-----------------------------------------------------+
🧪 Exemple d’appel API
Requête :
json
Copy code
POST /api/calc
{
  "expr": "sin(30)+log(100,10)^2",
  "angle": "deg",
  "precision": 20
}
Réponse :
json
Copy code
{
  "ok": true,
  "result": "4.5"
}
🧰 Outils & technologies
Type	Outil
Framework web	Flask
Calcul scientifique	SymPy, mpmath
Validation API	Pydantic
Tests	Pytest
Front-end	HTML, CSS (Grid), JavaScript (Fetch API)
Environnement	Python 3.12, venv

🧭 Roadmap future
 Ajout du mode complexe (i, cis())

 Gestion mémoire : MC, MR, M+, M-

 Historique multi-lignes

 Mode “thème sombre/clair”

 Export historique en .txt

 Déploiement sur Render / Railway / Docker

📄 Licence
Projet sous licence MIT — libre de réutilisation, modification et distribution à des fins éducatives ou personnelles.

👨‍💻 Auteur
Sininou Schenider
📍 Projet personnel de développement web & Python
🧠 Contact : enrickminko@gmail.com 
