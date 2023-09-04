<h1 align="center">Moodo | Todo List App</h1>
<h2 align="center"><a href="https://moodo-sakshgupta.vercel.app/">Visit Moodo</a></h2>

<p>Welcome to Moodo, a simple and efficient todo list application that helps you stay organized and boost your productivity. Moodo offers a range of features to manage your tasks effortlessly.</p>

<h1>Features 📋</h1>
<ul>
  <li><strong>Task Management:</strong> Add, edit, and delete tasks with ease.</li>
  <li><strong>Task Categories:</strong> Organize tasks by assigning categories or tags.</li>
  <li><strong>User Authentication:</strong> Securely log in and manage your tasks with user accounts.</li>
  <li><strong>Edit Tasks:</strong> Modify and update your existing tasks effortlessly.</li>
  <li><strong>Filter Functionality:</strong> Easily find specific tasks using the filters.</li>
  <li><strong>Completed Tasks:</strong> Archive completed tasks for future reference.</li>
  <li><strong>HTTP Methods:</strong> Utilize HTTP methods, including GET, POST, PUT, and DELETE for seamless task management.</li>
  <li><strong>Basic Validation:</strong> Implemented basic validation to ensure no empty task titles and reasonable title length.</li>
</ul>

<h1>Technologies Used 🚀</h1>
<ul>
  <li><strong>Next.js:</strong> A React-based framework for building server-side rendered applications.</li>
  <li><strong>Tailwind CSS:</strong> A utility-first CSS framework for creating responsive and stylish UIs.</li>
  <li><strong>Node.js:</strong> A JavaScript runtime for building server-side applications.</li>
  <li><strong>Express:</strong> A minimalistic web framework for Node.js for creating server applications.</li>
  <li><strong>MongoDB:</strong> A NoSQL database for storing and retrieving task data.</li>
</ul>

<h1>Getting Started 🛠️</h1>
<h3>Installation</h3>
<p>Clone the repository and navigate to the project's root directory.</p>
<pre><code class="language-bash">git clone https://github.com/sakshgupta/moodo-list.git
cd moodo-todo-list</code></pre>

<p>Install the project dependencies in both the folders.</p>
<pre><code class="language-bash">cd client
npm install</code></pre>
<pre><code class="language-bash">cd server
npm install</code></pre>

<h3>Configuration</h3>
<p>Set up environment variables:</p>

<h4>For the client-side:</h4>
<p>Create a <b>.env.local</b> file in the client folder with the following variables:</p>
<pre><code class="language-bash">NEXT_PUBLIC_FLAG - Flag value to determine whether you want to run the project locally or in production (eg: LOCAL, PRODUCTION)
# LOCAL -> run locally
# PRODUCTION -> run in deployed sites
</code></pre>

<h4>For the server-side:</h4>
<p>Create a <b>.env</b> file in the server folder with the following variables:</p>
<pre><code class="language-bash">MONGO_ATLAS_URI - the connection string for your MongoDB database</code></pre>

<h3>Start the Application</h3>
<p>Run the development server for the client-side.</p>
<pre><code class="language-bash">cd client
npm run dev</code></pre>

<p>Run the server for the backend.</p>
<pre><code class="language-bash">cd server
node index.js</code></pre>

<p>Open your browser and navigate to <a href="http://localhost:3000">http://localhost:3000</a> to use Moodo.</p>

<h1>Usage 💡</h1>
<p>Start creating and managing your tasks efficiently with Moodo.</p>

<h1>Contributing 🤝</h1>
<p>I welcome contributions! Feel free to submit pull requests to enhance Moodo and make it even more amazing.</p>

<h1>License 📜</h1>
<p>This project is licensed under the MIT License - see the LICENSE.md file for details.</p>
