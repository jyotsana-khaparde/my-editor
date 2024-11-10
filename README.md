# my-editor

- The editor is written in Draft.js
  - Typing `#` as the first string in a line & pressing space should make anything you type afterwards on the same line be in a “Heading” format. On pressing space the aforementioned `#` should disappear.
  - See “This is a heading” line in the layout image above.
  - Similarly, typing `*` as the first string in a line and pressing space should correspond to “bold” format.
  - `**` and space = red line
  - `***` and space = underline
- Pressing `Save` button should persist everything typed in the editor into `localstorage`. On refreshing the page, the saved info should be refilled into the editor.

# Steps to run on local
To run a My-editor project cloned from GitHub, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

That's it! The app should now be running on `http://localhost:3000` by default.
