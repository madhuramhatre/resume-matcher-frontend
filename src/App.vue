<template>
  <div id="app">
    <h1>AI Resume Matcher</h1>

    <div class="input-section">
      <div class="input-group">
        <label for="job-description">Job Description</label>
       <textarea
          id="job-description"
          v-model="jobDescription"
          rows="10"
          placeholder="Paste the full job description here..."
        ></textarea>
      </div>

      <div class="input-group">
        <label for="resume-text">Candidate Resume</label>
        <textarea
          id="resume-text"
          v-model="candidateResume"
          rows="10"
          placeholder="Paste the candidate's full resume text here..."
        ></textarea>
      </div>
    </div>

    <button @click="analyzeMatch" :disabled="loading">
      {{ loading ? 'Analyzing...' : 'Analyze Match' }}
    </button>

    <div v-if="loading" class="loader">Loading analysis...</div>

    <div v-if="matchResult" class="analysis-output">
      <h2>Analysis Results</h2>
      <p><strong>Match Percentage:</strong> {{ matchResult.match_percentage }}%</p>
      <p><strong>Explanation:</strong> {{ matchResult.explanation }}</p>
    </div>

    <div v-if="errorMessage" class="error-message">
      <p>Error: {{ errorMessage }}</p>
      <p>Please try again or check your backend API connection.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobDescription: '',
      candidateResume: '',
      // --- UPDATED: Backend URL with endpoint ---
      backendApiUrl: 'https://resume-matcher-backend-lu7b.onrender.com/analyze-resume',
      // --- END UPDATED ---
      matchResult: null,
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    async analyzeMatch() {
      // --- UNCOMMENTED AND ACTIVATED FETCH LOGIC ---
      console.log("Attempting to analyze match...");
      this.errorMessage = '';
      this.matchResult = null;
      this.loading = true;

      const formData = new URLSearchParams();
      formData.append('job_description', this.jobDescription);
      formData.append('candidate_resume', this.candidateResume);

      try {
          const response = await fetch(this.backendApiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formData.toString(),
          });

          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }

          const data = await response.json();
          // Assuming the backend returns { "match_result": { "match_percentage": ..., "explanation": ... } }
          this.matchResult = data.match_result;
      } catch (error) {
          console.error("Error connecting to backend:", error);
          this.errorMessage = `Network error: Could not connect to backend API at ${this.backendApiUrl}. Please check if the backend is running and the URL is correct.`;
      } finally {
          this.loading = false;
      }
      // --- END UNCOMMENTED LOGIC ---
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

h1 {
  color: #34495e;
  margin-bottom: 30px;
}

.input-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  flex: 1;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #34495e;
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box; /* Include padding in width calculation */
  resize: vertical; /* Allow vertical resizing */
  min-height: 200px;
}

button {
  background-color: #42b983; /* Vue green */
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

button:hover:not(:disabled) {
  background-color: #36a273;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loader {
  font-size: 1.1em;
  color: #42b983;
  margin-top: 15px;
}

.analysis-output {
  margin-top: 30px;
  text-align: left;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.analysis-output h2 {
  color: #34495e;
  margin-bottom: 15px;
}

.analysis-output div {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 20px;
  white-space: pre-wrap; /* Preserves whitespace and line breaks */
  word-wrap: break-word; /* Breaks long words */
}

.error-message {
  color: #e74c3c;
  margin-top: 20px;
  border: 1px solid #e74c3c;
  padding: 10px;
  border-radius: 6px;
  background-color: #fef5f5;
}
</style>