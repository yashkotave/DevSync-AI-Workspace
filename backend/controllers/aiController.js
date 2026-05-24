const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Task = require('../models/Task');

const client = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

const generateAIInsights = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'Title and description are required for AI optimization', data: null });
  }

  const prompt = `You are an AI sprint assistant for a professional Agile planning tool. Return only valid raw JSON without markdown or backticks in this exact structure:\njson{\n  "roadmap": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],\n  "skillTag": "Frontend",\n  "complexityScore": 7\n}\nUse the task title and description to infer a clear 3 step roadmap, a single concise skill tag, and a complexity score from 1 to 10.`;
  const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const response = await model.generateContent({
    contents: [`${prompt}\n\nTask Title: ${title}\nTask Description: ${description}`],
    generationConfig: { temperature: 0.2, maxOutputTokens: 320 }
  });

  const rawText = response?.response?.text?.() || '';
  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/^json\s*\{/, '{').replace(/```json|```/g, '').trim();

  try {
    const data = JSON.parse(cleaned);
    if (!Array.isArray(data.roadmap) || typeof data.skillTag !== 'string' || typeof data.complexityScore !== 'number') {
      throw new Error('AI output did not match expected schema');
    }
    return res.json({ success: true, message: 'AI insights generated', data });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'AI response could not be parsed safely', data: null });
  }
});

const saveAIInsights = asyncHandler(async (req, res) => {
  const { aiRoadmap, complexityScore, skillTag } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found', data: null });
  }

  task.aiRoadmap = Array.isArray(aiRoadmap) ? aiRoadmap : task.aiRoadmap;
  task.complexityScore = typeof complexityScore === 'number' ? complexityScore : task.complexityScore;
  task.skillTag = typeof skillTag === 'string' ? skillTag : task.skillTag;
  await task.save();

  const updatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email role avatar')
    .populate('createdBy', 'name');

  res.json({ success: true, message: 'AI insights saved to task', data: updatedTask });
});

module.exports = { generateAIInsights, saveAIInsights };
