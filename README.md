# Recipe Frontend with Vue 3

- This app features 3 user groups:
    1. Admin - for managind user roles
    2. Career_Services - for giving reviews to resumes submitted by students
    3. Student - For creating resumes and performing job matches

This application allows users to create and maintain a list of resumes pdfs. A user can also submit resume for review to career services. This app also features AI(cohere) for assistance in job matching by comparing a resume to a job description and giving it a score and some comments. Please visit https://github.com/jyaheza/resume-generator-back for the Vue 3 frontend repository.


## Project Setup

1. Clone the project into your **XAMPP/xamppfiles/htdocs/resumeeapp** directory.

```
git clone https://github.com/jyaheza/resume-generator-front.git
```

2. Install the project.

```
npm install
```

3. Make sure **Apache** is running.

   - We recommend using XAMPP to serve this project.
   - In XAMPP, make sure that **Apache** is running.

4. Compile and run the project locally.

```
npm run dev
```

5. Open http://localhost:8081 in a browser to view the project running.

6. (Optional) Compile the project for production.

```
npm run build
```

7. (Optional) Lint and fix the project files.

```
npm run lint
```
