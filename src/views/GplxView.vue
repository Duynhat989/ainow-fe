<template>
    <div>
        <header>
            <h1>Hệ thống trắc nghiệm</h1>
        </header>

        <div class="container">
            <div id="main">
                <div id="questionContainer" v-if="questions.length">
                    <div class="question-header">
                        <h2>Câu {{ currentQuestion.index }}: {{ currentQuestion.question }}</h2>
                    </div>

                    <div v-if="currentQuestion.image" class="question-image">
                        <img :src="currentQuestion.image" alt="Ảnh minh họa" />
                    </div>

                    <div class="answers">
                        <button v-for="(answer, i) in currentQuestion.answers" :key="i"
                            :class="getAnswerClass(i, answer.isTrue)" :disabled="answered.has(currentIndex)"
                            @click="handleAnswer(i, answer.isTrue)">
                            {{ answer.text }}
                        </button>
                    </div>

                    <div class="navigation">
                        <button :disabled="currentIndex === 0" @click="currentIndex--">Câu trước</button>
                        <button :disabled="currentIndex === questions.length - 1" @click="currentIndex++">Câu tiếp
                            theo</button>
                    </div>
                </div>

                <div v-else class="question-placeholder">
                    <p>Vui lòng tải lên file JSON chứa câu hỏi để bắt đầu.</p>
                </div>
            </div>

            <div id="sidebar">
                <h3>Danh sách câu hỏi</h3>
                <div id="questionList">
                    <button v-for="(q, index) in questions" :key="index"
                        :class="['question-btn', { active: currentIndex === index, answered: answered.has(index) }]"
                        @click="showQuestion(index)">
                        Câu {{ q.index }}
                    </button>
                </div>
                <hr />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import applicationData from '../utils/time' // giả định bạn vẫn dùng time.js

const questions = ref(applicationData || [])
const currentIndex = ref(0)
const answered = ref(new Map())

const currentQuestion = computed(() => questions.value[currentIndex.value] || {})

function showQuestion(index) {
    currentIndex.value = index
}

function handleAnswer(i, isTrue) {
    if (answered.value.has(currentIndex.value)) return

    answered.value.set(currentIndex.value, i)
}

function getAnswerClass(index, isTrue) {
    const answeredIndex = answered.value.get(currentIndex.value)

    if (answeredIndex === undefined) return ''

    if (isTrue) return 'correct'
    if (answeredIndex === index && !isTrue) return 'wrong'
    return ''
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--text);
    background-color: #f9fafb;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0;
    margin: 0;
}

.container {
    display: flex;
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    background-color: white;
}

header {
    background-color: var(--primary);
    color: white;
    padding: 1rem;
    text-align: center;
    margin-bottom: 1rem;
}

header h1 {
    font-size: 1.5rem;
    font-weight: 600;
}

#sidebar {
    width: 250px;
    background-color: white;
    border-right: 1px solid var(--border);
    padding: 1.5rem;
    overflow-y: auto;
    max-height: calc(100vh - 160px);
}

#sidebar h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--text);
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
}

#questionList {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

#questionList button {
    background-color: var(--secondary);
    border: none;
    border-radius: 0.375rem;
    padding: 0.75rem;
    text-align: left;
    font-size: 0.9rem;
    transition: all 0.2s;
    cursor: pointer;
    color: var(--text);
    font-weight: 500;
}

#questionList button:hover {
    background-color: var(--secondary-hover);
}

#questionList button.active {
    background-color: var(--primary);
    color: white;
}

#questionList button.answered {
    border-left: 4px solid var(--primary);
}

#fileInput {
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem;
    border: 1px dashed var(--border);
    border-radius: 0.375rem;
    background-color: var(--secondary);
}

#fileInput::file-selector-button {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-right: 0.5rem;
    font-size: 0.875rem;
}

#main {
    flex-grow: 1;
    padding: 2rem;
    overflow-y: auto;
}

#questionContainer {
    max-width: 800px;
    margin: 0 auto;
}

.question-header {
    margin-bottom: 1.5rem;
}

.question-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text);
    line-height: 1.4;
}

.question-image {
    margin-bottom: 1.5rem;
    text-align: center;
}

.question-image img {
    max-width: 100%;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
}

.answers {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.answers button {
    background-color: white;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: left;
    font-size: 1rem;
    transition: all 0.2s;
    cursor: pointer;
    box-shadow: var(--shadow);
}

.answers button:hover:not(:disabled) {
    border-color: var(--primary);
    background-color: var(--secondary);
}

.answers button:disabled {
    cursor: default;
}

.answers button.correct {
    background-color: var(--correct-bg);
    border-color: var(--correct);
    color: var(--correct);
    font-weight: 500;
}

.answers button.wrong {
    background-color: var(--wrong-bg);
    border-color: var(--wrong);
    color: var(--wrong);
}

.navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
}

.navigation button {
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 0.375rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.navigation button:hover {
    background-color: var(--primary-hover);
}

.navigation button:disabled {
    background-color: var(--secondary);
    color: var(--text-light);
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    #sidebar {
        width: 100%;
        max-height: none;
        border-right: none;
        border-bottom: 1px solid var(--border);
    }

    #questionList {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }

    #questionList button {
        text-align: center;
        padding: 0.5rem;
    }
}
</style>
