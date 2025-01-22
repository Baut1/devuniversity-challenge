import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>DevUniversity Challenge Objective</h1>
      <p>
        The objective of this challenge is to evaluate your skills in developing a complete web application using <strong>React.js</strong>, <strong>Next.js</strong>, <strong>TypeScript</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>, as well as your ability to apply best practices in terms of optimization, styling, and code organization.
      </p>
      <h2>Required Functionality</h2>
      <ul>
        <li>List tasks: Users should be able to see a list of their tasks.</li>
        <li>Create tasks: Users should be able to add new tasks.</li>
        <li>Edit tasks: Users should be able to modify existing tasks.</li>
        <li>Delete tasks: Users should be able to remove tasks they no longer need.</li>
        <li>Authentication: Only logged-in users can access their tasks using Auth0 or JWT.</li>
        <li>Tasks per user: Each user can only see and manage their own tasks.</li>
      </ul>

      <h2>Backend Requirements</h2>
      <ul>
        <li>RESTful API with Node.js and Express.</li>
        <li>Connect the backend to a MongoDB database using Mongoose.</li>
        <li>Implement centralized error handling middleware.</li>
        <li>Document backend routes using Swagger.</li>
        <li>Include unit and integration tests using Jest and supertest.</li>
      </ul>

      <h2>Frontend Requirements</h2>
      <ul>
        <li>Use Next.js 13 and React.js with TypeScript.</li>
        <li>Responsive design with React Server Components (RSC) where needed.</li>
        <li>Hybrid data fetching with <code>getServerSideProps</code> and <code>getStaticProps</code>.</li>
        <li>Modular and reusable styling with SCSS (using <code>.module.scss</code>).</li>
        <li>Implement light and dark themes using SCSS variables.</li>
        <li>Optimize images with <code>next/image</code> and implement lazy loading.</li>
        <li>Include dynamic and nested routes for task management.</li>
        <li>Write unit tests for components with Jest and React Testing Library.</li>
        <li>Deploy the application on Vercel.</li>
      </ul>
      
      <div className={styles.bonus}>
        <h3>Bonus Points</h3>
        <ul>
          <li>Implement subtasks and dependencies.</li>
          <li>Add an advanced filtering system and custom views.</li>
          <li>Include multi-language support with <code>next-i18next</code> or <code>react-intl</code>.</li>
        </ul>
      </div>

      <div className={styles.submission}>
        <h3>Submission</h3>
        <ul>
          <li>Upload your code to a public GitHub repository.</li>
          <li>Include a <code>README.md</code> file with detailed instructions.</li>
          <li>Provide the repository link with any additional comments.</li>
        </ul>
      </div>
    </div>
  );
}
