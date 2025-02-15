## Code Stuff

It's all in one file: `main.cpp`.

**Inside `main.cpp`:**

- **Headers:** Just the usual C++ stuff (`iostream`, `vector`, `string`, `algorithm`, `regex`).
- **Global Vars:**
  - `facs`: `vector<string>` with the valid faculties.
  - `stats`: `vector<string>` with the valid student statuses.
- **`Student` Struct:** Holds the student info:
- **Check Functions:**
  - `goodEmail(const string& email)`: Checks if the email is valid (using regex, ugh).
  - `goodPhone(const string& phone)`: Checks if the phone number is valid (VN format).
  - `goodFac(const string& fac)`: Checks if it's a valid faculty.
  - `goodStat(const string& stat)`: Checks if it's a valid status.
- **Action Functions:**
  - `add(vector<Student>& studs)`: Adds a new student.
  - `findById(const vector<Student>& studs, const string& id)`: Finds a student by ID (returns the index or -1 if not found).
  - `del(vector<Student>& studs)`: Deletes a student by ID.
  - `update(vector<Student>& studs)`: Updates a student's info by ID.
  - `search(const vector<Student>& studs)`: Searches for students by ID or name.
- **`main()` Function:**
  - `vector<Student> studs`: This is where all the student data is stored.
  - A `do-while` loop that shows the menu and does what you choose.

## How to Run

1.  **Get Ready:**
    - Make sure you have a C++ compiler (like g++) installed.
2.  **Compile:**
    - Open your terminal or command prompt.
    - Go to the folder where `main.cpp` is.
    - Run:
      ```bash
      g++ main.cpp -o studentmanager
      ```
3.  **Run:**
    - After compiling, run the program with:
      ```bash
      ./studentmanager
      ```
