const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Issue = require('../models/Issue');

// Home Page (Show list of projects)
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.render('index', { projects });
});

// Create New Project Page
router.get('/projects/new', (req, res) => {
  res.render('newProject');
});

// Handle New Project Creation
router.post('/projects', async (req, res) => {
  const { name, description, author } = req.body;
  await Project.create({ name, description, author });
  res.redirect('/');
});

// Show Project Details and related issues
router.get('/projects/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  const issues = await Issue.find({ project: req.params.id });
  res.render('projectDetails', { project, issues });
});

// Filter issues (by label, author)
router.get('/projects/:id/filter', async (req, res) => {
  const { labels, author } = req.query;
  let query = { project: req.params.id };
  if (labels) query.labels = { $all: labels.split(',') };
  if (author) query.author = author;
  const project = await Project.findById(req.params.id);
  const issues = await Issue.find(query);
  res.render('projectDetails', { project, issues });
});

// Create New Issue Page
router.get('/projects/:id/issues/new', (req, res) => {
  res.render('newIssue', { projectId: req.params.id });
});

// Handle New Issue Creation
router.post('/projects/:id/issues', async (req, res) => {
  const { title, description, labels, author } = req.body;
  await Issue.create({ title, description, labels: labels.split(','), author, project: req.params.id });
  res.redirect(`/projects/${req.params.id}`);
});

module.exports = router;
