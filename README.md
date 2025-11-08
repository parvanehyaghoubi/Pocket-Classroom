<p align="center">
  <img src="https://github.com/parvanehyaghoubi/Pocket-Classroom/blob/main/assets/logo.png" alt="seda logo" width="400"/>
</p>

# Pocket Classroom

**Pocket Classroom** is an offline-friendly, interactive learning app built with **HTML**, **CSS**, and **Vanilla JavaScript**.  
It lets users **create**, **manage**, and **study** learning capsules containing **Notes**, **Flashcards**, and **Quizzes** — all stored locally using `LocalStorage`.

---

## 🚀 Main Features

### 📚 Library
- Grid view of all saved capsules.
- Shows **Title**, **Subject**, **Level**, **Last Updated**, **Best Quiz Score**, **Known Cards**.
- Actions: **Learn**, **Edit**, **Export**, **Delete**, **New Capsule**, **Import JSON**.
- Progress bar and best score update automatically after learning.

### ✍️ Author Mode
- Create or edit capsules.
- Add **metadata**, **notes**, **flashcards**, and **quiz questions**.
- Local auto-save with one-click **Save** and **Back** buttons.

### 🎓 Learn Mode
- Study in 3 tabs:
  - **Notes** – clean searchable list.
  - **Flashcards** – flip cards, mark known/unknown.
  - **Quiz** – sequential questions, instant feedback, and score tracking.
- Updates Library progress and best score automatically.

---

## 💾 Local Storage Keys
- `pc_capsules_index` – list of all capsules  
- `pc_capsule_<id>` – capsule content  
- `pc_progress_<id>` – known cards & quiz scores  

---

## ⚙️ Run Locally
1. Clone or download the repo  
2. Open `index.html` in your browser  
3. Everything works **offline** — no backend needed 🎉

---

## 🧱 Built With
- HTML5, CSS3, JavaScript (ES6)
- Bootstrap 5
- LocalStorage API

---

## 📈 Future Ideas
- Cloud sync  
- Advanced statistics  
- Tag & search filters  
- Theme customization  

---

## 👨‍💻 Author
**Pocket Classroom** — created by *[Parvaneh Yaghoubi]*  
An AI & learning enthusiast passionate about smart, minimal study tools.

---

## 🪪 License
Released under the **MIT License** – free to use, modify, and share.
