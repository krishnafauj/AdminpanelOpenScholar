# Soundverse DNA - Frontend Assignment

This is a pixel-perfect, responsive reproduction of the Soundverse DNA UI, built with **Next.js 14**, **Tailwind CSS**, and **Howler.js** for audio logic.

## 🚀 Live Demo
[https://assign2-dun-gamma.vercel.app/](https://assign2-dun-gamma.vercel.app/)

## 🛠 Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Audio Engine:** Howler.js (via `react-howler` logic)
- **State Management:** React Context API (`PlayerContext` & `UIContext`)
- **Fonts:** Inter & Custom Grotesque styles

## ✨ Key Features
1. **Global Audio Player:**
   - Continuous playback across page navigation.
   - Keyboard controls (Space to Play/Pause, Arrows to Seek).
   - Smooth `slide-up` entrance animation.
2. **Dynamic Panels:**
   - **DNA Panel:** Collapsible sidebar with responsive behavior (Overlay on Mobile, Side-by-side on Desktop).
   - **Main Content:** Can be hidden/reopened, featuring an "Empty State" placeholder.
3. **Micro-Interactions:**
   - Smooth hover states on Style Cards (Scale + Glow).
   - Animated sliding toggles in the DNA panel.
   - Tactile active states on sidebar buttons.
4. **Responsive Design:**
   - Mobile-first approach.
   - Adaptive grid for Style Cards.
   - Dynamic sizing for the Artist Hero section ("Coldplay") to prevent text overflow.

## 📸 Screenshots

### 1. Desktop: Full Interface
*The complete view with the Artist Hero section and the DNA Control Panel open.*
![Desktop Full View](https://github.com/user-attachments/assets/26e94ff6-60fa-439b-b2bc-b49d10e5b4eb)

### 2. Desktop: Empty State (No Artist)
*The layout handling the state when the main content/artist is hidden or removed.*
![Desktop No Sidebar](https://github.com/user-attachments/assets/cd51f2ee-600f-4828-b05e-43ed594a935c)


### 3. Desktop: Focus Mode (No DNA)
*The DNA panel collapsed to maximize the content area.*

![Desktop No Artist](https://github.com/user-attachments/assets/626d3cda-ca77-40d6-bf9a-19e15830a320)




### 4. Mobile View
<table>
  <tr>
    <td align="center" width="30%">
      <img src="https://github.com/user-attachments/assets/3298015e-22fd-4085-abab-56420a8c3157" width="100%" alt="Mobile View" />
      <br />
      <sub><b>Mobile View</b></sub>
    </td>
    <td align="center" width="70%">
      <img src="https://github.com/user-attachments/assets/6209e3f3-c640-4fb1-b4eb-4b7df46fcf3f" width="100%" alt="Tablet View" />
      <br />
      <sub><b>Tablet / Desktop View</b></sub>
    </td>
  </tr>
</table>

---

## ⚙️ Setup & Run

1. **Clone the repository:**
   ``
   
   `bash
   https://github.com/krishnafauj/assign2.git
 dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧠 Design Decisions & Trade-offs
-   **Audio Logic:** I used the Context API combined with `refs` for the audio player to ensure high-performance seeking without re-rendering the entire component tree unnecessarily.
-   **Animations:** Instead of heavy animation libraries, I utilized native CSS transitions and Tailwind's utility classes for better performance and smaller bundle size.
-   **Responsiveness:** The "DNA Panel" switches from `relative` positioning (desktop) to `absolute` positioning (mobile) to maximize screen real estate on smaller devices.
