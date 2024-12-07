
# Bite Bot

A food ordering system with a nutritional chatbot in react and springboot for SDA Spring 2024

## Backend

## How to Run This Project in IntelliJ IDEA

Follow these steps to set up and run the project:

### Prerequisites

1. Install [IntelliJ IDEA](https://www.jetbrains.com/idea/download/).
2. Ensure you have [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed.
3. Install [Maven](https://maven.apache.org/download.cgi) or ensure it's included in IntelliJ.

---

### Steps to Run the Project

#### Step 1: Clone the Repository

1. Open a terminal.
2. Clone the repository to your local machine:

    ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

#### Step 2: Open the Project in IntelliJ IDEA

1. Launch IntelliJ IDEA.
2. Click **File > Open**.
3. Select the cloned repository folder.
4. IntelliJ will detect the `pom.xml` file and automatically import the project.

#### Step 3: Import Maven Dependencies

1. Open the Maven tool window from the menu: View > Tool Windows > Maven.
2. Click the Reload All Maven Projects button (refresh icon) to import dependencies.

#### Step 4: Set Up JDK

1. Go to File > Project Structure > Project Settings > Project.
2. Set the Project SDK to the installed JDK version.
3. Set the Language Level to match the required Java version (e.g., 17 if specified in pom.xml).

#### Step 5: Build the Project

1. Open the Maven tool window.
2. Under Lifecycle, double-click clean and then install to build the project.

#### Step 6: Run the Application

1. Locate the main class file in the `src/main/java` directory.
2. Right-click the main class and select **Run < ClassName >**.
3. Alternatively, use Maven commands:

  ```bash
   mvn spring-boot:run  # For Spring Boot projects```
  ```
  
  Or:

  ```bash
  mvn exec:java -Dexec.mainClass="com.example.Main"  # Replace with your main class
  ```

# Frontend

## How to Run This Project (React + Vite)

Follow these steps to set up and run the project:

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (version 16 or higher is recommended).
2. Install a package manager like [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/).

---

### Steps to Run the Project

#### Step 1: Clone the Repository

1. Open a terminal.
2. Clone the repository to your local machine:

  ```bash
   git clone <repository-url>
   cd <repository-folder>
  ```

#### Step 2: Install Dependencies

1. Navigate to the project folder (if not already there): `cd <repository-folder>`.
2. Install the required dependencies:

- Using npm:

    ```bash
    npm install.
    ```
  
- Or using yarn:

    ```bash
    yarn install
    ```

#### Step 3: Start the Development Server

1. Run the following command to start the development server:

- Using npm:
  
    ```bash
     npm run dev
    ```

- Or using yarn:  

    ```bash
     yarn dev
    ```

2. After the server starts, you'll see output similar to this:

  ```text
   VITE vX.X.X  ready in Y.Xs

   ➜  Local:   http://localhost:3000/
   ➜  Network: http://192.168.X.X:3000/
  ```
