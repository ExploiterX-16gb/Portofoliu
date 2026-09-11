# ExploiterX / NoxerX — Portfolio

Portofoliu static, gândit pentru GitHub Pages, împărțit în exact 10 fișiere.

## Fișiere

1. `index.html` — pagina principală
2. `projects.html` — proiecte + încărcare automată a repository-urilor publice GitHub
3. `book.html` — pagina cărții
4. `about.html` — despre ExploiterX / NoxerX
5. `contact.html` — contact
6. `style.css` — design dark / green / responsive
7. `script.js` — animații, GitHub API și interacțiuni
8. `comments.js` — sistemul de comentarii
9. `config.js` — configurare
10. `README.md` — instrucțiuni

## Comentarii

Sistemul folosește **giscus + GitHub Discussions**. Giscus nu cere o bază de date proprie; comentariile sunt stocate în GitHub Discussions, iar vizitatorii se autentifică prin GitHub pentru a comenta.

1. Repository-ul trebuie să fie public.
2. Activează **Discussions** în repository.
3. Instalează aplicația giscus pe repository.
4. Intră pe https://giscus.app/ro și selectează repository-ul + categoria.
5. Copiază `Repository ID` și `Category ID` în `config.js`.
6. Fă push pe GitHub Pages.

### Config

În `config.js`:

- `GITHUB_USER` = username-ul GitHub.
- `GITHUB_REPO` = repository-ul folosit pentru Discussions.
- `GISCUS_REPO_ID` = ID-ul oferit de giscus.
- `GISCUS_CATEGORY` = categoria aleasă.
- `GISCUS_CATEGORY_ID` = ID-ul categoriei.
- `BOOK_URL` = calea către PDF-ul cărții.

## Cartea

Pune PDF-ul în repository, de exemplu:

`assets/ExploiterX_Ethical_Hacking_120_Capitole_3500_Pagini_REAL.pdf`

și păstrează aceeași valoare în `BOOK_URL`.

## GitHub Pages

Poți păstra aceste fișiere în repository-ul tău și activa Pages din:

**Settings → Pages → Deploy from a branch**

Site-ul este static, deci nu are nevoie de Node.js sau server propriu.

## Notă de securitate

Nu pune token-uri GitHub, parole, API keys private sau alte secrete în aceste fișiere. Configurația Giscus este destinată frontend-ului public.
