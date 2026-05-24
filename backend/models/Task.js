const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, required: true, enum: ['To Do', 'In Progress', 'Review', 'Completed'], default: 'To Do' },
    priority: { type: String, required: true, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    aiRoadmap: { type: [String], default: [] },
    complexityScore: { type: Number, default: 0 },
    skillTag: { type: String, default: '' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

taskSchema.virtual('isOverdue').get(function () {
  if (this.status === 'Completed') return false;
  const dueDate = new Date(this.createdAt);
  dueDate.setDate(dueDate.getDate() + 7);
  return new Date() > dueDate;
});

module.exports = mongoose.model('Task', taskSchema);
